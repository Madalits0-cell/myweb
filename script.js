
/* ICT251 Activity 3 - Interactive Personal Website */

document.addEventListener("DOMContentLoaded", function () {

    /* FEATURE 1: Contact form validation and preview */
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const topic = document.querySelector("#topic").value;
            const message = document.querySelector("#message").value.trim();
            const feedback = document.querySelector("#form-feedback");
            const preview = document.querySelector("#message-preview");

            feedback.textContent = "";
            feedback.className = "status-message";
            preview.textContent = "";

            if (!name || !email || !message) {
                feedback.textContent =
                    "Please enter your name, email address, and message.";
                feedback.classList.add("error");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                feedback.textContent =
                    "Please enter a valid email address.";
                feedback.classList.add("error");
                return;
            }

            feedback.textContent =
                "Validation successful. Review your preview below.";
            feedback.classList.add("success");

            preview.textContent =
                "Browser demonstration only — no message is sent.\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Topic: " + topic + "\n" +
                "Message: " + message;
        });
    }

    /* FEATURE 2: Light and dark theme */
    const themeButton = document.querySelector("#theme-toggle");

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            const darkMode =
                document.body.classList.toggle("dark-theme");

            themeButton.textContent = darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode";

            themeButton.setAttribute("aria-pressed", String(darkMode));
        });
    }

    /* FEATURE 3: Project search */
    const projectSearch = document.querySelector("#project-search");
    const projects = document.querySelectorAll(".project-card");
    const searchMessage = document.querySelector("#search-message");
    const resetSearch = document.querySelector("#reset-search");

    function filterProjects() {
        const query = projectSearch.value.trim().toLowerCase();
        let visible = 0;

        projects.forEach(function (project) {
            const matches =
                project.textContent.toLowerCase().includes(query);

            project.hidden = !matches;
            if (matches) visible++;
        });

        if (searchMessage) {
            searchMessage.textContent = visible === 0
                ? "No matching projects found."
                : visible + " project(s) found.";
        }
    }

    if (projectSearch) {
        projectSearch.addEventListener("input", filterProjects);
    }

    if (resetSearch) {
        resetSearch.addEventListener("click", function () {
            projectSearch.value = "";

            projects.forEach(function (project) {
                project.hidden = false;
            });

            if (searchMessage) {
                searchMessage.textContent = "Showing all projects.";
            }
        });
    }

    /* FEATURE 4: Expandable project details */
    document.querySelectorAll(".details-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const details = button.nextElementSibling;
            if (!details) return;

            const opening = details.hidden;
            details.hidden = !opening;
            button.textContent = opening ? "Hide Details" : "View Details";
            button.setAttribute("aria-expanded", String(opening));
        });
    });

    /* FEATURE 5: Photo gallery Previous and Next buttons */
    const slides = document.querySelectorAll("#photos .gallery-slide");
    const previousButton = document.querySelector("#photo-previous");
    const nextButton = document.querySelector("#photo-next");
    const counter = document.querySelector("#photo-counter");

    let currentIndex = 0;

    function showPhoto(index) {
        if (slides.length === 0) {
            if (counter) {
                counter.textContent = "No photos were found.";
            }
            return;
        }

        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.hidden = i !== currentIndex;
        });

        if (counter) {
            counter.textContent =
                "Photo " + (currentIndex + 1) + " of " + slides.length;
        }
    }

    if (previousButton && nextButton) {
        previousButton.addEventListener("click", function () {
            showPhoto(currentIndex - 1);
        });

        nextButton.addEventListener("click", function () {
            showPhoto(currentIndex + 1);
        });

        showPhoto(0);
    } else {
        console.error(
            "Photo gallery buttons not found. Check their IDs in index.html."
        );
    }

});
