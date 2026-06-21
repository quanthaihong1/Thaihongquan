document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".social-btn");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "scale(1.03)";
        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "scale(1)";
        });

    });

    console.log("Website loaded successfully");

});
