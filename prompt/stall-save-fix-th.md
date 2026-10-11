# แก้ด่วน: วัตถุตั้งต้น (ทางเข้าหลัก, ATM, จุดประชาสัมพันธ์, ห้องน้ำ, ทางเดิน, เวที) โผล่ซ้อนกับผังจริงบนเครื่องใหม่

## อาการ (ยืนยันแล้ว)
- เครื่องที่ admin ใช้แก้ผัง: เห็นผังถูกต้อง
- เครื่องใหม่ / โหมดไม่ระบุตัวตน / iPad / มือถือ (ไม่มีข้อมูลเก่าในเครื่อง): เห็น **วัตถุตั้งต้น** ได้แก่ ทางเข้าหลัก, ATM, จุดประชาสัมพันธ์, ห้องน้ำ, ทางเดิน, เวที โผล่ที่ตำแหน่งเดิมทุกครั้ง **และ** เห็นผังที่ admin บันทึกไว้ซ้อนอยู่ด้วย
- admin ลบวัตถุพวกนี้แล้วกดบันทึก แต่เครื่องใหม่ก็ยังเห็นอยู่
- Firestore: `markets/main-layout` มี `zones` และอื่น ๆ, มี subcollection `stalls` (ข้อมูลขยะจากโค้ดวันนี้ อย่างน้อย 1 doc)
- rules ของ `markets/{marketId}` ถูกแก้เป็น `allow create, update, delete: if isAdmin();` แล้ว บันทึกผ่าน

## สาเหตุที่น่าจะเป็น
ค่า default ของผัง (DEFAULT_OBJECTS / initialObjects / seed / demo layout) ถูก **รวม** เข้ากับข้อมูลจาก Firestore แทนที่จะถูก **แทนที่** เช่น
- store เริ่มด้วย default แล้ว onSnapshot/โหลด Firestore ทำ `push` / `concat` / `[...defaults, ...remote]` แทนการ assign ทับ
- โค้ดเช็ค flag ใน localStorage (เช่น `seeded`, `layoutInitialized`) ถ้าไม่มีก็ seed ค่า default ลง state (หรือเขียนกลับ Firestore)
- merge ด้วย id แต่ id ของ default คงที่ ส่วน id ที่บันทึกเป็นของใหม่ จึงไม่ทับกัน
- โหลดจาก localStorage ก่อน ถ้าว่างใช้ default แล้วค่อยเอา Firestore มาต่อท้าย

## สิ่งที่ต้องทำ
1. ค้นหาในโค้ด: `ATM`, `ทางเข้าหลัก`, `เวที`, `ห้องน้ำ`, `default`, `initial`, `seed`, `demo`, `localStorage` แล้วหาจุดที่สร้างวัตถุตั้งต้น
2. ไล่ flow ตอนเปิดแอปบนเครื่องที่ไม่มี localStorage: state เริ่มจากอะไร แล้วข้อมูล Firestore ถูกเอาเข้ามาอย่างไร
3. แก้ให้:
   - ถ้า Firestore มี doc ผังอยู่แล้ว ให้ **แทนที่** objects / stalls / zones ทั้งหมดด้วยข้อมูลจาก Firestore เท่านั้น ห้าม merge กับ default
   - ใช้ default เฉพาะตอนที่ Firestore **ไม่มี doc ผังเลย** (และให้เฉพาะ admin เป็นคนสร้าง doc ครั้งแรก)
   - localStorage ใช้เป็น cache ได้ แต่ข้อมูลจาก Firestore ต้องชนะเสมอ
   - ห้ามมีโค้ดที่ seed หรือเขียนค่า default กลับไปที่ Firestore อัตโนมัติ
4. เช็คว่า `saveLayoutToFirestore` บันทึกทุกอย่างที่หน้าโหลดอ่าน (objects/stalls/zones) และหน้าลูกค้า/หน้า admin อ่านจาก path เดียวกัน
5. ถ้าใน Firestore มีวัตถุตั้งต้นค้างอยู่จริง (ไม่ใช่แค่ใน state) ให้บอกผมว่าอยู่ตรงไหน **ห้ามลบข้อมูลใน Firestore เอง**
6. `npm run build` ให้ผ่าน แล้วทดสอบด้วย `npm run dev` ในหน้าต่าง incognito ว่าเห็นแค่ผังที่บันทึกไว้
7. บอกคำสั่ง deploy: `firebase deploy --only hosting` (ยังไม่ต้อง deploy เอง)

## รายงานกลับ
- ไฟล์และบรรทัดที่ทำให้ default โผล่, วิธีแก้, ผลทดสอบ incognito, ข้อมูลขยะใน Firestore (ถ้ามี)
