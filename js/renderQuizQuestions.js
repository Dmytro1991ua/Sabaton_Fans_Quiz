//import { hideQuizQuestionSection } from "./main.js";

const renderQuizQuestions = () => {
   const questionNumber = document.querySelector(".quiz-questions__question-number"),
      questionTitle = document.querySelector(".quiz-questions__title"),
      answerOptionsContainer = document.querySelector(".quiz-questions__answer-options"),
      questionsSection = document.querySelector(".quiz-questions"),
      answerIndecatorsContainer = document.querySelector(".quiz-questions__answer-indecators"),
      quizQuestionsSection = document.querySelector(".quiz-questions"),
      quizResultsSection = document.querySelector(".quiz-results");

   let currentQuestion;
   let questionCounter = 0;
   let availbleQuestions = [];
   let availbleAnswerOptions = [];
   let correctAnswers = 0;
   let answerAttempt = 0;

   //push all quiz questions to  avaibleQuestions array
   const getAvailbleQuestion = () => {
      quizQuestions.forEach((question) => availbleQuestions.push(question));
   };

   // push all answers options to availbleAnswerOptions array, create answer options in HTML and update UI 
   const setAvaibleAnswersOptions = () => {
      const answerOptionLength = currentQuestion.answerOptions.length;
      //set answer options (get array with answer options from test data push to availbleAnswerOptions )
      for (let i = 0; i < answerOptionLength; i++) {
         availbleAnswerOptions.push(i);
      }

      answerOptionsContainer.innerHTML = "";
      let optionAnimationDelay = 0.15;

      // create answer options in HTML and update UI
      for (let i = 0; i < answerOptionLength; i++) {
         //random answers options
         const quizRandomAnswer = availbleAnswerOptions[Math.floor(Math.random() * availbleAnswerOptions.length)];
         //get a position of answer in the array
         const quizAnswerOptionPosition = availbleAnswerOptions.indexOf(quizRandomAnswer);
         // remove answer option to avoid repeation
         availbleAnswerOptions.splice(quizAnswerOptionPosition, 1);

         const answerOption = document.createElement("button");
         answerOption.classList.add("quiz-questions__answer-option");
         answerOption.textContent = currentQuestion.answerOptions[quizRandomAnswer];
         answerOption.id = quizRandomAnswer;

         //implement smooth animation for answer options
         answerOption.style.animationDelay = `${optionAnimationDelay}s`;
         optionAnimationDelay += 0.15;

         answerOptionsContainer.appendChild(answerOption);

         // get a result from a current attempt question
         const getAnswerOptionResult = () => {
            //get id of a cicked answer option btn
            const id = parseInt(answerOption.id);

            //compare clicked answer option btn with a correct answer
            if (id === currentQuestion.correctAnswer) {
               answerOption.classList.add("correct");
               //add the indecator to correct mark
               updateAnswerIndecator("correct");
               // add all correct answers
               correctAnswers++;
            } else {
               answerOption.classList.add("wrong");
               //add the indecator to wrong mark
               updateAnswerIndecator("wrong");

               //set a correct answer while a wrong answer was selected
               [...answerOptionsContainer.children].forEach(answerOption => {
                  if (parseInt(answerOption.id) === currentQuestion.correctAnswer) {
                     answerOption.classList.add("correct");
                  }
               });
            }
            answerAttempt++;
            disableAnswerOptionClick();
         };
         answerOption.addEventListener("click", getAnswerOptionResult);
      }

   };

   //set a current question number of all avaible questions and increase a count of each question
   const setQuestionNumber = () => {
      questionNumber.textContent = `Question ${questionCounter + 1} of ${quizQuestions.length}`;
      questionCounter++;
   };

   //get a random question from avaibleQuestions and updates quiz title accordingly
   const setAvaibleQuestion = () => {
      //get a random question from avaibleQuestions and updates quiz title accordingly
      const quizRandomQuestion = availbleQuestions[Math.floor(Math.random() * availbleQuestions.length)];
      currentQuestion = quizRandomQuestion;
      questionTitle.textContent = currentQuestion.question;

      //get a position of question in the array and remove it to avoid repeation
      const quizQuestionPosition = availbleQuestions.indexOf(quizRandomQuestion);
      availbleQuestions.splice(quizQuestionPosition, 1);

   };

   // make answer option buttons disable (unclickable ) when a certain answer was selected
   const disableAnswerOptionClick = () => {
      [...answerOptionsContainer.children].forEach(option => option.classList.add("already-answered"));
   };

   //get(render) a current availble quiz question
   const getNewQuestion = () => {

      setQuestionNumber();

      setAvaibleQuestion();

      setAvaibleAnswersOptions();
   };

   // create(add to) answer indecator btns in html
   const createAnswerOptionIndecator = () => {
      answerIndecatorsContainer.innerHTML = "";
      //create answer indicator btns in HTML
      quizQuestions.forEach(question => {
         const indecator = document.createElement("button");
         indecator.classList.add("quiz-questions__answer-indecator");
         answerIndecatorsContainer.appendChild(indecator);
      })
   };

   // apply a certain class (correct or wrong) to the answer indecator after a certain answer was selected
   const updateAnswerIndecator = (answerMarkType) => {
      answerIndecatorsContainer.children[questionCounter - 1].classList.add(answerMarkType);
   };

   // hide quizQuestionSection and show quizResults question
   const quizOver = (event) => {
      const target = event.target;
    
      if (target.classList.contains("quiz-questions__btn")) {
         quizQuestionsSection.classList.remove("show");
         quizResultsSection.classList.add("show");
         renderQuizResults();
      }
   }

   // update UI with a quiz results
   const renderQuizResults = () => {
      const percentage = (correctAnswers / quizQuestions.length) * 100;

      quizResultsSection.querySelector(".quiz-results__total").textContent = quizQuestions.length;
      quizResultsSection.querySelector(".quiz-results__attempt").textContent = answerAttempt;
      quizResultsSection.querySelector(".quiz-results__correct").textContent = correctAnswers;
      quizResultsSection.querySelector(".quiz-results__wrong").textContent = answerAttempt - correctAnswers;
      quizResultsSection.querySelector(".quiz-results__percentage").textContent = `${percentage.toFixed(2)}%`;
      quizResultsSection.querySelector(".quiz-results__total-score").textContent = `${correctAnswers} / ${quizQuestions.length}` ;
   };

   // implement logic when a next btn is clicked
   const nextQuestion = (event) => {
      const target = event.target;

      if (target.classList.contains("quiz-questions__btn")) {
         // if questionCounter reaches the last question, then quiz is over, otherwise render question
         questionCounter === quizQuestions.length ? quizOver(event) : getNewQuestion();
      }
   };

   questionsSection.addEventListener('click', nextQuestion);
   window.addEventListener("load", () => {
      // when a window is loaded push quiz questions into avaibleQuestions, get current new question and create answers indecator
      getAvailbleQuestion();
      getNewQuestion();
      createAnswerOptionIndecator();
   });

}

export default renderQuizQuestions;