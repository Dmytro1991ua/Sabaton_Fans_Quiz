
const runPreloader = () => {
   const preloader = document.querySelector(".preloader-container");
   console.log(preloader)
   preloader.classList.add("opacity-0");
   setTimeout(() => {
      preloader.style.display = "none";
   }, 1000)

}
export default runPreloader; 