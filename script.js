let lastScrollY = window.scrollY;
let isScrollingDown = true;

window.addEventListener("scroll", ()=>{
    isScrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
},{
    threshold:0.35
});

sections.forEach(section=>observer.observe(section));



// Cursor
const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove",(e)=>{

    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    if(dot){
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
    }

});


// Hover effect
const links = document.querySelectorAll(
    "a, button, .skill-card, .project-card"
);

links.forEach(item=>{

    item.addEventListener("mouseenter",()=>{
        cursor.style.width = "70px";
        cursor.style.height = "70px";
    });

    item.addEventListener("mouseleave",()=>{
        cursor.style.width = "40px";
        cursor.style.height = "40px";
    });

});


// Spotlight
const spotlight = document.querySelector(".spotlight");

document.addEventListener("mousemove",(e)=>{

    if(!spotlight) return;

    spotlight.style.background =
    `radial-gradient(
        300px circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,.08),
        transparent 70%
    )`;

});
