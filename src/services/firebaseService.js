import { db, auth, isRealFirebaseConfigured } from '../firebase/config'
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  runTransaction, 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'

/**
 * Clean & sanitize objects before passing to Firestore
 * Eliminates Vue reactivity proxies and removes undefined fields
 */
function sanitizeData(data) {
  return JSON.parse(JSON.stringify(data || []))
}

/**
 * Initialize Firebase Auth listener
 */
export function initAuthListener(onUserChanged) {
  if (!isRealFirebaseConfigured || !auth) return () => {}
  
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Firebase Auth: Signed in as', user.uid)
      if (onUserChanged) onUserChanged(user)
    } else {
      // Auto sign-in anonymously for testing real-time permissions
      signInAnonymously(auth).catch(err => {
        console.warn('Anonymous Auth notice:', err.message)
      })
    }
  })
}

/**
 * Subscribe to Real-Time Market Layout & Stalls from Firestore
 */
export function subscribeToMarketLayout(onDataReceived, onError) {
  if (!isRealFirebaseConfigured || !db) {
    console.log('Firebase not configured. Real-time sync skipped (using Local Storage mode).')
    return () => {}
  }

  const marketDocRef = doc(db, 'markets', 'main-layout')
  
  // Real-time Firestore Listener
  const unsubscribe = onSnapshot(marketDocRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data()
      console.log('⚡ Real-time update received from Firestore:', data)
      if (onDataReceived) {
        onDataReceived({
          name: data.name,
          zones: data.zones || [],
          stalls: data.stalls || [],
          layoutObjects: data.layoutObjects || [],
          marketWidthMeters: data.marketWidthMeters,
          marketHeightMeters: data.marketHeightMeters,
          gridSnapMeters: data.gridSnapMeters,
          updatedAt: data.updatedAt
        })
      }
    } else {
      console.log('No Firestore document found for markets/main-layout yet.')
    }
  }, (err) => {
    console.warn('Firestore snapshot listener warning/notice:', err.message)
    if (onError) onError(err)
  })

  return unsubscribe
}

/**
 * Save / Update Full Market Layout to Firestore with fallback
 */
export async function saveMarketLayoutToFirestore(marketName, zones, stalls, dimensions = {}, layoutObjects = []) {
  if (!isRealFirebaseConfigured || !db) {
    console.log('Local Mode: Saved to localStorage')
    return { success: true, mode: 'local' }
  }

  try {
    const marketDocRef = doc(db, 'markets', 'main-layout')
    const sanitizedZones = sanitizeData(zones)
    const sanitizedStalls = sanitizeData(stalls)
    const sanitizedLayoutObjects = sanitizeData(layoutObjects)

    const payload = {
      name: marketName || 'ตลาดยามเย็น Walking Street KKU',
      zones: sanitizedZones,
      stalls: sanitizedStalls,
      layoutObjects: sanitizedLayoutObjects,
      marketWidthMeters: dimensions.marketWidthMeters || 30,
      marketHeightMeters: dimensions.marketHeightMeters || 20,
      gridSnapMeters: dimensions.gridSnapMeters || 0.5,
      updatedAt: new Date().toISOString()
    }

    await setDoc(marketDocRef, payload, { merge: true })
    return { success: true, mode: 'firestore' }
  } catch (err) {
    console.warn('Firestore Save Notice (falling back to LocalStorage):', err)
    return { success: false, mode: 'local', error: err }
  }
}

/**
 * Book Stall using Firestore Atomic Transaction (Race Condition Prevention)
 */
export async function bookStallWithTransaction(stallId, customerInfo, currentStalls, marketName, zones) {
  if (!isRealFirebaseConfigured || !db) {
    return { success: true, mode: 'local' }
  }

  const marketDocRef = doc(db, 'markets', 'main-layout')
  const bookingCollectionRef = collection(db, 'bookings')

  try {
    const sanitizedZones = sanitizeData(zones)
    const sanitizedStalls = sanitizeData(currentStalls)

    await runTransaction(db, async (transaction) => {
      const marketDoc = await transaction.get(marketDocRef)
      
      let stallsList = sanitizedStalls
      if (marketDoc.exists()) {
        const data = marketDoc.data()
        stallsList = data.stalls || sanitizedStalls
      }

      const stallIndex = stallsList.findIndex(s => s.id === stallId)
      if (stallIndex === -1) {
        throw new Error('ไม่พบข้อมูลแผงค้านี้ในระบบ')
      }

      const targetStall = stallsList[stallIndex]
      if (targetStall.status === 'booked') {
        throw new Error(`แผงค้า ${targetStall.stallNo} ถูกผู้อื่นจองไปก่อนหน้านี้แล้ว!`)
      }

      if (targetStall.status === 'disabled') {
        throw new Error(`แผงค้า ${targetStall.stallNo} ปิดให้บริการ ไม่สามารถจองได้`)
      }

      // Update stall status to 'booked' atomically inside transaction
      stallsList[stallIndex] = {
        ...targetStall,
        status: 'booked',
        bookedBy: {
          tenantId: customerInfo.tenantId || 'demo-tenant-001',
          name: customerInfo.name,
          phone: customerInfo.phone,
          goodsType: customerInfo.goodsType,
          bookedAt: new Date().toISOString()
        }
      }

      // Write updated market layout back to Firestore
      transaction.set(marketDocRef, {
        name: marketName,
        zones: sanitizedZones,
        stalls: stallsList,
        updatedAt: new Date().toISOString()
      }, { merge: true })
    })

    // Record transaction log entry in 'bookings' collection safely
    try {
      await addDoc(bookingCollectionRef, {
        stallId,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        goodsType: customerInfo.goodsType,
        createdAt: serverTimestamp(),
        status: 'confirmed'
      })
    } catch (bookingErr) {
      console.warn('Booking log notice:', bookingErr.message)
    }

    return { success: true, mode: 'firestore' }

  } catch (err) {
    console.error('Transaction Notice:', err.message)
    throw err
  }
}
