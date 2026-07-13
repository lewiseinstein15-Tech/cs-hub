document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            // Darken background when sidebar is open on mobile
            if (sidebar.classList.contains("active")) {
                mainContent.style.opacity = "0.3";
            } else {
                mainContent.style.opacity = "1";
            }
        });

        // Close sidebar when clicking on main content
        mainContent.addEventListener("click", () => {
            if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                mainContent.style.opacity = "1";
            }
        });
    }
});
