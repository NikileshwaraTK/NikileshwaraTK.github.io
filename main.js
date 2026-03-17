// MAIN ORCHESTRATOR

const routes = {
    home: "index.html",
    education: "education.html",
    experience: "experience.html",
    projects: "projects.html",
    certifications: "certifications.html"
};

// Load page into container
async function loadPage(page) {
    try {
        const response = await fetch(routes[page]);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const content = doc.body.innerHTML;

        document.getElementById("app").innerHTML = content;

        window.scrollTo(0, 0);

        initScrollAnimations();

    } catch (err) {
        console.error("Page load error:", err);
    }
}

// Navigation handler
function navigate(page) {
    history.pushState({ page }, "", `#${page}`);
    loadPage(page);
}

// Handle browser back/forward
window.onpopstate = function (event) {
    const page = event.state?.page || "home";
    loadPage(page);
};

// Scroll animation re-init
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    function handleScroll() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
    const page = location.hash.replace("#", "") || "home";
    loadPage(page);
});
