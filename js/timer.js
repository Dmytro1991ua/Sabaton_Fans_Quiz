"use strict"

const runQuizTimer = () => {
   const timer = document.querySelector(".quiz-questions__timer");
   const nextBtn = document.querySelector(".quiz-questions__btn");
   let timeLeft = 10; //seconds

   const countdown = () => {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, 0);
      const seconds = String(Math.floor(timeLeft % 60)).padStart(2, 0);

      timer.textContent = `${minutes}:${seconds}`;

      if (timeLeft === 0) {
         clearInterval(runTimer);
         nextBtn.classList.add("show");
      }

      timeLeft--;
   };
   countdown();
   const runTimer = setInterval(countdown, 1000);
   return runTimer; // return to check if there is already a timer running? if it is so then stop it
};

export default runQuizTimer;