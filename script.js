const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
reveals.forEach(r => {
let windowHeight = window.innerHeight;
let elementTop = r.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
r.classList.add("active");
}
});
});