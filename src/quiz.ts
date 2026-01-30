/* =========================
   1. TYPES & INTERFACES
========================= */

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

/* =========================
   2. QUIZ DATA
========================= */

const questions: Question[] = [
  {
    question: "Wat betekent HTML?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperTool Multi Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Welke taal gebruik je voor styling?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "Python", correct: false },
    ],
  },
];

/* =========================
   3. DOM ELEMENTEN
========================= */

const questionEl = document.getElementById("question") as HTMLParagraphElement;
const answersEl = document.getElementById("answers") as HTMLDivElement;
const resultEl = document.getElementById("result") as HTMLParagraphElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;

/* =========================
   4. STATE
========================= */

let currentQuestion: number = 0;
let score: number = 0;

/* =========================
   5. FUNCTIES
========================= */

function showQuestion(): void {
  resetState();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.className =
      "border rounded-lg p-2 hover:bg-gray-200 transition text-left";

    btn.addEventListener("click", () => selectAnswer(answer.correct));
    answersEl.appendChild(btn);
  });
}

function resetState(): void {
  answersEl.innerHTML = "";
  resultEl.textContent = "";
  nextBtn.classList.add("hidden");
}

function selectAnswer(correct: boolean): void {
  if (correct) {
    resultEl.textContent = "✅ Goed antwoord!";
    score++;
  } else {
    resultEl.textContent = "❌ Helaas, fout antwoord.";
  }

  nextBtn.classList.remove("hidden");
}

function showResult(): void {
  questionEl.textContent = "Quiz afgerond!";
  answersEl.innerHTML = "";
  resultEl.textContent = `Je score: ${score} / ${questions.length}`;
  nextBtn.classList.add("hidden");
}

/* =========================
   6. EVENT LISTENERS
========================= */

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

showQuestion();
