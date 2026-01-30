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
    question: "Wat doet een Software Developer eigenlijk?",
    answers: [
      { text: "Computers repareren", correct: false },
      { text: "Programma's en apps bedenken en bouwen", correct: true },
      { text: "Internet sneller maken", correct: false },
      { text: "Alleen spelletjes spelen", correct: false },
    ],
  },
    {
    question: "Wat is een programmeertaal?",
    answers: [
      { text: "Een taal die alleen computers begrijpen", correct: false },
      { text: "Een soort code waarmee je computers instructies geeft", correct: true },
      { text: "Een geheime taal voor hackers", correct: false },
      { text: "Een internationale spreektaal", correct: false },
    ],
  },
   {
    question: "Wat gebeurt er meestal als eerste bij het maken van software?",
    answers: [
      { text: "Meteen beginnen met typen", correct: false },
      { text: "Het idee testen op gebruikers", correct: false },
      { text: "Nadenken over het probleem en de oplossing", correct: true },
      { text: "De software verkopen", correct: false },
    ],
  },
    {
    question: "Wat is een “bug” in software?",
    answers: [
      { text: "Een virus", correct: false },
      { text: "Een foutje in het programma", correct: true },
      { text: "Een computeronderdeel", correct: false },
      { text: "Een update", correct: false },
    ],
  },
    {
    question: "Hoe lossen developers bugs meestal op?",
    answers: [
      { text: "Door de computer opnieuw op te starten", correct: false },
      { text: "Door alles opnieuw te bouwen", correct: false },
      { text: "Door het probleem stap voor stap te onderzoeken", correct: true },
      { text: "Door iemand anders te vragen het te doen", correct: false },
    ],
  },
  {
    question: "Werk je als software developer meestal alleen?",
    answers: [
      { text: "Ja, altijd", correct: false },
      { text: "Nee, bijna nooit", correct: false },
      { text: "Alleen ’s nachts", correct: false },
      { text: "Soms alleen, vaak in een team", correct: true },
    ],
  },
  {
    question: "Wat maakt software development voor veel mensen leuk?",
    answers: [
      { text: "Dat je creatief problemen oplost", correct: true },
      { text: "Dat je weinig hoeft na te denken", correct: false },
      { text: "Dat je nooit hoeft te leren", correct: false },
      { text: "Dat alles altijd meteen werkt", correct: false },
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
      " p-2 hover:bg-gray-200 transition text-left hover:cursor-pointer scalda-green-gradient-reverse text-white font-scalda-alt";

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
