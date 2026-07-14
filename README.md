# EduExam — Free Online Exam Platform

সম্পূর্ণ ফ্রি, login/password-প্রোটেক্টেড, real cross-device online exam platform।
টিচার এক ডিভাইস থেকে exam বানাবে, student অন্য যেকোনো ডিভাইস/বাসা থেকে সেই exam key দিয়ে দিতে পারবে — কোনো টাকা লাগবে না।

## এটা কী করে (in short)
- Teacher **email + password দিয়ে login** করে (Firebase Authentication) — শুধু সে নিজেই তার exam দেখতে/এডিট করতে পারবে।
- Exam data **Firestore** (Google-এর ফ্রি cloud database)-এ জমা থাকে, তাই সব ডিভাইস থেকে সিঙ্ক থাকে।
- Student-দের কোনো একাউন্ট লাগে না — শুধু **Exam Key** + নাম দিয়ে ঢুকতে পারবে।
- MCQ / True-False / Short-Answer প্রশ্ন **auto-grade** হয়।

## ⚠️ শুরু করার আগে — একবারের সেটআপ (৫ মিনিট, সম্পূর্ণ ফ্রি, কার্ড লাগবে না)

1. যাও: https://console.firebase.google.com → **Add project** → যেকোনো নাম দাও → Create।
   (Google Analytics-এর অপশন আসলে "না" বলে দিতে পারো, দরকার নেই।)
2. বাম মেনু থেকে **Build → Authentication** → **Get Started** → **Sign-in method** ট্যাবে
   **Email/Password** চালু (Enable) করো।
3. বাম মেনু থেকে **Build → Firestore Database** → **Create database** → **Start in test mode**
   (এই স্টেপের পর, নিচের ধাপ ৫ অনুযায়ী আসল rules বসিয়ে দেবে)।
4. **Project settings** (⚙️ আইকন, উপরে বামে) → **General** ট্যাব → নিচে scroll করে
   **"Your apps"** → **Web (`</>`)** আইকনে ক্লিক → একটা নিকনেম দাও → Register।
   এখন যে `firebaseConfig = { ... }` অবজেক্টটা দেখাবে, সেটা কপি করো।
5. এই প্রজেক্টের `js/firebase-init.js` ফাইল খুলে, উপরের ধাপ থেকে কপি করা মানগুলো
   `firebaseConfig` অবজেক্টে বসিয়ে দাও (`YOUR_API_KEY` ইত্যাদি জায়গায়)।
6. Firebase Console-এ ফিরে গিয়ে **Firestore Database → Rules** ট্যাবে যাও, এই প্রজেক্টের
   `firestore.rules` ফাইলের পুরো কনটেন্ট কপি করে paste করো, তারপর **Publish** চাপো।

ব্যস, সেটআপ শেষ! এখন পুরো সাইটটা যেকোনো ফ্রি static hosting-এ কাজ করবে।

## কীভাবে চালাবে (লোকাল টেস্টিং)

`type="module"` স্ক্রিপ্ট ব্যবহার করার কারণে ফাইল সরাসরি ডাবল-ক্লিক করে (`file://`)
খুললে ব্রাউজার এটা ব্লক করবে (CORS নিয়ম)। তাই একটা ছোট লোকাল সার্ভার দিয়ে চালাও:

```bash
# পাইথন ইনস্টল করা থাকলে (বেশিরভাগ কম্পিউটারেই থাকে):
cd eduexam
python3 -m http.server 8000
# তারপর ব্রাউজারে যাও: http://localhost:8000
```

অথবা VS Code-এ **"Live Server"** এক্সটেনশন ইনস্টল করে `index.html`-এ right-click →
**"Open with Live Server"**।

## ফ্রি-তে সবার জন্য পাবলিশ করবে কীভাবে

যেকোনো একটা (সবগুলোই সম্পূর্ণ ফ্রি):

- **Firebase Hosting** (একই প্রজেক্টের সাথে, সবচেয়ে সহজ):
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting     # public directory হিসেবে এই ফোল্ডার সিলেক্ট করো
  firebase deploy
  ```
- **GitHub Pages**: এই ফোল্ডারটা একটা GitHub রিপোতে push করে, Settings → Pages থেকে চালু করো।
- **Netlify / Vercel**: ফোল্ডারটা ড্র্যাগ-ড্রপ করলেই ফ্রি লিংক পেয়ে যাবে।

## ফোল্ডার স্ট্রাকচার

```
eduexam/
├── index.html               # হোমপেজ
├── about.html
├── teacher-login.html        # টিচার সাইনআপ/লগইন
├── teacher-dashboard.html     # টিচারের নিজের exam list
├── create-exam.html          # exam তৈরি/এডিট + প্রশ্ন বিল্ডার
├── student-join.html         # student exam key বা battle code — যেকোনোটা দিয়ে ঢোকে
├── exam-instructions.html
├── take-exam.html            # আসল exam — timer, autosave, navigation
├── exam-result.html          # সাবমিটের পর স্কোর দেখায়
├── results-analytics.html    # টিচারের জন্য সব student-এর রেজাল্ট + CSV export
├── create-team-exam.html     # ⚔️ mentor: team battle তৈরি (dashboard থেকে, login লাগবে)
├── team-waiting-room.html    # ⚔️ student: team assign হওয়ার অপেক্ষা (live)
├── mentor-lobby.html         # ⚔️ mentor: team assign + start
├── team-battle-live.html     # ⚔️ student: live battle প্রশ্নোত্তর
├── mentor-battle-dashboard.html # ⚔️ mentor: live progress bars
├── team-battle-result.html   # ⚔️ 🏆 podium + final ranking
├── css/style.css
├── js/
│   ├── firebase-init.js      # 🔑 এখানে নিজের Firebase config বসাও
│   ├── utils.js              # helper functions (grading, timer format, ইত্যাদি)
│   ├── qrcode.min.js         # 📱 হোমপেজের QR কোড লাইব্রেরি (self-contained)
│   ├── question-parser.js    # 📥 PDF/text থেকে প্রশ্ন parse করার লজিক
│   ├── email-config.js       # 📧 এখানে নিজের EmailJS config বসাও
│   └── email-report.js       # 📧 রেজাল্ট ইমেইল বানানো ও পাঠানোর লজিক
├── firestore.rules           # 🔒 Firebase Console-এ paste করার security rules
└── README.md
```

## 🆕 নতুন যোগ হয়েছে (v3)

### 📱 হোমপেজে QR কোড
`index.html`-এ এখন একটা QR কোড থাকে যেটা সরাসরি `student-join.html`-এ নিয়ে যায়। এটা
পুরোপুরি client-side (কোনো বাইরের API-এর উপর নির্ভর করে না — `js/qrcode.min.js` লাইব্রেরি
লোকালি বান্ডল করা), এবং সাইট যেখানেই হোস্ট করো না কেন (Firebase/GitHub Pages/Netlify)
অটোমেটিক্যালি সঠিক URL দিয়ে কোড তৈরি হয়ে যাবে — কিছু বদলাতে হবে না।

### 📥 PDF/Text থেকে প্রশ্ন Import (Create Exam ও Create Team Battle — দুই জায়গাতেই)
Mentor এখন হাতে একটা একটা করে প্রশ্ন না বসিয়ে, নির্দিষ্ট একটা টেক্সট ফরম্যাটে
প্রশ্ন পেস্ট করে (বা PDF আপলোড করে — টেক্সট অটো বের করে আনবে) একসাথে অনেকগুলো
প্রশ্ন যোগ করতে পারবে। ফরম্যাট:

```
1. What is the capital of Bangladesh?
A) Dhaka
B) Chattogram
C) Khulna
D) Sylhet
Answer: A
Points: 2

2. The sun rises in the east.
True/False
Answer: True

3. Who wrote the national anthem of Bangladesh?
Short Answer
Answer: Rabindranath Tagore, Tagore
```

- প্রতিটা প্রশ্নের মাঝে একটা খালি লাইন থাকতে হবে।
- MCQ-এর জন্য `A)`, `B)`... করে অপশন, `Answer: A` (লেটার) বা `Answer: Dhaka` (পুরো টেক্সট) দুটোই চলবে।
- সততার সাথে বলে রাখি: এটা "AI" দিয়ে বোঝে না — এটা একটা নির্দিষ্ট, নির্ভরযোগ্য rule-based
  parser, যাতে ভুল ব্যাখ্যা করে ভুল উত্তর সেট হয়ে যাওয়ার ঝুঁকি না থাকে। যেই ব্লকগুলো এই
  ফরম্যাটে নেই, সেগুলো স্কিপ হয়ে যাবে আর কেন স্কিপ হলো তা মেসেজ আকারে দেখাবে — তুমি সেগুলো
  ম্যানুয়ালি ঠিক করে আবার বসাতে পারবে।
- PDF আপলোড করলে `pdf.js` (ফ্রি লাইব্রেরি, CDN থেকে লোড হয়) দিয়ে টেক্সট বের করে বক্সে বসিয়ে
  দেয় — এরপর ফরম্যাট ঠিকঠাক আছে কিনা চোখ বুলিয়ে "Parse & Add Questions" চাপো। PDF-এর
  লেআউট জটিল হলে টেক্সট এলোমেলো আসতে পারে; সেক্ষেত্রে বক্সে হাতে একটু ঠিক করে নিলেই হবে।

### 📧 পরীক্ষা শেষে ইমেইলে রিপোর্ট (EmailJS — ফ্রি, কার্ড লাগবে না, মাসে ২০০ ইমেইল ফ্রি)
Join ফর্মে এখন একটা ঐচ্ছিক **Email** ফিল্ড আছে। Student ইমেইল দিলে, exam সাবমিট করার
সাথে সাথেই তার স্কোর এবং **প্রতিটা প্রশ্নে সঠিক/ভুল** এর বিস্তারিত রিপোর্ট ইমেইলে চলে যাবে —
regular exam এবং team battle, দুটোতেই কাজ করে।

**এটা চালু করতে (৫ মিনিট, ফ্রি, কার্ড লাগবে না):**
1. https://www.emailjs.com -> Sign Up
2. **Email Services -> Add New Service** -> নিজের Gmail/Outlook যোগ করো -> একটা **Service ID** পাবে।
3. **Email Templates -> Create New Template** -> এই ভ্যারিয়েবলগুলো ব্যবহার করে বানাও:
   - To email: `{{to_email}}`
   - Subject: `Your Exam Result — {{exam_title}}`
   - Body: `Hi {{student_name}}, you scored {{score}} / {{max_score}} ({{percent}}%) on "{{exam_title}}".` তারপর `{{breakdown}}` বসাও (এখানে প্রতিটা প্রশ্নের সঠিক/ভুল বিস্তারিত থাকবে)।
   -> Save করলে একটা **Template ID** পাবে।
4. **Account -> General -> Public Key** কপি করো।
5. `js/email-config.js` ফাইলে এই তিনটা মান বসাও (`publicKey`, `serviceId`, `templateId`)।

এটা সেটআপ না করলেও পুরো সাইট স্বাভাবিকভাবে কাজ করবে — শুধু ইমেইল রিপোর্ট অংশটা silently
স্কিপ হয়ে যাবে (কোনো error দেখাবে না)।

## 🛠️ Bug Fixes (v4 — এই আপডেটে)

**⚠️ সবার আগে এটা করো:** `firestore.rules` ফাইলের কনটেন্ট আবার কপি করে Firebase Console →
Firestore Database → Rules ট্যাবে paste করে **Publish** করো। এই আপডেটে একটা critical
rule বাগ ফিক্স করা হয়েছে (নিচে Problem 2 দেখো) — শুধু কোড আপডেট করলেই হবে না, rules-ও
নতুন করে publish করতে হবে, নাহলে student-রা এখনো ফলাফল দেখতে পারবে না।

1. **Tab-switch/আরেকটা ট্যাবে গিয়ে উত্তর খোঁজা** — Team Battle-এ আগে এই ডিটেকশন ছিলই না;
   এখন solo exam-এর মতোই battle-এও tab-switch গোনা হয় এবং mentor-এর লাইভ ড্যাশবোর্ড ও
   ফাইনাল রেজাল্টে দেখানো হয়। সততার সাথে বলছি — এটা একটা free browser-based টুল, তাই
   অন্য ডিভাইস দিয়ে খোঁজাখুঁজি সম্পূর্ণ আটকানো সম্ভব না (যেটা enterprise paid lockdown
   software করে); এটা শুধু detect করে দেখিয়ে দেয়, hard-block করে না।

2. **Battle শেষে student-দের স্ক্রিনে রেজাল্ট না যাওয়া** — এটার আসল কারণ ছিল
   `firestore.rules`-এ একটা বাগ: `battleParticipants` কালেকশনের "list" পারমিশন শুধু
   login করা mentor-দের জন্য ছিল, কিন্তু student-দের কোনো login নেই — তাই
   `team-battle-result.html` লোড হওয়ার সময় "permission denied" এরর হয়ে পুরো পেজ চুপচাপ
   আটকে যেত। এখন rules ঠিক করা হয়েছে (**উপরের ⚠️ নোট অনুযায়ী আবার Publish করতে হবে**)।

3. **ইমেইল রিপোর্ট না যাওয়া** — Team Battle-এ আগে শুধু student নিজে সাবমিট করলে ইমেইল
   যেত; মেন্টর "End Battle" চাপলে কাউকে ইমেইল করার কোনো কোড-ই ছিল না। এখন "End Battle"
   চাপলে যাদের ইমেইল দেওয়া আছে কিন্তু এখনো রিপোর্ট পায়নি, তাদের সবাইকে একসাথে ইমেইল করে
   দেয় — তাই কেউ যদি সাবমিট না করেও থাকে (সময় শেষ, বা battle আগে বন্ধ করে দেওয়া হলো),
   তাদের কাছেও রিপোর্ট চলে যাবে। Solo exam-এর ইমেইল যদি এখনো না যায়, ব্রাউজারের DevTools
   Console খুলে দেখো — `EduExam:` দিয়ে শুরু হওয়া কোনো error লগ হচ্ছে কিনা (ভুল
   Service/Template ID, অথবা EmailJS Account → Security-তে origin allowlist restriction
   থাকলে এমন হতে পারে)।

4. **দেরিতে আসা student-কে টিমে ঢোকানো** — আগে টিম assign করার সুযোগ শুধু battle শুরুর
   আগে (Lobby) ছিল। এখন **`mentor-battle-dashboard.html`**-এ battle চলাকালীনও একটা
   "Manage Participants" প্যানেল আছে — দেরিতে জয়েন করা যে কেউ এখানে অটোমেটিক দেখা যাবে,
   এবং যেকোনো সময় তাকে একটা টিমে বসিয়ে দেওয়া যাবে।

5. **কোনো কারণে exam/battle থেকে বের হয়ে গেলে আবার জয়েন করা** — Solo exam এমনিতেই
   আগে থেকে কাজ করে (একই key + নাম দিয়ে আবার ঢুকলে আগের উত্তর/সময় ঠিক জায়গা থেকে চালু
   হয়ে যায়)। Team Battle-এও একই কোড+নাম দিলে আগের প্রগ্রেস বজায় থাকে, তবে যদি কারো এন্ট্রি
   আটকে/নষ্ট হয়ে যায়, এখন Mentor Lobby ও Live Dashboard — দুই জায়গাতেই একটা **"Remove"**
   বাটন আছে যেটা দিয়ে সেই student-এর এন্ট্রি মুছে দেওয়া যাবে, এরপর সে student-join
   পেজ থেকে সম্পূর্ণ নতুন করে ঢুকতে পারবে।

6. **সময় শেষ হওয়ার আগেই কেউ সাবমিট করে আবার ঢুকে রেজাল্ট দেখে ফেলা (answer leak-এর ঝুঁকি)** —
   এখন `exam-result.html` রেজাল্ট/সঠিক উত্তর তখনই দেখাবে যখন হয় (ক) সেই student-এর
   নিজের সময়সীমা স্বাভাবিকভাবে শেষ হয়ে গেছে, অথবা (খ) Teacher Dashboard থেকে সেই
   exam-টা ম্যানুয়ালি **"Close Exam"** করে দেওয়া হয়েছে। তার আগ পর্যন্ত শুধু
   "সাবমিট হয়েছে, ফলাফল পরে আসবে" — এই মেসেজ দেখাবে, স্কোর/সঠিক উত্তর কিছুই না —
   ফলে দ্রুত শেষ করা কেউ এখনো পরীক্ষা দিচ্ছে এমন সহপাঠীর সাথে উত্তর শেয়ার করতে পারবে না।
   (Team Battle-এ এটা আগে থেকেই ঠিক ছিল — result শুধু Mentor "End Battle" করার পরই দেখা যায়।)

## এখন যা কাজ করে (v1)

- ✅ Teacher signup/login (email+password), logout
- ✅ Exam তৈরি: MCQ, True/False, Short Answer, per-question points
- ✅ Draft/Publish, unique Exam Key তৈরি
- ✅ Student join by key + name (কোনো একাউন্ট লাগে না)
- ✅ Timer, autosave (refresh করলেও উত্তর হারায় না), tab-switch logging
- ✅ Auto-grading + instant result
- ✅ Teacher results dashboard + CSV export

## ⚔️ Team Battle Mode (v2 — নতুন যোগ হয়েছে)

Mentor অনেকগুলো টিমে ভাগ করে একটা লাইভ কুইজ প্রতিযোগিতা চালাতে পারবে:

1. **`create-team-exam.html`** (শুধু login করা mentor-এর dashboard থেকে অ্যাক্সেসযোগ্য, হোমপেজে পাবলিক বাটন নেই) — Mentor টিমের সংখ্যা (২–৬টা) ও নাম ঠিক করে, প্রশ্ন যোগ করে, একটা **Battle Code** পায়।
2. **`student-join.html`** — এটাই এখন একমাত্র জয়েন পেজ, regular exam এবং team battle দুটোর জন্যই। Student শুধু একটা কোড দেয়; কোডটা `exams` কালেকশনে পাওয়া গেলে normal exam flow-এ যায়, `battles` কালেকশনে পাওয়া গেলে battle flow-এ (`team-waiting-room.html`) যায় — student-কে আলাদা করে বেছে নিতে হয় না।
3. **`mentor-lobby.html`** — Mentor দেখে কারা জয়েন করেছে, প্রত্যেককে ড্রপডাউন থেকে একটা টিমে assign করে, তারপর **"Start Battle"** চাপে — মুহূর্তেই সব student-এর ওয়েটিং রুম থেকে অটো-রিডাইরেক্ট হয়ে যায়।
4. **`team-battle-live.html`** — Student-রা প্রশ্নের উত্তর দেয় (timer + autosave), প্রতিটা উত্তরের সাথে সাথে টিমের স্কোর লাইভ আপডেট হয়।
5. **`mentor-battle-dashboard.html`** — Mentor **রিয়েল-টাইম progress bar** দেখে — কোন টিম কত % সঠিক উত্তর দিচ্ছে, রঙ অনুযায়ী আলাদা, সবচেয়ে এগিয়ে থাকা টিমে 👑 আইকন। "End Battle" চাপলে সবার জন্য ফলাফল প্রকাশ হয়।
6. **`team-battle-result.html`** — 🥇🥈🥉 podium গ্রাফিক দিয়ে টিম র‍্যাংকিং + প্রতিটা student-এর ব্যক্তিগত স্কোর টেবিল।

**ডেটা মডেল:**
- `battles/{code}` — battle-এর তথ্য, প্রশ্ন, টিমের নাম, status (`waiting`→`active`→`finished`)।
- `battleParticipants/{code__name}` — প্রতিটা student-এর নাম, assigned team, উত্তর, লাইভ correctCount।

সবকিছু Firestore-এর `onSnapshot` (রিয়েল-টাইম listener) দিয়ে চলে — তাই কারো ম্যানুয়ালি রিফ্রেশ করার দরকার নেই, সব automatically আপডেট হয়।

## ভবিষ্যতে যোগ করা যায় (v2 আইডিয়া, এখনো নেই)

- Long-answer প্রশ্নের জন্য manual grading UI
- একই exam-এ প্রশ্ন/অপশন shuffle করা
- Question Bank (পুরনো প্রশ্ন পুনর্ব্যবহার)
- Bangla/English ভাষা টগল
- একই exam key দিয়ে রেজাল্ট আবার চেক করার আলাদা lookup পেজ

## সততার সাথে একটা সীমাবদ্ধতা বলে রাখি

যেহেতু এটা সম্পূর্ণ ফ্রি এবং কোনো paid server-side function ছাড়া বানানো, তাই
পরীক্ষার সঠিক উত্তর (`correctAnswers`) ব্রাউজারে (client-side) গ্রেড করা হয় —
একজন টেকনিক্যাল student চাইলে ব্রাউজারের DevTools দিয়ে সেটা দেখার চেষ্টা করতে
পারে, ঠিক যেমন সব বিনামূল্যের client-only exam টুলে হয়। সত্যিকারের high-stakes
পরীক্ষার জন্য (paid) enterprise টুলগুলো এটা এড়াতে server-side grading (Cloud
Functions ইত্যাদি) ব্যবহার করে, যেটা এই "সম্পূর্ণ ফ্রি, কার্ড লাগবে না" স্কোপের
বাইরে। ক্লাসরুম/হোমওয়ার্ক পর্যায়ের ব্যবহারের জন্য এটা সম্পূর্ণ যথেষ্ট এবং নিরাপদ।
