// ============================================================
// EduExam Question Parser
// ============================================================
// প্রশ্নগুলো এই format-এ টাইপ করো বা PDF থেকে কপি-পেস্ট করো, তারপর
// "Parse & Add Questions" চাপলে সবগুলো প্রশ্ন অটো-যোগ হয়ে যাবে।
//
// প্রতিটা প্রশ্ন খালি লাইন দিয়ে আলাদা থাকতে হবে। উদাহরণ:
//
// 1. What is the capital of Bangladesh?
// A) Dhaka
// B) Chattogram
// C) Khulna
// D) Sylhet
// Answer: A
// Points: 2
//
// 2. The sun rises in the east.
// True/False
// Answer: True
//
// 3. Who wrote the national anthem of Bangladesh?
// Short Answer
// Answer: Rabindranath Tagore, Tagore
// ============================================================

function parseQuestionsText(rawText) {
  const blocks = (rawText || "")
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);

  const questions = [];
  const errors = [];

  blocks.forEach((block, blockIdx) => {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    try {
      const q = parseBlock(lines);
      if (q) questions.push(q);
    } catch (err) {
      errors.push(`Block ${blockIdx + 1} ("${lines[0].slice(0, 40)}..."): ${err.message}`);
    }
  });

  return { questions, errors };
}

function parseBlock(lines) {
  // First line = question text, strip a leading "1." / "Q1)" style prefix
  const questionText = lines[0].replace(/^\s*(?:q\s*)?\d+[\.\)]\s*/i, "").trim();
  if (!questionText) throw new Error("couldn't find question text on the first line");

  let type = null;
  const options = [];
  let answerLine = null;
  let points = 1;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (/^true\s*\/\s*false$/i.test(line)) { type = "truefalse"; continue; }
    if (/^short\s*answer$/i.test(line)) { type = "short"; continue; }

    const optMatch = line.match(/^([A-Ha-h])[\.\)]\s*(.+)$/);
    if (optMatch) { options.push({ letter: optMatch[1].toUpperCase(), text: optMatch[2].trim() }); continue; }

    const ansMatch = line.match(/^answer\s*:\s*(.+)$/i);
    if (ansMatch) { answerLine = ansMatch[1].trim(); continue; }

    const ptsMatch = line.match(/^points?\s*:\s*(\d+(\.\d+)?)$/i);
    if (ptsMatch) { points = Number(ptsMatch[1]); continue; }
  }

  if (!answerLine) throw new Error('missing an "Answer:" line');

  // Decide type if not explicitly marked
  if (!type) type = options.length > 0 ? "mcq" : "short";

  if (type === "mcq") {
    if (options.length < 2) throw new Error("MCQ needs at least 2 lettered options (A), B), ...)");
    let correctText = null;
    // Answer given as a letter (A/B/C...)
    const letterMatch = answerLine.match(/^([A-Ha-h])$/);
    if (letterMatch) {
      const found = options.find(o => o.letter === letterMatch[1].toUpperCase());
      if (!found) throw new Error(`answer letter "${answerLine}" doesn't match any option`);
      correctText = found.text;
    } else {
      // Answer given as the option's full text
      const found = options.find(o => o.text.toLowerCase() === answerLine.toLowerCase());
      if (!found) throw new Error(`answer "${answerLine}" doesn't match any option letter or text`);
      correctText = found.text;
    }
    return {
      id: EduUtils.uid(), type: "mcq", text: questionText, points,
      options: options.map(o => o.text),
      correctAnswers: [correctText],
    };
  }

  if (type === "truefalse") {
    const normalized = /^true$/i.test(answerLine) ? "True" : /^false$/i.test(answerLine) ? "False" : null;
    if (!normalized) throw new Error('True/False answer must be "True" or "False"');
    return { id: EduUtils.uid(), type: "truefalse", text: questionText, points, options: ["True", "False"], correctAnswers: [normalized] };
  }

  // Short answer
  const accepted = answerLine.split(",").map(s => s.trim()).filter(Boolean);
  if (accepted.length === 0) throw new Error("short-answer question needs at least one accepted answer");
  return { id: EduUtils.uid(), type: "short", text: questionText, points, correctAnswers: accepted };
}

const SAMPLE_FORMAT = `1. What is the capital of Bangladesh?
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
Answer: Rabindranath Tagore, Tagore`;

window.EduParser = { parseQuestionsText, SAMPLE_FORMAT };
