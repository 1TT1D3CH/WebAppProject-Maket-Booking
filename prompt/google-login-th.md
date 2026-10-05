> ✅ **สถานะ: ใช้งานแล้ว — ห้ามรันซ้ำ**
> commit: fa79d3c (ขั้น 3, 6), 60f4b96 (ขั้น 2, 5), cee9492 (ขั้น 4), b316f5f (ขั้น 8) — ขั้น 1 และ 7 ทำไว้แล้วก่อนหน้า

# Prompt: เพิ่ม "เข้าสู่ระบบด้วย Google" (Dynamic Market Stall Booking System)

## ก่อนวาง prompt ทำใน Firebase Console ก่อน (2 นาที)

1. Authentication → Sign-in method → Google → เปิด Enable, เลือก **Project support email** แล้วกด Save
2. Authentication → Settings → **Authorized domains** ต้องมี `localhost` (มีให้แล้วโดยปกติ)
   ถ้า deploy ขึ้นโดเมนจริง (เช่น Vercel, Netlify, โดเมนของตัวเอง) ให้กด Add domain เพิ่มโดเมนนั้นด้วย ไม่งั้นจะเจอ error `auth/unauthorized-domain`
3. Authentication → Settings → User account linking ปล่อยไว้ที่ค่าเริ่มต้น **"Link accounts that use the same email"**

## วิธีใช้

- ถ้ายังไม่ได้ทำระยะที่ 1 ใน `fix-prompts-th.md` (ข้อ Auth ฝั่ง client และ Firestore rules) แนะนำให้ทำก่อน เพราะ prompt นี้ต่อยอดจากตรงนั้น
  ถ้ายังไม่ได้ทำ prompt นี้สั่งให้ agent แก้ส่วนที่จำเป็นไปด้วยแล้ว
- เปิด AI coding agent ที่ root ของ repo แล้ววาง prompt ด้านล่างทั้งก้อน

---

```
คุณคือนักพัฒนา Vue 3 + Pinia + Firebase (Auth, Firestore) ที่ทำงานใน repo
"Dynamic Market Stall Booking System"

งาน: เพิ่มการเข้าสู่ระบบด้วย Google โดยไม่ทำให้ระบบ Email/Password เดิมพัง

ขั้นที่ 0: สำรวจก่อนแก้
- เปิด src/firebase.js, authStore (Pinia), AuthModal.vue, marketStore และ firestore.rules
- สรุปให้ผมสั้น ๆ ก่อนเริ่มแก้ว่า ตอนนี้:
  (ก) authStore ใช้ onAuthStateChanged แล้วหรือยัง หรือยังอ่าน role จาก localStorage ('auth_user')
  (ข) ยังมี signInAnonymously อัตโนมัติอยู่ไหม และเรียกตรงไหน
  (ค) AuthModal ยังให้ผู้ใช้เลือก role เองตอนสมัครไหม
  (ง) โครงสร้าง document users/{uid} มีฟิลด์อะไรบ้าง (เช่น name, email, phone, role, createdAt)
- ถ้าข้อ (ก)-(ค) ยังเป็นแบบเดิม ให้แก้ตามขั้นที่ 1 ด้วย ถ้าแก้ไปแล้วให้ข้ามส่วนนั้น

ขั้นที่ 1: ให้ onAuthStateChanged เป็นแหล่งความจริงเดียว
- authStore เริ่มต้นเป็น "ยังไม่ล็อกอิน" (currentUser = null, profile = null, isAuthenticated = false)
  และมี authReady = false จนกว่า onAuthStateChanged จะยิงครั้งแรก (ใช้ซ่อน UI ที่ขึ้นกับสิทธิ์ระหว่างรอ)
- ลงทะเบียน onAuthStateChanged ครั้งเดียวตอนเริ่มแอป (เช่นใน initAuth() ที่เรียกจาก main.js หรือ App.vue)
  เมื่อมี user ที่ไม่ใช่ anonymous ให้โหลด profile จาก users/{uid} แล้วตั้ง role จาก Firestore เท่านั้น
- เลิกเชื่อ role ที่เก็บใน localStorage ถ้าจะ cache ไว้แสดงผลเร็ว ใช้ได้แค่ชื่อ/รูป ห้ามใช้ตัดสินสิทธิ์
- เลิก signInAnonymously อัตโนมัติหลัง logout

ขั้นที่ 2: ฟังก์ชัน loginWithGoogle() ใน authStore
- ใช้ GoogleAuthProvider และ setCustomParameters({ prompt: 'select_account' })
  เพื่อให้เลือกบัญชีได้ทุกครั้ง (สำคัญเวลาเครื่องเดียวมีหลายบัญชี)
- เรียก signInWithPopup ก่อนเสมอ
- ถ้าได้ error auth/popup-blocked หรือ auth/operation-not-supported-in-this-environment
  ให้ fallback เป็น signInWithRedirect และตอนเริ่มแอปเรียก getRedirectResult(auth) หนึ่งครั้งเพื่อจับผล/จับ error
  (ไม่ต้องใช้ redirect เป็นค่าเริ่มต้นบนมือถือ เพราะ redirect มีปัญหากับ third-party cookie
  ในเบราว์เซอร์รุ่นใหม่ถ้า authDomain ไม่ตรงกับโดเมนที่ host แอป ให้เขียน comment อธิบายไว้ในโค้ด)
- ถ้าผู้ใช้ตอนนี้เป็น anonymous อยู่ ให้ล็อกอิน Google ตามปกติ (ไม่ต้อง link กับ anonymous)
- หลังล็อกอินสำเร็จให้เรียก ensureUserProfile(user) (ขั้นที่ 3)

ขั้นที่ 3: ensureUserProfile(user) สร้าง users/{uid} ครั้งแรกเท่านั้น
- getDoc(users/{uid}) ถ้ามีอยู่แล้ว ห้ามเขียนทับ โดยเฉพาะ role
- ถ้ายังไม่มี ให้ setDoc ด้วย:
  { name: user.displayName ?? '', email: user.email, photoURL: user.photoURL ?? null,
    phone: '', role: 'tenant', provider: 'google', createdAt: serverTimestamp() }
- role ต้องเป็น 'tenant' เสมอ ห้ามรับค่า role จาก UI หรือจากพารามิเตอร์ใด ๆ
- ใช้ฟังก์ชันเดียวกันนี้กับการสมัครแบบ Email/Password ด้วย (provider: 'password')
  เพื่อให้ทั้งสองทางสร้างโปรไฟล์รูปแบบเดียวกัน
- ถ้า setDoc ล้มเหลว (เช่นติด rules) ให้ signOut แล้วแจ้ง error ไม่ปล่อยให้ผู้ใช้ค้างในสถานะล็อกอินแต่ไม่มีโปรไฟล์

ขั้นที่ 4: ขอเบอร์โทรหลังล็อกอินครั้งแรก
- authStore มี getter needsPhone = isAuthenticated && !profile.phone
- สร้าง component CompleteProfileModal.vue (หรือใช้ modal เดิมของโปรเจกต์) ที่เปิดอัตโนมัติเมื่อ needsPhone เป็น true
  ช่องที่มี: เบอร์โทร (บังคับ), ชื่อที่แสดง (เติมจาก Google มาให้ แก้ได้)
- ตรวจเบอร์ไทย: ลบขีด/ช่องว่างแล้วต้องตรง /^0[0-9]{8,9}$/ ไม่ผ่านให้แสดง "กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 0812345678"
- บันทึกด้วย updateDoc เฉพาะฟิลด์ phone และ name (ห้ามส่ง role ไปด้วย)
- ปิด modal ได้ แต่ถ้ายังไม่มีเบอร์ ตอนกดจองแผงให้เปิด modal นี้ขึ้นมาก่อนและยังไม่สร้าง booking

ขั้นที่ 5: UI ใน AuthModal
- เพิ่มปุ่ม "เข้าสู่ระบบด้วย Google" ด้านบนของฟอร์ม ทั้งแท็บเข้าสู่ระบบและสมัครสมาชิก
  มีโลโก้ Google (SVG inline สี่สีตามแบบของ Google) พื้นขาว ขอบเทา
- ใต้ปุ่มมีเส้นคั่นพร้อมคำว่า "หรือ" แล้วตามด้วยฟอร์ม Email/Password เดิม (ห้ามลบหรือเปลี่ยนพฤติกรรม)
- ระหว่างรอ ให้ปุ่ม disabled และแสดง "กำลังเข้าสู่ระบบ..." กันกดซ้ำ
- ล็อกอินสำเร็จให้ปิด modal และถ้าผู้ใช้กดจองค้างไว้ก่อนเปิด modal ให้ทำต่อจากจุดนั้น (ถ้าโค้ดเดิมมีกลไกนี้)
- ลบตัวเลือก role ออกจากฟอร์มสมัคร ถ้ายังมีอยู่

ขั้นที่ 6: ข้อความ error ภาษาไทย
ทำ helper แปลง error.code เป็นข้อความ (ใช้ร่วมกับ Email/Password ได้):
- auth/popup-closed-by-user, auth/cancelled-popup-request -> ไม่ต้องแสดงอะไร (ผู้ใช้ปิดเอง)
- auth/popup-blocked -> "เบราว์เซอร์บล็อกหน้าต่างล็อกอิน กำลังเปลี่ยนไปหน้า Google..." (แล้ว fallback redirect)
- auth/network-request-failed -> "เชื่อมต่ออินเทอร์เน็ตไม่ได้ ลองใหม่อีกครั้ง"
- auth/unauthorized-domain -> "โดเมนนี้ยังไม่ได้รับอนุญาตให้ล็อกอิน (ผู้ดูแลต้องเพิ่มใน Firebase Console)"
- auth/account-exists-with-different-credential -> "อีเมลนี้เคยสมัครด้วยวิธีอื่น กรุณาเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน"
- auth/user-disabled -> "บัญชีนี้ถูกระงับ กรุณาติดต่อผู้ดูแลตลาด"
- auth/too-many-requests -> "ลองหลายครั้งเกินไป กรุณารอสักครู่"
- อื่น ๆ -> "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่" และ console.error ตัว error จริง

ขั้นที่ 7: Firestore rules
- ตรวจ firestore.rules ว่า users/{userId}:
  create ได้เฉพาะ request.auth.uid == userId และ request.resource.data.role == 'tenant'
  update โดยเจ้าของห้ามเปลี่ยน role
- ถ้า rules ยังไม่เป็นแบบนี้ ให้แก้ไฟล์ แต่ห้ามรัน firebase deploy ให้บอกคำสั่งให้ผมรันเอง

ขั้นที่ 8: Logout
- logout ต้องเรียก signOut(auth) แล้วเคลียร์ state ใน authStore และ store อื่นที่เก็บข้อมูลผู้ใช้
  (bookings ของฉัน, notifications) ให้หมด ไม่ต้อง signInAnonymously ต่อ

กติกา:
- ห้ามลบหรือเปลี่ยนพฤติกรรมของการสมัคร/ล็อกอินด้วย Email/Password ที่ใช้งานได้อยู่
- ห้ามแตะส่วนที่ไม่เกี่ยวกับ auth
- commit แยกตามขั้น ข้อความ commit ภาษาอังกฤษหรือไทยก็ได้ เช่น "feat(auth): add Google sign-in"
- หลังแต่ละ commit รัน npm run build ต้องผ่าน
- ห้ามรัน firebase deploy, ห้าม push --force, ห้ามลบข้อมูลใน Firestore
- ห้ามใส่ค่า config หรือ key ใด ๆ ลงในโค้ด ใช้ตัวแปร VITE_FIREBASE_* เดิม

เมื่อเสร็จ ให้สรุป:
1. ไฟล์ที่แก้/สร้าง และสิ่งที่เปลี่ยนในแต่ละไฟล์
2. สิ่งที่ผมต้องทำเองใน Firebase Console หรือคำสั่งที่ต้องรัน
3. วิธีทดสอบด้วยมือตามรายการด้านล่าง พร้อมผลที่ควรเห็น
```

---

## เช็กลิสต์ทดสอบด้วยตัวเองหลัง agent ทำเสร็จ

1. กด "เข้าสู่ระบบด้วย Google" ด้วยบัญชีที่ไม่เคยใช้ → ล็อกอินได้, ขึ้นหน้าขอเบอร์โทร, ใน Firestore มี `users/{uid}` ที่ role เป็น `tenant`
2. รีเฟรชหน้า → ยังล็อกอินอยู่ และไม่ถูกถามเบอร์ซ้ำ
3. ออกจากระบบแล้วล็อกอิน Google อีกครั้ง → ไม่สร้างโปรไฟล์ใหม่ role เดิมไม่เปลี่ยน
4. ตั้ง role ของบัญชีตัวเองเป็น `admin` ใน Firestore แล้วล็อกอิน Google ใหม่ → ต้องยังเป็น admin (ไม่ถูกเขียนทับเป็น tenant)
5. ปิดหน้าต่าง popup กลางทาง → ไม่มี error สีแดงขึ้น
6. ล็อกอินด้วย Email/Password บัญชีเดิม → ยังใช้ได้เหมือนเดิม
7. เปิดบนมือถือ (หรือ DevTools โหมดมือถือ) → ล็อกอินได้
8. ข้ามหน้าขอเบอร์ แล้วกดจองแผง → ต้องถูกถามเบอร์ก่อนจอง
