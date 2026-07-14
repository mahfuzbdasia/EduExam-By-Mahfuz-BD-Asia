// Small shared helpers used across pages. Loaded as a plain (non-module) script
// so it can be used easily even on pages that don't need Firebase.

function toast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function generateExamKey(subject = "GEN") {
  const clean = (subject || "GEN").replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 4) || "GEN";
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${clean}-${rand}`;
}

function uid() {
  return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function slugify(text) {
  return (text || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Grades one question given the student's answer. Returns { earned, max }.
function gradeQuestion(question, studentAnswer) {
  const max = Number(question.points) || 0;
  if (question.type === "mcq" || question.type === "truefalse") {
    const correct = (question.correctAnswers || [])[0];
    const earned = studentAnswer !== undefined && studentAnswer === correct ? max : 0;
    return { earned, max };
  }
  if (question.type === "short") {
    const accepted = (question.correctAnswers || []).map((a) => a.trim().toLowerCase());
    const given = (studentAnswer || "").trim().toLowerCase();
    const earned = accepted.includes(given) ? max : 0;
    return { earned, max };
  }
  // Unknown/manual types default to 0 (would need manual grading in a future version)
  return { earned: 0, max };
}

function gradeSubmission(exam, answers) {
  let autoScore = 0;
  let autoMax = 0;
  exam.questions.forEach((q) => {
    const { earned, max } = gradeQuestion(q, answers[q.id]);
    autoScore += earned;
    autoMax += max;
  });
  return { autoScore, autoMax };
}

const TEAM_COLORS = ["#2563eb", "#dc2626", "#16a34a", "#d97706", "#7c3aed", "#0891b2", "#db2777", "#65a30d"];
function teamColor(teamIndex) {
  return TEAM_COLORS[teamIndex % TEAM_COLORS.length];
}

function generateBattleCode() {
  return Math.random().toString(36).slice(2, 7).toUpperCase();
}

const MEDALS = ["🥇", "🥈", "🥉"];

window.EduUtils = {
  toast, generateExamKey, uid, slugify, escapeHtml, formatDuration, gradeQuestion, gradeSubmission,
  teamColor, generateBattleCode, MEDALS,
};
