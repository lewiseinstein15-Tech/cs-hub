document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const moreToggle = document.getElementById("moreToggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    function toggleSidebar() {
        if (!sidebar) return;
        sidebar.classList.toggle("active");
        if (mainContent) {
            mainContent.style.opacity = sidebar.classList.contains("active") ? "0.3" : "1";
        }
    }

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", toggleSidebar);

        mainContent.addEventListener("click", () => {
            if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                mainContent.style.opacity = "1";
            }
        });
    }

    if (moreToggle) {
        moreToggle.addEventListener("click", (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    }

    const ACTIVITY_KEY = "csHubActivities";

    function loadActivities() {
        const stored = localStorage.getItem(ACTIVITY_KEY);
        if (stored) {
            try { return JSON.parse(stored); } catch (e) { /* fall through to reseed */ }
        }
        const now = Date.now();
        const seed = [
            { title: "Programming notes updated", detail: "CSC110", tag: "UPDATED", dot: "updated", time: now - 12 * 60 * 1000 },
            { title: "Year 1 page modified", detail: "Content structure updated", tag: "MODIFIED", dot: "modified", time: now - 60 * 60 * 1000 },
            { title: "New user registered", detail: "john.mutuku@student.kibabii.ac.ke", tag: "NEW USER", dot: "new-user", time: now - 3 * 60 * 60 * 1000 },
            { title: "AI System settings updated", detail: "Model: GPT-4o", tag: "SYSTEM", dot: "system", time: now - 5 * 60 * 60 * 1000 }
        ];
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(seed));
        return seed;
    }

    function saveActivities(list) {
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list));
    }

    function timeAgo(timestamp) {
        const diffMs = Date.now() - timestamp;
        const mins = Math.floor(diffMs / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return mins + (mins === 1 ? " minute ago" : " minutes ago");
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return hrs + (hrs === 1 ? " hour ago" : " hours ago");
        const days = Math.floor(hrs / 24);
        return days + (days === 1 ? " day ago" : " days ago");
    }

    function renderActivities() {
        const ul = document.getElementById("activityList");
        if (!ul) return;
        const list = loadActivities().slice().sort((a, b) => b.time - a.time).slice(0, 8);
        ul.innerHTML = "";
        list.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML =
                '<span class="activity-dot ' + item.dot + '"></span>' +
                "<p>" + item.title + ' <span class="activity-detail">' + item.detail + " • " + timeAgo(item.time) + "</span></p>" +
                '<span class="activity-tag">' + item.tag + "</span>";
            ul.appendChild(li);
        });
    }

    function logActivity(title, detail, tag, dot) {
        const list = loadActivities();
        list.unshift({ title: title, detail: detail || "", tag: tag, dot: dot, time: Date.now() });
        saveActivities(list);
        renderActivities();
    }

    if (document.getElementById("activityList")) {
        renderActivities();
        setInterval(renderActivities, 60000);
    }

    const quickActionMap = {
        addNote: { title: "New note added", dot: "updated", tag: "ADDED" },
        editNote: { title: "Note edited", dot: "modified", tag: "EDITED" },
        deleteNote: { title: "Note deleted", dot: "deleted", tag: "DELETED" },
        publish: { title: "Changes published", dot: "system", tag: "PUBLISHED" }
    };

    document.querySelectorAll("[data-quick-action]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const key = link.getAttribute("data-quick-action");
            const config = quickActionMap[key];
            if (!config) return;
            const detail = prompt("Add a short note (e.g. unit code or page name):", "");
            if (detail === null) return;
            logActivity(config.title, detail, config.tag, config.dot);
        });
    });

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
