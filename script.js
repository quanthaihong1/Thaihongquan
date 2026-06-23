const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });
},{
    threshold:0.15
});

sections.forEach(section => {
    observer.observe(section);
});


const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

});

const links = document.querySelectorAll("a, button, .skill-card, .project-card");

links.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.style.width = "70px";
        cursor.style.height = "70px";

    });

    item.addEventListener("mouseleave", () => {

        cursor.style.width = "40px";
        cursor.style.height = "40px";

    });

});
