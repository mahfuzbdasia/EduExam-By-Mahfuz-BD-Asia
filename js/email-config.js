// ============================================================
// EMAIL REPORT CONFIG (EmailJS — 100% ফ্রি, ২০০ ইমেইল/মাস, কার্ড লাগবে না)
// ============================================================
// কীভাবে সেটআপ করবে (৫ মিনিট):
// 1) https://www.emailjs.com -> Sign Up (ফ্রি)
// 2) Email Services -> Add New Service -> Gmail/Outlook যেকোনো একটা যোগ করো
//    -> এখান থেকে একটা "Service ID" পাবে
// 3) Email Templates -> Create New Template -> নিচের ভ্যারিয়েবলগুলো ব্যবহার
//    করে একটা টেমপ্লেট বানাও:
//      To email:  {{to_email}}
//      Subject:   Your Exam Result — {{exam_title}}
//      Body:      Hi {{student_name}},
//
//                 You scored {{score}} / {{max_score}} ({{percent}}%) on
//                 "{{exam_title}}".
//
//                 {{breakdown}}
//    -> Save করলে একটা "Template ID" পাবে
// 4) Account -> General -> "Public Key" কপি করো
// 5) নিচের তিনটা মান বসাও
// ============================================================

window.EMAILJS_CONFIG = {
  publicKey: "rT0N25gtcyk3xP5M3",
  serviceId: "service_brbhzd2",
  templateId: "EduExam",
};

if (window.emailjs && window.EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
  emailjs.init({ publicKey: window.EMAILJS_CONFIG.publicKey });
}
