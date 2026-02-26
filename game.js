const challenges = [
  {
    topic: "Machine Learning Basics",
    question: "A model gets better by learning from examples. This is called:",
    choices: ["Inference", "Training", "Rendering", "Hashing"],
    answer: 1,
    explanation: "Training is when the model adjusts itself using data examples."
  },
  {
    topic: "Data Quality",
    question: "Why is clean and diverse data important?",
    choices: [
      "It makes models fairer and more accurate",
      "It decreases electricity instantly",
      "It removes the need for testing",
      "It guarantees 100% truth"
    ],
    answer: 0,
    explanation: "Good data helps the model learn patterns without harmful bias."
  },
  {
    topic: "Prompt Engineering",
    question: "Which prompt is most likely to get a useful answer?",
    choices: [
      "Tell me stuff",
      "Explain photosynthesis for a 7th grader in 3 bullet points",
      "Write",
      "Do anything"
    ],
    answer: 1,
    explanation: "Specific instructions improve AI responses."
  },
  {
    topic: "Ethics",
    question: "What should students do before trusting an AI-generated fact?",
    choices: [
      "Share it quickly",
      "Verify with reliable sources",
      "Assume it's always correct",
      "Ignore citations"
    ],
    answer: 1,
    explanation: "Responsible AI use always includes fact-checking."
  },
  {
    topic: "AI Applications",
    question: "Which is a strong use of AI in education?",
    choices: [
      "Replacing all teachers permanently",
      "Personalized practice and feedback",
      "Giving every student the exact same lesson speed",
      "Skipping student privacy"
    ],
    answer: 1,
    explanation: "AI works best as a supportive tool for personalized learning."
  }
];

let level = 1;
let score = 0;
let lives = 3;
let index = 0;

const levelEl = document.getElementById("level");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const topicEl = document.getElementById("topic");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultCard = document.getElementById("result-card");
const questionCard = document.getElementById("question-card");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");

function updateHud() {
  levelEl.textContent = level;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
}

function renderChallenge() {
  const challenge = challenges[index];
  topicEl.textContent = challenge.topic;
  questionEl.textContent = challenge.question;
  feedbackEl.textContent = "";
  nextBtn.hidden = true;
  answersEl.innerHTML = "";

  challenge.choices.forEach((choice, choiceIndex) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(choiceIndex, btn));
    answersEl.appendChild(btn);
  });
}

function handleAnswer(selected, clickedBtn) {
  const challenge = challenges[index];
  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  buttons.forEach(btn => (btn.disabled = true));

  if (selected === challenge.answer) {
    score += 10;
    level += 1;
    clickedBtn.classList.add("correct");
    feedbackEl.textContent = `Correct! ${challenge.explanation}`;
  } else {
    lives -= 1;
    clickedBtn.classList.add("incorrect");
    buttons[challenge.answer].classList.add("correct");
    feedbackEl.textContent = `Not quite. ${challenge.explanation}`;
  }

  updateHud();
  nextBtn.hidden = false;
}

function showResult() {
  questionCard.hidden = true;
  resultCard.hidden = false;

  if (lives > 0) {
    resultTitle.textContent = "🎓 You Graduated AI Academy!";
    resultMessage.textContent = `Final knowledge score: ${score}. You completed all classroom challenges!`;
  } else {
    resultTitle.textContent = "📘 Study Break";
    resultMessage.textContent = `You reached level ${level} with ${score} knowledge points. Review and try again!`;
  }
}

nextBtn.addEventListener("click", () => {
  index += 1;
  if (index >= challenges.length || lives <= 0) {
    showResult();
  } else {
    renderChallenge();
  }
});

restartBtn.addEventListener("click", () => {
  level = 1;
  score = 0;
  lives = 3;
  index = 0;
  resultCard.hidden = true;
  questionCard.hidden = false;
  updateHud();
  renderChallenge();
});

updateHud();
renderChallenge();
