import renderQuizQuestions from "./renderQuizQuestions.js";
import { swiper } from "./swiper.js";

const heroSection= document.querySelector(".hero");
const quizQuestionsSection = document.querySelector(".quiz-questions");
const quizResultsSection = document.querySelector(".quiz-results");


const hideHeroSection = (event) => {
   const target = event.target;

   if (target.classList.contains("hero__btn")) {
      heroSection.classList.add("hide");
      quizQuestionsSection.classList.add("show");
   }
};

// const hideQuizQuestionSection = (event) => {
//    const target = event.target;
   
//    if (target.classList.contains("quiz-questions__btn")) {
//       quizQuestionsSection.classList.remove("show");
//       quizResultsSection.classList.add("show");
//    }
// };

const hideQuizResultsSection = (event) => {
   const target = event.target;
 
   if (target.classList.contains("home")) {
      quizResultsSection.classList.remove("show");
      heroSection.classList.remove("hide");
   }
};


heroSection.addEventListener("click", hideHeroSection);
//quizQuestionsSection.addEventListener("click", hideQuizQuestionSection);
quizResultsSection.addEventListener("click", hideQuizResultsSection);

swiper();
renderQuizQuestions();
