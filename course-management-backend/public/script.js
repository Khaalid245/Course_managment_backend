// Translations object - now only includes translatable UI text
const translations = {
    en: {
        title: "Course Reflection",
        welcome: "Welcome to my course reflection page!",
        question1: "What did you enjoy most about the course?",
        question2: "What was the most challenging part?",
        question3: "What could be improved?",
        footer: "© 2023 Course Reflection",
        textareaPlaceholder: "Enter your answer here..."
    },
    fr: {
        title: "Réflexion sur le cours",
        welcome: "Bienvenue sur ma page de réflexion sur le cours!",
        question1: "Qu'avez-vous le plus apprécié dans ce cours?",
        question2: "Quelle a été la partie la plus difficile?",
        question3: "Qu'est-ce qui pourrait être amélioré?",
        footer: "© 2023 Réflexion sur le cours",
        textareaPlaceholder: "Entrez votre réponse ici..."
    },
    es: {
        title: "Reflexión del curso",
        welcome: "¡Bienvenido a mi página de reflexión del curso!",
        question1: "¿Qué fue lo que más disfrutaste del curso?",
        question2: "¿Cuál fue la parte más desafiante?",
        question3: "¿Qué se podría mejorar?",
        footer: "© 2023 Reflexión del curso",
        textareaPlaceholder: "Ingrese su respuesta aquí..."
    },
    de: {
        title: "Kursreflexion",
        welcome: "Willkommen auf meiner Kursreflexionsseite!",
        question1: "Was hat Ihnen am Kurs am besten gefallen?",
        question2: "Was war die größte Herausforderung?",
        question3: "Was könnte verbessert werden?",
        footer: "© 2023 Kursreflexion",
        textareaPlaceholder: "Geben Sie hier Ihre Antwort ein..."
    }
};

// Store for student answers
let studentAnswers = {
    question1: "",
    question2: "",
    question3: ""
};

// Function to change language
function changeLanguage(language) {
    // Get all elements that need translation
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('welcome-message').textContent = translations[language].welcome;
    
    document.getElementById('question1-title').textContent = translations[language].question1;
    document.getElementById('question2-title').textContent = translations[language].question2;
    document.getElementById('question3-title').textContent = translations[language].question3;
    
    // Update textarea placeholders
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.placeholder = translations[language].textareaPlaceholder;
    });
    
    document.getElementById('footer-text').textContent = translations[language].footer;
    
    // Update the language attribute of the HTML element
    document.documentElement.lang = language;
    
    // Save the selected language to localStorage
    localStorage.setItem('preferredLanguage', language);
}

// Save answers when textarea changes
function setupAnswerHandlers() {
    document.getElementById('question1-answer').addEventListener('input', function() {
        studentAnswers.question1 = this.value;
        localStorage.setItem('studentAnswers', JSON.stringify(studentAnswers));
    });
    
    document.getElementById('question2-answer').addEventListener('input', function() {
        studentAnswers.question2 = this.value;
        localStorage.setItem('studentAnswers', JSON.stringify(studentAnswers));
    });
    
    document.getElementById('question3-answer').addEventListener('input', function() {
        studentAnswers.question3 = this.value;
        localStorage.setItem('studentAnswers', JSON.stringify(studentAnswers));
    });
}

// Event listener for language selector
document.getElementById('language-selector').addEventListener('change', function() {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
});

// Initialize the page with the preferred language and saved answers
function initializePage() {
    // Load saved answers if they exist
    const savedAnswers = localStorage.getItem('studentAnswers');
    if (savedAnswers) {
        studentAnswers = JSON.parse(savedAnswers);
        document.getElementById('question1-answer').value = studentAnswers.question1;
        document.getElementById('question2-answer').value = studentAnswers.question2;
        document.getElementById('question3-answer').value = studentAnswers.question3;
    }
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    
    // Set the language (priority: saved preference > browser language > default English)
    let language = 'en';
    if (savedLanguage && translations[savedLanguage]) {
        language = savedLanguage;
    } else if (translations[browserLanguage]) {
        language = browserLanguage;
    }
    
    // Update the dropdown to reflect the selected language
    document.getElementById('language-selector').value = language;
    
    // Apply translations
    changeLanguage(language);
    
    // Set up answer handlers
    setupAnswerHandlers();
}

// Initialize the page when it loads
window.addEventListener('DOMContentLoaded', initializePage);