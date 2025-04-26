function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    
    let score = 0; // Dit houdt de score bij (begint bij 0)

    function showQuestions(questions, quizContainer){
        // Een lege lijst om alle vragen in op te slaan
        let questionList = [];
        
        // Nu gaan we voor elke vraag in onze vragenlijst...
        questions.forEach((question, questionIndex) => {
            // Een lege lijst maken om de HTML-code voor alle antwoordopties in op te slaan
            let answers = [];
            
            // Voor elk mogelijk antwoord bij deze vraag gaan we...
            question.answers.forEach((answer, answerIndex) => {
                // Een label maken met een radio button voor dit antwoord
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionIndex}" value="${answerIndex}" data-correct="${answer.correct}">
                        ${answer.text}
                    </label>`
                );
            });
            
            // Voeg de vraag en alle bijhorende antwoorden toe aan onze questionList
            questionList.push(
                `<div class="question">
                    <h3>${questionIndex + 1}. ${question.question}</h3>
                    <div class="answers">${answers.join('')}</div>
                    <div class="feedback"></div>
                </div>`
            );
        });
        
        // Zet alle verzamelde HTML in het quizContainer element
        quizContainer.innerHTML = questionList.join('');
    }

    function showResults(questions, quizContainer, resultsContainer){
        // Zoek alle vraag-containers op de pagina
        const questionContainers = quizContainer.querySelectorAll('.question');
        // Reset de score terug naar 0
        score = 0;
        
        // Voor elke vraag in onze quiz...
        questionContainers.forEach((questionContainer, questionIndex) => {
            const answerContainer = questionContainer.querySelector('.answers');
            const selector = `input[name=question${questionIndex}]:checked`;
            const selectedInput = answerContainer.querySelector(selector);
            const feedbackContainer = questionContainer.querySelector('.feedback');
            
            // Controleren we of het antwoord correct is
            // Als het antwoord juist is, dan krijgen we een positieve feedback terug
            if(selectedInput && selectedInput.dataset.correct === 'true') {
                score++;
                feedbackContainer.textContent = 'JUIST!';
                feedbackContainer.classList.add('correct-feedback');
            }
            else {
                // Als het antwoord fout is of niets is geselecteerd, dan krijgen we negatieve feedback terug, met ook het juiste antwoord
                const correctAnswer = questions[questionIndex].answers.find(a => a.correct).text;
                feedbackContainer.textContent = `FOUT! Het juiste antwoord is: ${correctAnswer}`;
                feedbackContainer.classList.add('incorrect-feedback');
            }
            
            // Zorg dat alle antwoordopties niet meer geselecteerd kunnen worden
            answerContainer.querySelectorAll('input').forEach(input => {
                input.disabled = true;
            });
        });
        
        // Toon de eindscore op het scherm
        resultsContainer.innerHTML = `Score: ${score} uit ${questions.length}`;
        resultsContainer.classList.add('visible');
        resultsContainer.classList.remove('hidden');
        submitButton.classList.add('hidden');
        submitButton.classList.remove('visible');
    }

    
    showQuestions(questions, quizContainer);

    // Toon de resultaten wanneer de gebruiker op de verzendknop klikt
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }
}



const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit-button');

// Start de quiz met de vragen uit quizQuestions
generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);