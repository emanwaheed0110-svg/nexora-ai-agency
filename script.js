/* =========================================================
   NEXORA AI AGENCY
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                preloader.style.pointerEvents = "none";

                setTimeout(() => {
                    preloader.remove();
                }, 700);

            }, 500);

        });

        /* Safety fallback */
        setTimeout(() => {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.pointerEvents = "none";

        }, 4000);

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            menuToggle.classList.toggle("active");

        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");
                menuToggle.classList.remove("active");

            });

        });

    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-count]");


    function animateCounter(element) {

        const target =
            parseFloat(element.dataset.count);

        const duration = 1800;

        const startTime = performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            /* Smooth easing */

            const eased =
                1 - Math.pow(1 - progress, 3);


            const current =
                target * eased;


            if (Number.isInteger(target)) {

                element.textContent =
                    Math.floor(current);

            } else {

                element.textContent =
                    current.toFixed(1);

            }


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent = target;

            }

        }


        requestAnimationFrame(update);

    }


    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(
            '.nav-link[href^="#"]'
        );


    function updateActiveLink() {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });


        links.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    updateActiveLink();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function(e) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(targetId);


                if (!target) return;


                e.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    20;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* =====================================================
       MOUSE CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");


    if (cursor && follower) {

        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;


        document.addEventListener(
            "mousemove",
            e => {

                mouseX = e.clientX;
                mouseY = e.clientY;


                cursor.style.left =
                    mouseX + "px";

                cursor.style.top =
                    mouseY + "px";

            }
        );


        function animateFollower() {

            followerX +=
                (mouseX - followerX) * 0.12;

            followerY +=
                (mouseY - followerY) * 0.12;


            follower.style.left =
                followerX - 19 + "px";

            follower.style.top =
                followerY - 19 + "px";


            requestAnimationFrame(
                animateFollower
            );

        }


        animateFollower();


        const hoverElements =
            document.querySelectorAll(
                "a, button, .service-card, .project-card"
            );


        hoverElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    follower.style.width = "55px";
                    follower.style.height = "55px";

                    follower.style.borderColor =
                        "rgba(34,211,238,.8)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    follower.style.width = "38px";
                    follower.style.height = "38px";

                    follower.style.borderColor =
                        "rgba(255,255,255,.5)";

                }
            );

        });

    }


    /* =====================================================
       TILT EFFECT
    ===================================================== */

    const tiltElements =
        document.querySelectorAll(
            ".service-card, .pricing-card, .testimonial-card"
        );


    tiltElements.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                if (window.innerWidth < 800) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    e.clientX - rect.left;


                const y =
                    e.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 25;


                const rotateY =
                    (centerX - x) / 25;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

  /* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async e => {

            e.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".form-submit"
                );


            if (!submitButton) return;


            const originalHTML =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                "Sending...";


            const formData =
                new FormData(contactForm);


            const data = {

                name:
                    formData.get("name"),

                email:
                    formData.get("email"),

                company:
                    formData.get("company"),

                service:
                    formData.get("service"),

                message:
                    formData.get("message")

            };


            try {

                const response =
                    await fetch(
                        "/api/contact"

                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                const result =
                    await response.json();


                if (
                    response.ok &&
                    result.success
                ) {

                    submitButton.innerHTML =
                        "✓ Message Sent Successfully";

                    submitButton.style.background =
                        "linear-gradient(135deg,#10b981,#06b6d4)";


                    setTimeout(() => {

                        submitButton.innerHTML =
                            originalHTML;

                        submitButton.style.background =
                            "";

                        submitButton.disabled =
                            false;

                        contactForm.reset();

                    }, 3000);


                } else {

                    throw new Error(
                        result.message ||
                        "Message could not be sent."
                    );

                }


            } catch (error) {

                console.error(
                    "Contact Form Error:",
                    error
                );


                submitButton.innerHTML =
                    "✕ Message Not Sent";

                submitButton.style.background =
                    "linear-gradient(135deg,#ef4444,#f97316)";


                setTimeout(() => {

                    submitButton.innerHTML =
                        originalHTML;

                    submitButton.style.background =
                        "";

                    submitButton.disabled =
                        false;

                }, 3000);

            }

        }
    );

}


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(img => {

        if (!img.hasAttribute("loading")) {

            img.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       PARALLAX BACKGROUND
    ===================================================== */

    const orbs =
        document.querySelectorAll(
            ".gradient-orb"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            orbs.forEach(
                (orb, index) => {

                    const speed =
                        (index + 1) * 0.025;


                    orb.style.transform =
                        `translateY(${scroll * speed}px)`;

                }
            );

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    console.log(
        "NEXORA AI AGENCY — Website initialized successfully."
    );

});
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = new FormData(contactForm);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            company: formData.get("company"),
            service: formData.get("service"),
            message: formData.get("message")
        };

        try {

            const response = await fetch(
                "/api/contact"
,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("Message sent successfully!");

                contactForm.reset();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);

            alert(
                "Backend se connection nahi ho raha."
            );

        }

    });

}
