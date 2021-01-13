"use strict"

import runPreloader from "./preloader.js";
import { swiper } from "./swiper.js";

const runQuizApp = () => {
   const questionNumber = document.querySelector(".quiz-questions__question-number"),
      questionTitle = document.querySelector(".quiz-questions__title"),
      answerOptionsContainer = document.querySelector(".quiz-questions__answer-options"),
      questionsSection = document.querySelector(".quiz-questions"),
      answerIndecatorsContainer = document.querySelector(".quiz-questions__answer-indecators"),
      heroSection = document.querySelector(".hero"),
      quizQuestionsSection = document.querySelector(".quiz-questions"),
      quizResultsSection = document.querySelector(".quiz-results");

   let currentQuestion;
   let questionCounter = 0;
   let availbleQuestions = [];
   let availbleAnswerOptions = [];
   let correctAnswers = 0;
   let answerAttempt = 0;
   let questionLimit = 5; 

   // hide hero section and show quizQestion section to start a quiz
   const startQuiz = (event) => {
      const target = event.target;

      if (target.classList.contains("hero__btn")) {
         heroSection.classList.add("hide");
         quizQuestionsSection.classList.add("show");
      }

      // when a window is loaded push quiz questions into avaibleQuestions, get current new question and create answers indecator
      getAvailbleQuestion();
      getNewQuestion();
      createAnswerOptionIndicator();
   };

   //push all quiz questions to  avaibleQuestions array
   const getAvailbleQuestion = () => {
      quizQuestions.forEach((question) => availbleQuestions.push(question));
   };

   //set a current question number of all avaible questions and increase a count of each question
   const setQuestionNumber = () => {
      questionNumber.textContent = `Question ${questionCounter + 1} of ${questionLimit}`; 
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
               updateAnswerIndicator("correct");
               // add all correct answers
               correctAnswers++;
            } else {
               answerOption.classList.add("wrong");
               //add the indecator to wrong mark
               updateAnswerIndicator("wrong");

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
   const createAnswerOptionIndicator = () => {
      answerIndecatorsContainer.innerHTML = "";
      //create answer indicator btns in HTML
      const totalQuestion = questionLimit; 
      for (let i = 0; i < totalQuestion; i++) {
         const indecator = document.createElement("button");
         indecator.classList.add("quiz-questions__answer-indecator");
         answerIndecatorsContainer.appendChild(indecator);
      }
   };

   // apply a certain class (correct or wrong) to the answer indecator after a certain answer was selected
   const updateAnswerIndicator = (answerMarkType) => {
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
   };

   // update UI with a quiz results
   const renderQuizResults = () => {
      const percentage = (correctAnswers / quizQuestions.length) * 100;

      quizResultsSection.querySelector(".quiz-results__total").textContent = questionLimit; //quizQuestions.length ==> all questions
      quizResultsSection.querySelector(".quiz-results__attempt").textContent = answerAttempt;
      quizResultsSection.querySelector(".quiz-results__correct").textContent = correctAnswers;
      quizResultsSection.querySelector(".quiz-results__wrong").textContent = answerAttempt - correctAnswers;
      quizResultsSection.querySelector(".quiz-results__percentage").textContent = `${percentage.toFixed(2)}%`;
      quizResultsSection.querySelector(".quiz-results__total-score").textContent = `${correctAnswers} / ${questionLimit}`; //quizQuestions.length ==> all questions
   };

   // implement logic when a next btn is clicked
   const nextQuestion = (event) => {
      const target = event.target;

      if (target.classList.contains("quiz-questions__btn")) {
         // if questionCounter reaches the last question, then quiz is over, otherwise render question
         questionCounter === questionLimit ? quizOver(event) : getNewQuestion();
      }
   };

   const resetQuiz = () => {
      questionCounter = 0;
      correctAnswers = 0;
      answerAttempt = 0;
      availbleQuestions = [];
   };


   const hideQuizResultsSection = (event) => {
      const target = event.target;

      // hide quizResult section and show quizQuestions section, reset quiz to start quiz again
      if (target.classList.contains("quiz-results__btn")) {
         quizResultsSection.classList.remove("show");
         quizQuestionsSection.classList.add("show");
         resetQuiz();
         startQuiz(event);
      }

      // hide quiz result section and show hero section to come back to home (main) page
      if (target.classList.contains("home")) {
         quizQuestionsSection.classList.remove("show");
         heroSection.classList.remove("hide");
         resetQuiz();
      }
   };


   // event listeners
   heroSection.addEventListener("click", startQuiz);
   questionsSection.addEventListener('click', nextQuestion);
   quizResultsSection.addEventListener("click", hideQuizResultsSection);
   window.addEventListener("load", runPreloader);
}


swiper();
runQuizApp();

