// for index.html file
// Duplicate scroll content (safe)
window.addEventListener('DOMContentLoaded', function () {
    const scroll = document.getElementById('strength-scroll');
    if (scroll) scroll.innerHTML += scroll.innerHTML;
});

// Animate skills capsules (safe)
document.addEventListener('DOMContentLoaded', () => {
    const capsules = document.querySelectorAll('#skills .capsule');
    if (capsules.length > 0) {
        const totalCapsules = capsules.length;
        const delayPerCapsule = 500;
        const animationDuration = 1000;
        const loopDelay = 5000;
        function animateCapsulesSequentially() {
            capsules.forEach((capsule, i) => {
                capsule.style.animation = 'none';
                capsule.offsetHeight;
                capsule.style.opacity = '0';
                capsule.style.transform = 'translateY(-80px) scale(0.5) rotate(-15deg)';
                setTimeout(() => {
                    capsule.style.animation = `ss-throwInStagger ${animationDuration}ms ease-out forwards`;
                }, i * delayPerCapsule);
            });
            const totalDuration = totalCapsules * delayPerCapsule + loopDelay;
            setTimeout(animateCapsulesSequentially, totalDuration);
        }
        animateCapsulesSequentially();
    }
});

// Animate hobbies capsules (safe)
document.addEventListener('DOMContentLoaded', () => {
    const capsules = document.querySelectorAll('#hobbies .capsule');
    if (capsules.length > 0) {
        const totalCapsules = capsules.length;
        const delayPerCapsule = 500;
        const animationDuration = 1000;
        const loopDelay = 5000;
        function animateCapsulesSequentially() {
            capsules.forEach((capsule, i) => {
                capsule.style.animation = 'none';
                capsule.offsetHeight;
                capsule.style.opacity = '0';
                capsule.style.transform = 'translateY(-80px) scale(0.5) rotate(-15deg)';
                setTimeout(() => {
                    capsule.style.animation = `ss-throwInStagger ${animationDuration}ms ease-out forwards`;
                }, i * delayPerCapsule);
            });
            const totalDuration = totalCapsules * delayPerCapsule + loopDelay;
            setTimeout(animateCapsulesSequentially, totalDuration);
        }
        animateCapsulesSequentially();
    }
});

// Observe certificate cards (safe)
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.ss-cert-card');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(cards).indexOf(entry.target);
                    const animationName = index % 2 === 0 ? 'degreeSlideIn' : 'puSlideIn';

                    entry.target.style.animationName = animationName;
                    entry.target.style.opacity = '1';

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        cards.forEach(card => observer.observe(card));
    }
});

// Mobile menu toggle (safe)
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
});


//this is for service.html
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in-on-scroll')) {
                    entry.target.classList.remove('visibility-hidden-unique');
                    entry.target.classList.add('animate-fadeIn-unique');
                } else if (entry.target.classList.contains('slide-up-on-scroll')) {
                    entry.target.classList.remove('visibility-hidden-unique');
                    entry.target.classList.add('animate-slideUp-unique');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll').forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    const originalCards = Array.from(carousel.children);
    for (let i = 0; i < 20; i++) {
        originalCards.forEach(card => {
            carousel.appendChild(card.cloneNode(true));
        });
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.card').forEach(card => observer.observe(card));
    let scrollInterval;
    function startScroll() {
        scrollInterval = setInterval(() => {
            carousel.scrollBy({ left: carousel.offsetWidth * 0.6 + 16, behavior: 'smooth' });
        }, 2500);
    }
    function stopScroll() {
        clearInterval(scrollInterval);
    }
    carousel.addEventListener('mouseover', stopScroll);
    carousel.addEventListener('mouseout', startScroll);
    startScroll();
});

//this is for project.html file 1036*85 is the size of the image
document.addEventListener("DOMContentLoaded", () => {
    const carouselProjects = [
        {
            title: "Zomato Data Analysis",
            date: "October 1, 2022 – November 30, 2022",
            desc: "Analyzed customer behavior, restaurant ratings, and review trends using structured data. Visualized key insights to support business strategies and decision-making.",
            tech: "Python, Pandas, NumPy, Matplotlib, Jupyter Notebook",
            image: "./static/icons/zomato-DA-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Blood Bank Management System",
            date: "August 10, 2023 – November 10, 2023",
            desc: "Designed and implemented a web-based blood bank system with modules for donor registration, scheduling, and inventory tracking, offering a seamless user experience.",
            tech: "Python, Django, HTML, CSS, JavaScript",
            image: "./static/icons/BBMS-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Travel Guide Website",
            date: "October 30, 2023 – November 30, 2023",
            desc: "Built a dynamic travel portal with interactive maps and destination modules, improving content accessibility through clean UI and Flask-based routing.",
            tech: "Python, Flask, HTML, CSS, Jinja Templates",
            image: "./static/icons/travel-TG-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Flappy Bird – Python Game Development",
            date: "February 20, 2024 – July 20, 2024",
            desc: "Recreated Flappy Bird from scratch with Python and Pygame. Integrated scoring, collision mechanics, and custom visuals for enhanced player engagement.",
            tech: "Python, Pygame, Computer Graphics, Sound Design",
            image: "./static/icons/flappy-bird-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Visi Net Market – Inclusive E-commerce Website",
            date: "February 20, 2024 – July 20, 2024",
            desc: "Developed an e-commerce platform accessible to the visually impaired, featuring screen reader compatibility, voice navigation, and a custom backend.",
            tech: "Python, Flask, HTML, CSS, MySQL, Accessibility APIs",
            image: "./static/icons/visi-net-market-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Image Recognition System",
            date: "June 26, 2024 – July 26, 2024",
            desc: "Built and deployed an image classifier using deep learning. Created an interactive Flask app to visualize real-time object predictions from uploaded images.",
            tech: "Python, TensorFlow, Keras, OpenCV, Flask, Jupyter Notebook",
            image: "./static/icons/image-recg-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "CRM Application for Laptop Rentals",
            date: "November 8, 2024 – January 26, 2025",
            desc: "Developed CRM features using Salesforce Apex and LWC. Integrated REST APIs and CLI-based tools for seamless development and deployment.",
            tech: "Salesforce, Apex, LWC, Salesforce CLI, Visual Studio Code, REST API",
            image: "./static/icons/laptop-rental-p.jpg",
            link: "javascript:void(0)"
        },
        {
            title: "Image Captioning using Deep Learning",
            date: "September 30, 2024 – January 31, 2025",
            desc: "Led the development of a hybrid deep learning model combining CNN and RNN for automated image caption generation using NLP techniques.",
            tech: "Python, TensorFlow, Keras, CNN, RNN, NLP, Jupyter Notebook",
            image: "./static/icons/image-cap-p.png",
            link: "javascript:void(0)"
        },
        {
            title: "Tainerz – Docker Manager",
            date: "April 14, 2025 – April 20, 2025",
            desc: "Built a Flask-based web tool to manage Docker containers and images using RESTful APIs. Handled backend architecture with Docker SDK.",
            tech: "Python, Flask, Docker, Docker SDK",
            image: "./static/icons/tainerz-p.jpg",
            link: "javascript:void(0)"
        }
    ];

    const carouselStackElement = document.getElementById('carouselCardStack');
    let carouselCurrentIndex = 0;

    function renderCarouselStack() {
        if (!carouselStackElement) return;
        carouselStackElement.innerHTML = '';
        for (let offset = 0; offset < carouselProjects.length; offset++) {
            const i = (carouselCurrentIndex + offset) % carouselProjects.length;
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.dataset.index = offset;
            card.style.zIndex = `${carouselProjects.length - offset}`;
            card.style.opacity = offset > 3 ? 0 : 1;
            card.style.transform = `translateY(${20 * offset}px) scale(${1 - 0.04 * offset}) rotate(${offset * 2}deg)`;
            card.innerHTML = `
                <div class="carousel-content">
                    <div class="carousel-image">
                        <img src="${carouselProjects[i].image}" alt="Project Image" />
                    </div>
                    <div class="carousel-info">
                        <p class="text-sm font-medium mb-4">Completed • ${carouselProjects[i].date}</p>
                        <h2 class="text-2xl font-bold mb-4">${carouselProjects[i].title}</h2>
                        <p class="text-sm mb-4">${carouselProjects[i].desc}</p>
                        <p class="text-xs">${carouselProjects[i].tech}</p>
                        <a href="${carouselProjects[i].link}" target="_blank" class="carousel-visit">Visit Live Site -> soon</a>
                    </div>
                </div>`;
            carouselStackElement.appendChild(card);
        }
    }

    function advanceCarousel(reverse = false) {
        if (!carouselStackElement) return;

        const cards = carouselStackElement.querySelectorAll('.carousel-card');
        const topCard = cards[0];
        if (topCard) {
            topCard.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            topCard.style.transform = reverse
                ? 'translateX(-160%,60%) rotate(40deg) scale(0.9)'
                : 'translate(160%,60%) rotate(-40deg) scale(0.9)';
            topCard.style.opacity = '0';
        }

        setTimeout(() => {
            carouselCurrentIndex = reverse
                ? (carouselCurrentIndex - 1 + carouselProjects.length) % carouselProjects.length
                : (carouselCurrentIndex + 1) % carouselProjects.length;
            renderCarouselStack();
        }, 600);
    }

    const nextBtn = document.getElementById("carouselNextBtn");
    const prevBtn = document.getElementById("carouselPrevBtn");
    nextBtn?.addEventListener("click", () => advanceCarousel(false));
    prevBtn?.addEventListener("click", () => advanceCarousel(true));

    if (carouselStackElement) {
        let carouselStartX = 0;
        carouselStackElement.addEventListener('touchstart', (e) => {
            carouselStartX = e.touches?.[0]?.clientX ?? 0;
        });
        carouselStackElement.addEventListener('touchend', (e) => {
            const endX = e.changedTouches?.[0]?.clientX ?? 0;
            const deltaX = endX - carouselStartX;
            if (Math.abs(deltaX) > 50) {
                advanceCarousel(deltaX <= 0);
            }
        });
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") advanceCarousel(false);
        else if (e.key === "ArrowLeft") advanceCarousel(true);
    });

    renderCarouselStack();
});


// EDUCATION ANIMATION RESET
document.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        document.querySelectorAll('.animate-be-slide-from-left, .animate-pu-slide-in, .animate-sslc-slide-in').forEach(el => {
            el.classList.remove('animate-be-slide-from-left', 'animate-pu-slide-in', 'animate-sslc-slide-in');
            void el.offsetWidth;
            const text = el.textContent || '';
            if (text.includes('B.E. in Computer Science')) {
                el.classList.add('animate-be-slide-from-left');
            } else if (text.includes('Pre-University')) {
                el.classList.add('animate-pu-slide-in');
            } else if (text.includes('SSLC')) {
                el.classList.add('animate-sslc-slide-in');
            }
        });
    }, 15000);
});

//this is for contact.html file
document.addEventListener("DOMContentLoaded", () => {
    const openFormBtnContact = document.getElementById("contactOpenContactFormBtn");
    const contactFormContact = document.getElementById("contactContactForm");
    const heroSectionContact = document.getElementById("contact-hero-section");
    const responseMsgContact = document.getElementById("contactResponseMsg");
    const toast = document.getElementById("contactToast");
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const submitBtn = document.getElementById("contactSubmitBtn");

    function checkInputs() {
        if (!nameInput || !emailInput || !messageInput || !submitBtn) return;
        const nameFilled = nameInput.value.trim() !== "";
        const emailFilled = emailInput.value.trim() !== "";
        const messageFilled = messageInput.value.trim() !== "";

        if (nameFilled && emailFilled && messageFilled) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("bg-gray-600", "cursor-not-allowed");
            submitBtn.classList.add("bg-black", "hover:bg-gray-800", "cursor-pointer");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove("bg-black", "hover:bg-gray-800", "cursor-pointer");
            submitBtn.classList.add("bg-gray-600", "cursor-not-allowed");
        }
    }

    if (nameInput) nameInput.addEventListener("input", checkInputs);
    if (emailInput) emailInput.addEventListener("input", checkInputs);
    if (messageInput) messageInput.addEventListener("input", checkInputs);

    if (openFormBtnContact && contactFormContact && heroSectionContact) {
        openFormBtnContact.addEventListener("click", () => {
            contactFormContact.classList.remove("hidden");
            heroSectionContact.classList.add("hidden");
            heroSectionContact.style.display = "none";
        });
    }

    if (contactFormContact && heroSectionContact && toast && responseMsgContact) {
        contactFormContact.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            try {
                const response = await fetch("/contact", {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    toast.classList.add("show");
                    setTimeout(() => toast.classList.remove("show"), 3000);
                    this.reset();
                    if (typeof checkInputs === "function") checkInputs();
                    contactFormContact.classList.add("hidden");
                    heroSectionContact.classList.remove("hidden");
                    heroSectionContact.style.display = "flex";
                } else {
                    responseMsgContact.textContent = "Failed to send message.";
                    responseMsgContact.classList.remove("text-green-600");
                    responseMsgContact.classList.add("text-red-600");
                }
            } catch (error) {
                responseMsgContact.textContent = "An error occurred while sending the message.";
                responseMsgContact.classList.remove("text-green-600");
                responseMsgContact.classList.add("text-red-600");
            }
        });
    }
});
