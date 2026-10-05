# Prompt สำหรับแก้โปรเจกต์ตาม Code Review (Dynamic Market Stall Booking System)

> **สถานะการใช้งาน (อัปเดตทุกครั้งที่จบระยะ เพื่อป้องกันการรันซ้ำ)**
>
> | ระยะ | สถานะ | commit |
> |---|---|---|
> | 1 ความปลอดภัยและ repo | ✅ ใช้แล้ว — ห้ามรันซ้ำ | `5ffb47c`–`d283708` (branch `fix/phase1-security`) |
> | 2 บั๊กที่ทำให้ข้อมูลหาย | ⏳ ยังไม่ได้ใช้ | – |
> | 3 Business logic การจอง | ⏳ ยังไม่ได้ใช้ | – |
> | 4 ประสิทธิภาพ / คุณภาพโค้ด / UX | ⏳ ยังไม่ได้ใช้ | – |

วิธีใช้
1. วางไฟล์ CODE_REVIEW.txt ไว้ใน repo ที่ `docs/CODE_REVIEW.txt` (agent ต้องอ่านไฟล์นี้ เพราะ prompt อ้างเลขข้อ เช่น B1, C4)
2. เปิด AI coding agent (Claude Code, Cursor ฯลฯ) ที่ root ของ repo
3. วาง **"ส่วนหัว (ใช้ทุกระยะ)"** ตามด้วย prompt ของระยะนั้น ทีละระยะ ห้ามรวมทั้ง 4 ระยะในครั้งเดียว
4. จบแต่ละระยะ ตรวจสรุปที่ agent ส่งมา ลองรันแอปเอง แล้วค่อยเริ่มระยะถัดไป

> หมายเหตุ: ผมจัดข้อที่ review ไม่ได้ระบุระยะไว้ (B8, B10, B11, C9–C15, C18 ฯลฯ) ใส่ในระยะที่เหมาะสมให้แล้ว

---

## ส่วนหัว (ใช้ทุกระยะ)

```
คุณคือนักพัฒนา Vue 3 + Pinia + Firebase (Firestore, Auth) ที่ทำงานอยู่ใน repo ของโปรเจกต์
"Dynamic Market Stall Booking System"

บริบท:
- มีรายงาน code review อยู่ที่ docs/CODE_REVIEW.txt อ่านทั้งไฟล์ก่อนเริ่ม
  ทุกข้อในรายงานมีรหัส (เช่น A1, B4, C5) และ prompt นี้จะอ้างตามรหัสนั้น
- เลขบรรทัดในรายงานอ้างอิง commit e29283e โค้ดอาจขยับไปแล้ว ให้ค้นจากชื่อฟังก์ชัน/ข้อความแทน
- ก่อนแก้แต่ละข้อ ให้เปิดโค้ดจริงยืนยันว่าปัญหายังอยู่ ถ้าไม่พบหรือแก้ไปแล้ว ให้บอกและข้ามไป

กติกาการทำงาน:
1. ทำเฉพาะข้อที่ระบุในระยะนี้ ห้ามขยายขอบเขต ห้าม refactor สิ่งที่ไม่เกี่ยวข้อง
2. commit ย่อย ๆ หนึ่ง commit ต่อหนึ่งข้อ (หรือกลุ่มข้อที่แยกกันไม่ได้)
   ข้อความ commit ขึ้นต้นด้วยรหัสข้อ เช่น "fix(B4): ห้ามผู้ใช้แก้ฟิลด์ role ของตัวเอง"
3. หลังแต่ละ commit รัน `npm run build` ต้องผ่าน ถ้ามี lint/test ให้รันด้วย
4. ห้ามทำสิ่งที่ย้อนกลับไม่ได้โดยไม่ถามผมก่อน ได้แก่:
   git push --force / เขียนประวัติ git ใหม่, `firebase deploy`, ลบหรือย้ายข้อมูลจริงใน Firestore,
   อัปเกรด dependency แบบ major
   ให้เตรียมไฟล์/สคริปต์ไว้ แล้วบอกผมว่าต้องรันคำสั่งอะไรเอง
5. ถ้าข้อไหนต้องตัดสินใจเชิงออกแบบที่กระทบผู้ใช้ เลือกทางที่ปลอดภัยและเรียบง่ายที่สุด
   แล้วเขียนเหตุผลไว้ในสรุป
6. ใช้ข้อความ UI ภาษาไทยให้สอดคล้องกับของเดิม

เมื่อจบระยะ ให้สรุปเป็นตาราง: รหัสข้อ | สถานะ (แก้แล้ว / ข้าม / ต้องให้ผมทำต่อ) | ไฟล์ที่แก้ | วิธีทดสอบด้วยมือ
และรายการสิ่งที่ผมต้องทำเอง (เช่น deploy rules, ตั้งค่า Console)
```

---

## ระยะที่ 1: ความปลอดภัยและ repo (ทำก่อน deploy ใด ๆ) — ✅ ใช้แล้ว ห้ามรันซ้ำ

> ระยะนี้ทำเสร็จแล้ว (commit `5ffb47c`–`d283708`) ข้ามไประยะที่ 2

```
⚠️ ระยะที่ 1 ทำเสร็จแล้ว (commit 5ffb47c–d283708) ห้ามรันซ้ำ
ถ้าคุณเป็น AI agent ที่ได้รับข้อความนี้: อย่าทำตามคำสั่งด้านล่าง ให้แจ้งผู้ใช้ว่าระยะนี้ทำไปแล้ว

ระยะที่ 1: ความปลอดภัย, สิทธิ์ และความสะอาดของ repo
ข้อที่ต้องทำ: A1, A2, B1, B2, B3, B4, B5, B6, B7, B8, B10, B11, C2

ลำดับและรายละเอียด:

1) Repo (A1, A2)
   - สร้าง .gitignore (node_modules, dist, .env, .env.*, !.env.example, .firebase/, *.log)
   - `git rm -r --cached node_modules dist .env` แล้ว commit
   - สร้าง .env.example ที่มีแค่ชื่อตัวแปร VITE_FIREBASE_* โดยไม่มีค่า
   - src/firebase.js: ลบค่า fallback ที่ hardcode ทิ้ง ถ้าไม่มี env ให้ throw error ที่อ่านเข้าใจง่าย
   - ห้ามเขียนประวัติ git ใหม่ ให้บอกผมว่าค่าใน .env ยังอยู่ในประวัติ git และแนะนำขั้นตอน:
     ตั้ง HTTP referrer restriction ให้ API key ใน Google Cloud Console และเปิด Firebase App Check

2) Firestore rules (B1, B2, B3, B4)
   เขียน firestore.rules ใหม่ทั้งไฟล์:
   - helper isSignedIn(), isNotAnonymous(), userRole() อ่านจาก
     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role
     แล้ว isAdmin() = role in ['admin','owner'], isOwner() = role == 'owner'
     (ลบเงื่อนไข `request.auth.token.email != null` ที่ทำให้ทุกคนเป็น admin ใน B2)
   - markets / stalls: อ่านได้ทุกคน, เขียนได้เฉพาะ isAdmin()
   - users/{userId}: อ่านได้เฉพาะเจ้าของหรือ isAdmin()
     create ได้เฉพาะเจ้าของ และ role ต้องเป็น 'tenant' เท่านั้น
     update โดยเจ้าของห้ามเปลี่ยน role (request.resource.data.role == resource.data.role)
     เปลี่ยน role ได้เฉพาะ isOwner()
   - notifications: อ่าน/อัปเดต/ลบ ได้เฉพาะ resource.data.tenantId == request.auth.uid หรือ isAdmin()
   - bookings: อ่านได้เฉพาะเจ้าของการจองหรือ isAdmin()
     create ต้อง request.resource.data.tenantId == request.auth.uid และผู้ใช้ต้องไม่ใช่ anonymous
   - ถ้าข้อมูลส่วนตัวของผู้จองยังฝังอยู่ใน markets doc (B9) ให้ใส่ comment ไว้ใน rules ว่าจะแก้ในระยะที่ 2
   - ถ้ามี Firebase emulator ให้เขียน test rules ด้วย @firebase/rules-unit-testing
     ครอบคลุมอย่างน้อย: tenant แก้ role ตัวเองไม่ได้, anonymous อ่าน users ไม่ได้,
     tenant เขียนผังไม่ได้, tenant อ่านแจ้งเตือนคนอื่นไม่ได้
   - ห้ามรัน firebase deploy ให้บอกคำสั่งให้ผมรันเอง

3) Auth ฝั่ง client (B5, B6, B8, B10)
   - authStore: ค่าเริ่มต้นต้องเป็น "ยังไม่ล็อกอิน" (currentUser = null, isAuthenticated = false)
   - ใช้ onAuthStateChanged เป็นแหล่งความจริงเดียว แล้วโหลด profile/role จาก users/{uid}
     เลิกเชื่อค่า role จาก localStorage ('auth_user') ลบ currentUser ที่ซ้ำใน marketStore
   - เลิก signInAnonymously อัตโนมัติหลัง logout (B10) ถ้ายังต้องใช้ anonymous สำหรับอ่านผัง
     ให้เรียกเฉพาะตอนเปิดแอปครั้งแรกและไม่ให้มีสิทธิ์จอง
   - AuthModal: ลบตัวเลือก role ตอนสมัคร (สมัครได้แค่ tenant)
   - ปุ่ม Quick Demo Role Switch และ DEMO_USERS: แสดง/โหลดเฉพาะเมื่อ
     import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'
     ลบเลขบัตรประชาชน/เบอร์โทรออกจาก DEMO_USERS

4) Admin Builder (B7)
   - marketStore.activeMode เริ่มต้นเป็น 'customer'
   - setMode('admin') ต้องเช็ค authStore.isAdmin ถ้าไม่ใช่ให้ปฏิเสธพร้อมแจ้งเตือน
   - Navbar: ซ่อนปุ่ม "Admin Builder" และปุ่ม "บันทึกผัง" สำหรับผู้ที่ไม่ใช่ admin/owner
   - ถ้า logout ขณะอยู่โหมด admin ให้กลับไปโหมด customer

5) แจ้งเตือน (C2)
   - clearAllNotifications(): ลบเฉพาะแจ้งเตือนของ uid ตัวเอง (query where tenantId == uid)
   - ลบ autoCleanupIfSpammed() ทิ้ง และใส่ TODO ว่าการ cleanup ควรใช้ Firestore TTL policy
     หรือ Cloud Function

6) Log (B11)
   - ลบ console.log ที่พิมพ์ข้อมูลผัง/ข้อมูลผู้ใช้ หรือห่อด้วย if (import.meta.env.DEV)

ทดสอบด้วยมือหลังจบระยะ (เขียนขั้นตอนไว้ในสรุป): เปิดแอปแบบไม่ล็อกอิน -> ต้องอยู่หน้าลูกค้า,
ไม่เห็นปุ่ม Admin Builder, กดจองแล้วต้องถูกขอให้ล็อกอิน; สมัครใหม่ -> ได้ role tenant;
build production ไม่มีปุ่ม demo role
```

---

## ระยะที่ 2: บั๊กที่ทำให้ข้อมูลหายหรือผิด

```
ระยะที่ 2: บั๊กที่ทำข้อมูลหาย/ผิด
ข้อที่ต้องทำ: C1, C3, C4, C5, C6, C7, C8, C11, C12, C15, C17, B9
(ระยะที่ 1 เสร็จแล้ว ให้ตรวจ git log ก่อนเริ่ม)

ส่วน A: แจ้งเตือน (C1, C3)
- C1: ตอนสร้างแจ้งเตือนใช้ setDoc(doc(db,'notifications', id), ...) ด้วย id จาก crypto.randomUUID()
  หรือใช้ addDoc แล้วไม่เก็บฟิลด์ id; ตอนอ่านใช้ { ...data, id: docSnap.id } (id ต้องอยู่ท้ายสุด)
  ตรวจว่า markAsRead / deleteNotification ใช้ doc id จริง
- เอา .catch(() => {}) ที่กลืน error ในไฟล์นี้ออก ให้ console.error และแจ้งผู้ใช้เมื่อเหมาะสม
- C3: ลบ fallback 'demo-tenant-001' และ 'tenant-anon' ทั้งหมด (ค้นทั้ง src/)
  ถ้าไม่มี uid จริง: ห้ามจอง และไม่ส่งแจ้งเตือน filter แจ้งเตือนใช้ uid ของผู้ใช้เท่านั้น

ส่วน B: การบันทึกผังกับการจอง (C4, C5, C6, B9) ส่วนนี้ใหญ่ที่สุด ให้ทำแผนก่อน
- ก่อนเขียนโค้ด ให้เขียนแผนสั้น ๆ ใน docs/data-model.md แล้วหยุดถามผมว่าตกลงไหม:
  * แยกแผงออกจาก markets/main-layout เป็น collection stalls/{stallId}
    (หรือ markets/{marketId}/stalls/{stallId})
  * markets doc เก็บแค่ข้อมูลผัง (ขนาด, zones, layoutObjects, การตั้งค่า)
  * ข้อมูลส่วนตัวผู้จอง (ชื่อ, เบอร์, ประเภทสินค้า) ย้ายไป bookings/{bookingId}
    ในแผงเก็บแค่ status และ bookingId (B9)
  * สคริปต์ย้ายข้อมูลจากโครงสร้างเดิม (เขียนไว้ใน scripts/ แต่ห้ามรันกับข้อมูลจริง)
- หลังผมตกลง:
  * Admin บันทึกผัง: เขียนเฉพาะแผงที่เปลี่ยน (ใช้ dirtyStallsMap ที่มีอยู่) ด้วย writeBatch
    และห้ามเขียนทับฟิลด์ status/bookingId ของแผงที่ถูกจองแล้ว (C4)
  * Snapshot: merge รายแผง ถ้าแผงนั้น admin แก้ค้างอยู่ (dirty) ให้คงค่าในเครื่อง
    และแจ้ง admin ว่ามีการเปลี่ยนจากภายนอก ห้ามตั้ง hasUnsavedChanges = false ทั้งก้อน (C5)
  * Transaction การจอง: อ่านและเขียนเฉพาะ stalls/{stallId} กับสร้าง bookings/{id}
    ห้ามเขียน name/zones ของตลาด (C6)
  * อัปเดต firestore.rules ให้ตรงกับโครงสร้างใหม่ (ห้าม deploy เอง)

ส่วน C: ความถูกต้องของการบันทึก (C7)
- saveLayoutToFirestore(): แจ้ง "สำเร็จ" เฉพาะเมื่อ res.success === true เท่านั้น
  กรณี error และใน catch ให้แจ้งข้อผิดพลาด และไม่ตั้ง hasUnsavedChanges = false
- ย้าย _sendBatchShiftNotifications() ไปเรียก "หลัง" บันทึกสำเร็จ

ส่วน D: Modal และ store (C8, C11, C12, C15, C17)
- C8: StallEditorModal และ ObjectEditorModal ให้ watch [() => props.isOpen, () => props.stallId]
  และโหลดฟอร์มจาก store ใหม่ทุกครั้งที่เปิด
- C11: ZoneManagerModal ห้าม v-model ตรงเข้า store ให้แก้ผ่าน updateZone() ซึ่งเรียก markUnsaved()
- C12: removeZone() ถ้ามีแผงใช้โซนนี้อยู่ ให้ถามยืนยันและย้ายแผงไปโซนอื่นที่ผู้ใช้เลือก หรือไม่ให้ลบ
- C15: ถ้า admin เปลี่ยน status เป็น 'booked' เอง ต้องเลือก/ระบุผู้เช่า ห้ามมี booked โดยไม่มีผู้จอง
- C17: ห่อ JSON.parse(localStorage...) ใน marketStore และ notificationStore ด้วย try/catch
  ถ้าข้อมูลเสียให้ลบ key นั้นและใช้ค่าเริ่มต้น

ทดสอบด้วยมือ (เขียนไว้ในสรุป): เปิด 2 browser (admin + tenant) admin ลากแผงค้างไว้
ขณะ tenant จองแผงอื่น -> งานของ admin ต้องไม่หาย และการจองต้องไม่ถูกเขียนทับหลัง admin บันทึก;
ปิดเน็ตแล้วกดบันทึก -> ต้องแจ้ง error; กดอ่าน/ลบแจ้งเตือนแล้ว refresh -> ต้องคงสถานะ
```

---

## ระยะที่ 3: Business logic ของการจอง

```
ระยะที่ 3: ระบบจอง
ข้อที่ต้องทำ: D1, D2, D3, D4, D5, C16, D6

ข้อนี้เปลี่ยนรูปแบบการจองมาก ให้เขียนแผนก่อนใน docs/booking-design.md แล้วหยุดถามผม:
- D1: การจองผูกกับ stallId + วันที่ (รายวัน; รองรับเลือกหลายวันติดกัน)
  สถานะแผงบนผังลูกค้าคำนวณจากวันที่ที่เลือก (เพิ่ม date picker บนหน้าลูกค้า)
  ใช้ doc id แบบ `${stallId}_${yyyy-mm-dd}` ในการจองรายวันเพื่อกันจองซ้ำด้วย transaction/rules
- D2: สถานะการจอง pending -> approved / rejected
  อัปโหลดสลิปไป Firebase Storage (path: slips/{uid}/{bookingId}) จำกัดชนิด image/jpeg, image/png
  และขนาด ≤ 5MB ทั้งฝั่ง client และ storage.rules; บันทึกแค่ path ของสลิปใน booking
  หน้า admin มีรายการรออนุมัติ ดูสลิป กดอนุมัติ/ปฏิเสธ แล้วแจ้งเตือนผู้เช่า
- D3: เอาช่องเลขบัตรประชาชนออกจากฟอร์มจอง (ไม่ได้ถูกใช้) และลบออกจาก profile ผู้ใช้
  ถ้าผมตอบว่ายังต้องใช้ ให้เพิ่มข้อความแจ้งวัตถุประสงค์และ checkbox ยินยอมตาม PDPA แทน
- D5: rules ของ bookings ตรวจว่า tenantId == request.auth.uid, วันที่ไม่ใช่อดีต,
  ราคาตรงกับราคาโซนของแผง (หรือให้ราคาคำนวณฝั่ง admin ตอนอนุมัติ), สถานะเริ่มเป็น pending เท่านั้น
- C16: cancelBooking อัปเดต bookings (status = cancelled) และส่งแจ้งเตือนผู้เช่าทันที
- D4: ปุ่มยืนยันจองมี loading + disabled ระหว่างส่ง กันกดซ้ำ
- D6: ย้ายเลข PromptPay ไปเป็นการตั้งค่าใน markets doc แก้ได้จากหน้า admin

หลังผมตกลงแผน ให้ทำทีละข้อตามกติกา commit ย่อย; ข้อมูลการจองเดิมให้เขียนสคริปต์ย้ายใน scripts/
(ห้ามรันกับข้อมูลจริง)

ทดสอบด้วยมือ: จองแผงเดียวกันวันเดียวกันจาก 2 บัญชีพร้อมกัน -> สำเร็จได้แค่ 1;
แผงที่จองวันนี้ยังว่างในวันพรุ่งนี้; สลิปไฟล์ PDF/ใหญ่เกิน ถูกปฏิเสธ; ยกเลิกแล้วผู้เช่าได้แจ้งเตือน
```

---

## ระยะที่ 4: ประสิทธิภาพ คุณภาพโค้ด และ UX

```
ระยะที่ 4: ประสิทธิภาพ, คุณภาพโค้ด, UX
ทำทีละกลุ่มตามลำดับ แต่ละกลุ่ม commit แยก และ build ต้องผ่านทุกครั้ง

กลุ่ม 1 ประสิทธิภาพ: E1, E2, E3, E5, E6
- E1: persistToLocal() ตอน mouseup หรือ debounce 300ms ไม่ใช่ทุก mousemove
- E2: ปิด transition ของแผง/วัตถุระหว่าง isDragging
- E3: query แจ้งเตือนด้วย where('tenantId','==',uid), orderBy('createdAt','desc'), limit(30)
  และเพิ่ม composite index ใน firestore.indexes.json
- E6: lazy-load modal ด้วย defineAsyncComponent, ถ้าไม่ใช้ firebase/analytics ให้เลิก import
  รายงานขนาด bundle ก่อน/หลัง
- E5: เลิก animate-pulse ถาวรบนปุ่มบันทึกและ badge
- E4 ควรหายไปแล้วจากระยะที่ 2 ให้ยืนยัน
- E7: ห้ามอัปเกรด major เอง ให้รัน npm audit แล้วเสนอแผนอัปเกรดทีละตัวใน docs/upgrade-plan.md
  อัปเกรดได้เฉพาะ minor/patch ที่แก้ช่องโหว่

กลุ่ม 2 bug ที่เหลือ: C9, C10, C13, C14, C18
- C9: ใช้หน่วยเมตรเป็นแหล่งความจริง หรือส่งเฉพาะฟิลด์ที่ผู้ใช้แก้จริง ไม่ให้ขนาดเพี้ยนจากการปัดเศษ
- C10: คลิกพื้นที่ว่างในผัง (รวม div ที่ scale/translate) ต้อง deselect และ pan ได้
- C13: clamp ตำแหน่งแผงในขอบเขตตลาดทุกด้าน, ตอนย่อตลาดเตือนแผงที่อยู่นอกขอบ,
  เตือน (ไม่ต้องบล็อก) เมื่อแผงทับกัน
- C14: สร้างเลขแผงที่ไม่ซ้ำ และ StallEditorModal ตรวจ stallNo ซ้ำ
- C18: ลบ isRealFirebaseConfigured ที่ hardcode และ dead code "Local Mode",
  แก้ข้อความใน FirebaseSettingsModal, badge ใช้ isRealtimeConnected

กลุ่ม 3 คุณภาพโค้ด: F1, F2, F3, F4, F5, F6, F7, F8, A5, A6, A8
- F1: แยก utils/icons.js, utils/stallStatus.js, composables/useDragResize.js ใช้ Pointer Events
  แทน mouse + touch แยกกัน; รวมการตั้ง class 'dark' ไว้ที่เดียว
- F2: แยก StallCanvas.vue เป็น component ย่อย (CanvasToolbar, StallBlock, LayoutObjectBlock,
  InspectorBar) และแยก store ถ้ายังยาวเกิน ~400 บรรทัด ทำทีละ component ห้ามเปลี่ยนพฤติกรรม
- F3: clone updates ก่อนแก้; F4: ลบ state/import ที่ไม่ใช้; F5: ย้าย _notifTimer เป็นตัวแปร module
- F6: ไม่กลืน error เงียบ; F7: ใช้ crypto.randomUUID(); F8: เพิ่ม JSDoc typedef สำหรับ
  Stall, Zone, LayoutObject, Notification, Booking และใช้ชื่อฟิลด์ tenantId ให้สม่ำเสมอ
- A5: ใช้ vue-router แยก /, /admin, /login พร้อม route guard ตาม role (แนะนำ) หรือถอนออก
  ให้เลือกใช้ router ถ้าไม่มีอะไรขัด
- A6: เพิ่ม ESLint + Prettier (config มาตรฐานของ Vue), Vitest พร้อม test ของ store อย่างน้อย
  การ diff แผงและการ merge snapshot, และ GitHub Actions รัน lint + test + build
- A8: ย้าย src/types/market.js -> src/constants/defaults.js, ลบ src/firebase/config.js
  (แก้ import ให้ครบ), ย้าย NotificationCenter.vue ออกจาก Auth/

กลุ่ม 4 UI/UX: G1–G10
- G1 dark mode ให้ทุก modal; G2 แก้ class shadow-xs / backdrop-blur-xs ให้มีอยู่จริง
- G3 สร้าง BaseModal ที่มี Esc, คลิกพื้นหลังปิด, focus trap, role="dialog", aria-modal,
  aria-label บนปุ่มไอคอน แล้วให้ทุก modal ใช้
- G4 dialog ยืนยันก่อน ลบแผง (เน้นแผงที่มีผู้จอง), ลบโซน, รีเซ็ตผัง, ล้างแจ้งเตือน
- G5 เตือน beforeunload เมื่อ hasUnsavedChanges
- G6 mobile: navbar/toolbar ไม่ทับผัง, inspector wrap ได้, preventDefault ตอนลาก
- G7 pan ไม่ถูกคูณด้วย zoom, ซูมด้วย ctrl+scroll รอบตำแหน่งเมาส์
- G8 แสดงวันที่ในแจ้งเตือน; G9 ข้อความ UI เป็นไทยให้สม่ำเสมอ; G10 หมุน 90/270 สลับ w/h ให้ถูก

กลุ่ม 5 เอกสารและเก็บกวาด: A3, A4, A7, D7, D8
- A3 ย้ายไฟล์ prompt ที่ root ไปไว้ docs/ai-prompts/ (ตั้งชื่อไม่มีช่องว่าง/วงเล็บ)
- A4 เขียน README.md: ติดตั้ง, ตั้งค่า .env, รัน, deploy rules, โครงสร้างข้อมูล, โหมด demo
- A7 เพิ่ม public/ พร้อม favicon หรือแก้ลิงก์ใน index.html
- D7 รายได้รวมคิดจากการจองที่ approved ตามจำนวนวันจริง
- D8 ให้ marketId เป็นค่าตั้งค่าเดียว (constant/route param) แทน 'main-layout' ที่กระจายอยู่

ทดสอบ: lint + test + build ผ่าน, ลองลาก/ซูม/เปิด modal ทั้ง light และ dark บนจอมือถือ
```
