// Detect touch device
const isTouchDevice = () => {
    return (
        (window.matchMedia("(pointer:coarse)").matches) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
    );
};

const isTouch = isTouchDevice();

// Scroll tracking
let lastScrollY = window.scrollY;
let isScrollingDown = true;

window.addEventListener("scroll", ()=>{
    isScrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;
});

// Intersection Observer with responsive threshold
const sections = document.querySelectorAll("section");

// use 50% visibility to trigger animations both when scrolling down and up
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.intersectionRatio >= 0.5){
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
},{
    threshold: [0.5]
});

sections.forEach(section=>observer.observe(section));

// Re-adjust observer on window resize
window.addEventListener("resize", () => {
    observer.disconnect();
    sections.forEach(section=>observer.observe(section));
});

// Custom Cursor - Only on non-touch devices
if (!isTouch) {
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
            if(cursor) {
                cursor.style.width = "70px";
                cursor.style.height = "70px";
            }
        });

        item.addEventListener("mouseleave",()=>{
            if(cursor) {
                cursor.style.width = "40px";
                cursor.style.height = "40px";
            }
        });
    });
} else {
    // Hide custom cursor on touch devices
    const cursor = document.querySelector(".cursor");
    const dot = document.querySelector(".cursor-dot");
    if(cursor) cursor.style.display = "none";
    if(dot) dot.style.display = "none";
}

// Spotlight effect - Only on non-touch devices for better performance
const spotlight = document.querySelector(".spotlight");

if (!isTouch && spotlight) {
    document.addEventListener("mousemove",(e)=>{
        if(!spotlight) return;

        spotlight.style.background =
        `radial-gradient(
            300px circle at ${e.clientX}px ${e.clientY}px,
            rgba(255,255,255,.08),
            transparent 70%
        )`;
    });
} else if (spotlight) {
    // Hide spotlight on touch devices
    spotlight.style.display = "none";
}

// --- Controlled snapping for mouse and touch ---
let isAutoScrolling = false;
let scrollLockTimer = null;
let touchStartY = null;
let touchMoving = false;

const getNearestSectionIndex = () => {
    let bestIndex = 0;
    let bestDist = Infinity;
    sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < bestDist) {
            bestDist = dist;
            bestIndex = i;
        }
    });
    return bestIndex;
};

const lockScroll = () => {
    isAutoScrolling = true;
    clearTimeout(scrollLockTimer);
    scrollLockTimer = setTimeout(() => {
        isAutoScrolling = false;
    }, 1400);
};

const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    if (isAutoScrolling) return;
    lockScroll();
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleSectionScroll = (delta) => {
    const current = getNearestSectionIndex();
    if (delta > 0) {
        scrollToSection(Math.min(current + 1, sections.length - 1));
    } else {
        scrollToSection(Math.max(current - 1, 0));
    }
};

window.addEventListener('wheel', (e) => {
    if (isTouch) return;
    if (isAutoScrolling) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    const delta = e.deltaY;
    if (Math.abs(delta) < 24) return;
    handleSectionScroll(delta);
}, { passive: false });

window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchMoving = true;
    }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!touchMoving || touchStartY === null) return;
    e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', (e) => {
    if (!touchMoving || touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    const threshold = 50;
    if (Math.abs(deltaY) > threshold) {
        handleSectionScroll(deltaY);
    }
    touchStartY = null;
    touchMoving = false;
});


