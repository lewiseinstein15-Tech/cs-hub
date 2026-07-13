document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");

            if (sidebar.classList.contains("active")) {
                mainContent.style.opacity = "0.3";
            } else {
                mainContent.style.opacity = "1";
            }
        });

        mainContent.addEventListener("click", () => {
            if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                mainContent.style.opacity = "1";
            }
        });
    }

    const welcomeMessageElement = document.getElementById("welcome-message");
    const text = "Welcome back, Admin Lewis";
    let i = 0;
    const speed = 70;

    function typeWriter() {
        if (i < text.length) {
            welcomeMessageElement.innerHTML =
                text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeWriter, speed);
        } else {
            welcomeMessageElement.innerHTML =
                text + '<span class="cursor">|</span>';
        }
    }

    if (welcomeMessageElement) {
        welcomeMessageElement.innerHTML = '<span class="cursor">|</span>';
        setTimeout(typeWriter, 1000);
    }
});
