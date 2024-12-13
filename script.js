// script.js

// DOM-elementen voor verschillende onderdelen van de quiz
const startPage = document.getElementById("start-page");
const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

const startQuizButton = document.getElementById("start-quiz-button");
const restartQuizButton = document.getElementById("restart-quiz-button");

const lifeBar = document.getElementById("life-bar");
const questionText = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const submitAnswerButton = document.getElementById("submit-answer");
const scoreText = document.getElementById("score");

// De vragen en hun juiste antwoorden
let questions = [
    { question: "Wat is de antwoord van de eerste laadstation?", correct: "1" },
    { question: "Wat is de antwoord van de tweede laadstation?", correct: "2" },
    { question: "Wat is de antwoord van de derde laadstation?", correct: "3" },
    { question: "Wat is de antwoord van de vierde laadstation?", correct: "4" },
    { question: "Wat is de antwoord van de vijfde laadstation?", correct: "5" },
    { question: "Wat is de antwoord van de zesde laadstation?", correct: "6" },
    { question: "Wat is de antwoord van de zevende laadstation?", correct: "7" },
    { question: "Wat is de antwoord van de achtste laadstation?", correct: "8" },
    { question: "Wat is de antwoord van de negende laadstation?", correct: "9" },
    { question: "Wat is de antwoord van de tiende laadstation?", correct: "10" },
];

// Variabelen voor het bijhouden van de quizstatus
let currentQuestionIndex = 0; // Huidige vraag index
let life = 80; // Begin met 80% van de levensbalk
let startTime; // Starttijd voor het berekenen van de tijd
let timerInterval; // Interval voor het bijwerken van de levensbalk
let correctAnswers = 0; // Aantal correcte antwoorden
let totalTime; // Totale tijd die de gebruiker heeft genomen

// Functie om de quiz te starten
function startQuiz() {
    life = 80; // Zet leven op 80% bij de start van de quiz
    correctAnswers = 0; // Reset het aantal correcte antwoorden
    currentQuestionIndex = 0; // Zet de vraag index terug naar 0
    startTime = Date.now(); // Zet de starttijd van de quiz
    quizContainer.style.display = "block"; // Toon de quiz container
    startPage.style.display = "none"; // Verberg de startpagina
    scoreContainer.style.display = "none"; // Verberg de score container

    // Maak de kaartknop zichtbaar
    toggleMapButton.style.display = "block";

    updateLifeBar(); // Update de levensbalk
    displayQuestion(); // Toon de eerste vraag
    timerInterval = setInterval(updateLife, 1000); // Zet een interval voor de levensbalk (elke seconde)
}

// Functie om de vraag weer te geven
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex]; // Haal de huidige vraag op
    questionText.textContent = currentQuestion.question; // Zet de tekst van de vraag
    answerInput.value = ""; // Maak het antwoordveld leeg
    answerInput.focus(); // Zet de focus op het antwoordveld
}

// Event listener voor de knop om het antwoord in te dienen
submitAnswerButton.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim(); // Haal het antwoord van de gebruiker op
    checkAnswer(userAnswer); // Controleer of het antwoord correct is
});

// Functie om te controleren of het antwoord correct is
function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex]; // Haal de huidige vraag op
    // Vergelijk het antwoord van de gebruiker met het juiste antwoord
    if (userAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
        correctAnswers++; // Verhoog het aantal correcte antwoorden
        life = Math.min(life + 10, 100); // Voeg 10% leven toe, maximaal 100%
        currentQuestionIndex++; // Ga naar de volgende vraag
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // Toon de volgende vraag
        } else {
            endQuiz(); // Einde van de quiz, ga naar het score-scherm
        }
    } else {
        life -= 15; // Verlies 15% leven bij een fout antwoord
        if (life < 0) life = 0; // Zorg ervoor dat leven niet lager dan 0 gaat
        updateLifeBar(); // Update de levensbalk
        alert("Wrong answer! Try again."); // Toon een foutmelding
        if (life <= 0) {
            endQuiz(); // Als leven 0 bereikt, eindig de quiz
        }
    }
}

// Functie om de levensbalk bij te werken
function updateLife() {
    life -= 1; // Verlies 0.1667% leven per seconde (voor 10 minuten totaal) (100/600)(0.1667%)
    if (life <= 0) {
        life = 0; // Zorg ervoor dat leven niet onder 0 komt
        endQuiz(); // Einde van de quiz bij 0% leven
    }
    updateLifeBar(); // Update de levensbalk
}

// Functie om de levensbalk visueel bij te werken
function updateLifeBar() {
    lifeBar.style.width = `${life}%`; // Zet de breedte van de levensbalk
    // Verander de kleur van de levensbalk op basis van de resterende levens
    lifeBar.style.backgroundColor = life > 50 ? "#4caf50" : life > 20 ? "#ffa500" : "#f44336";
}


// Functie om de quiz te beëindigen
function endQuiz() {
    clearInterval(timerInterval); // Stop de timer
    totalTime = Math.round((Date.now() - startTime) / 1000); // Bereken de totale tijd
    calculateScore(); // Bereken de score
    quizContainer.style.display = "none"; // Verberg de quiz container
    scoreContainer.style.display = "block"; // Toon het score-scherm
}

// Functie om de score te berekenen
function calculateScore() {
    const timeBonus = Math.max(0, 100 - totalTime); // Bonus voor tijd (minder tijd is beter)
    const lifeBonus = Math.round(life); // Bonus voor resterend leven
    const score = (correctAnswers * 10) + timeBonus + lifeBonus; // Totale score: juiste antwoorden + tijd + leven

    // Toon de score
    scoreText.innerHTML = `
        <p>Correct Answers: ${correctAnswers} / ${questions.length}</p>
        <p>Time Taken: ${totalTime} seconds</p>
        <p>Remaining Life: ${life}%</p>
        <p><strong>Total Score: ${score}</strong></p>
    `;
}

// Event listeners voor de knoppen op de startpagina en de herstartknop
startQuizButton.addEventListener("click", startQuiz); // Start de quiz wanneer op de startknop wordt geklikt
restartQuizButton.addEventListener("click", () => {
    startPage.style.display = "block"; // Toon de startpagina opnieuw
    scoreContainer.style.display = "none"; // Verberg het score-scherm
});

const toggleMapButton = document.getElementById('toggle-map-button');
const mapContainer = document.getElementById('map-container');

// Toggle kaart zichtbaarheid
toggleMapButton.addEventListener('click', () => {
    if (mapContainer.style.display === 'none') {
        mapContainer.style.display = 'block';
    } else {
        mapContainer.style.display = 'none';
    }
});
