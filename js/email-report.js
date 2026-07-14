// ============================================================
// Builds a right/wrong breakdown and sends it by email via EmailJS.
// Gracefully does nothing (no crash) if the student gave no email,
// or if EmailJS hasn't been configured yet (see js/email-config.js).
// ============================================================

function buildBreakdownText(questions, answers) {
  return questions.map((q, i) => {
    const given = answers[q.id];
    const { earned, max } = EduUtils.gradeQuestion(q, given);
    const isCorrect = earned >= max && max > 0;
    const correctDisplay = EduUtils.escapeHtml((q.correctAnswers || []).join(" / "));
    const givenDisplay = given === undefined || given === "" ? "(no answer)" : EduUtils.escapeHtml(given);
    const questionText = EduUtils.escapeHtml(q.text);
    const color = isCorrect ? "#15803d" : "#b91c1c";
    const bg = isCorrect ? "#f0fdf4" : "#fef2f2";
    const icon = isCorrect ? "✅" : "❌";

    return `
      <div style="margin-bottom:14px; padding:12px 16px; border-left:4px solid ${color}; background:${bg}; border-radius:6px; font-family:Arial,sans-serif;">
        <div style="font-weight:600; color:#111827; margin-bottom:6px;">Q${i + 1}. ${questionText}</div>
        <div style="font-size:14px; color:#374151; margin-bottom:2px;">Your answer: <strong>${givenDisplay}</strong></div>
        <div style="font-size:14px; color:#374151; margin-bottom:6px;">Correct answer: <strong>${correctDisplay}</strong></div>
        <div style="font-size:14px; font-weight:600; color:${color};">${icon} ${isCorrect ? "Correct" : "Incorrect"} (${earned}/${max} pts)</div>
      </div>`;
  }).join("");
}

async function sendResultEmail({ studentName, studentEmail, examTitle, questions, answers, totalScore, maxScore }) {
  if (!studentEmail) return { skipped: true, reason: "no-email" };

  const cfg = window.EMAILJS_CONFIG;
  if (!cfg || !cfg.publicKey || cfg.publicKey === "YOUR_PUBLIC_KEY") {
    console.warn("EduExam: EmailJS isn't configured yet (see js/email-config.js) — skipping email send.");
    return { skipped: true, reason: "not-configured" };
  }
  if (!window.emailjs) {
    console.warn("EduExam: EmailJS SDK didn't load — skipping email send.");
    return { skipped: true, reason: "sdk-not-loaded" };
  }

  const percent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const breakdown = buildBreakdownText(questions, answers);

  try {
    await window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email: studentEmail,
      student_name: studentName,
      exam_title: examTitle,
      score: totalScore,
      max_score: maxScore,
      percent,
      breakdown,
    });
    return { sent: true };
  } catch (err) {
    console.error("EduExam: failed to send result email", err);
    return { sent: false, error: err };
  }
}

window.EduEmail = { sendResultEmail };
