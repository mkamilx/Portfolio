// Theme Toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Typed.js initialization
function initTypedText() {
    const options = {
        strings: ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };
    new Typed('#typed-text', options);
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Particles.js initialization
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#8b5cf6' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            },
            lineLinked: {
                enable: true,
                distance: 150,
                color: '#8b5cf6',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                outMode: 'bounce',
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detectOn: 'canvas',
            events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, lineLinked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Initialize AOS (Animate on Scroll)
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Portfolio Filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(',');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Create Matrix Background
function createMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-background';
    document.querySelector('.loading-spinner').appendChild(matrixBg);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*-+~|あいうえお';
    const columns = Math.floor(window.innerWidth / 20);
    
    function createFallingText() {
        const text = document.createElement('span');
        text.className = 'encrypted-text';
        text.style.left = `${Math.random() * 100}%`;
        text.textContent = characters[Math.floor(Math.random() * characters.length)];
        matrixBg.appendChild(text);

        setTimeout(() => {
            text.remove();
        }, 2000);
    }

    // Create initial set of falling characters
    for (let i = 0; i < columns; i++) {
        setTimeout(() => {
            createFallingText();
        }, i * 100);
    }

    // Continue creating falling characters
    const interval = setInterval(() => {
        createFallingText();
    }, 100);

    // Update loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    let dots = '';
    loadingText.textContent = 'INITIALIZING SYSTEM' + dots;
    document.querySelector('.spinner-container').appendChild(loadingText);

    const textInterval = setInterval(() => {
        dots = dots.length >= 3 ? '' : dots + '.';
        loadingText.textContent = 'INITIALIZING SYSTEM' + dots;
    }, 500);

    // Cleanup when loading is complete
    return () => {
        clearInterval(interval);
        clearInterval(textInterval);
    };
}

// Loading Animation
function handleLoadingState() {
    const spinner = document.getElementById('loading-spinner');
    let currentLine = 0;
    const lines = document.querySelectorAll('.code-block .line');
    const cursor = document.querySelector('.typing-cursor');
    
    // Type each line sequentially
    function typeLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            const rect = line.getBoundingClientRect();
            cursor.style.top = `${rect.top + 2}px`;
            cursor.style.left = `${rect.left + line.textContent.length * 8}px`;
            currentLine++;
            setTimeout(typeLine, 500);
        }
    }
    
    // Start typing animation
    typeLine();

    // Remove loading screen after animations complete
    setTimeout(() => {
        spinner.style.opacity = '0';
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 500);
    }, 3000);
}

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const menu = document.querySelector('nav ul');
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    if (window.innerWidth <= 768) {
        nav.insertBefore(hamburger, menu);
    }

    const toggleMenu = (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.innerHTML = menu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    };

    // Handle clicks
    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && menu.classList.contains('active')) {
            toggleMenu(e);
        }
    });

    // Handle touch events for links
    if (isTouchDevice()) {
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            if (nav.contains(hamburger)) {
                nav.removeChild(hamburger);
            }
        } else if (!nav.contains(hamburger)) {
            nav.insertBefore(hamburger, menu);
        }
    });
}

// Enhanced Wave Interaction
function initWaveInteraction() {
    const waves = document.querySelector('.waves');
    const waveElements = document.querySelectorAll('.wave-parallax use');
    let animationFrameId;
    let lastX = 0;
    let lastY = 0;
    
    const handleMove = (x, y) => {
        lastX = x;
        lastY = y;
        
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateWaves);
        }
    };
    
    const updateWaves = () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (lastX - centerX) / centerX;
        const moveY = (lastY - centerY) / centerY;
        
        waveElements.forEach((wave, index) => {
            const factor = (index + 1) * 0.5;
            const translateX = moveX * 20 * factor;
            const translateY = moveY * 10 * factor;
            wave.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
        
        animationFrameId = null;
    };

    // Mouse movement
    if (!isTouchDevice()) {
        document.addEventListener('mousemove', (e) => {
            handleMove(e.clientX, e.clientY);
        }, { passive: true });
    }

    // Touch movement
    if (isTouchDevice()) {
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        }, { passive: true });

        // Reset position on touch end
        document.addEventListener('touchend', () => {
            waveElements.forEach(wave => {
                wave.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Custom cursor and mouse trail functionality
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    const interactiveElements = document.querySelectorAll('a, button, .interactive-element');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Smooth cursor animation
    function animate() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

        // Faster follow for cursor dot
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;

        requestAnimationFrame(animate);
    }

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update interactive elements' gradient position
        const element = e.target.closest('.interactive-element');
        if (element) {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        }
    });

    // Mouse trail effect
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.5) { // Create trail particles randomly
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);

            // Remove trail particle after animation
            setTimeout(() => {
                trail.remove();
            }, 1000);
        }
    });

    // Handle cursor states for interactive elements
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px) scale(1.5)`;
            cursor.style.border = '1px solid var(--primary-color)';
            cursorDot.style.opacity = '0';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
            cursor.style.border = '2px solid var(--primary-color)';
            cursorDot.style.opacity = '1';
        });
    });

    // Start animation loop
    animate();

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Show default cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Highlight section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };

    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Floating elements interaction
    const floatItems = document.querySelectorAll('.float-item');
    
    floatItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // Add glow effect
            item.style.filter = 'drop-shadow(0 0 20px var(--primary-color))';
            item.style.transform = 'scale(1.2) translateY(-10px)';
        });

        item.addEventListener('mouseout', () => {
            // Remove glow effect
            item.style.filter = '';
            item.style.transform = '';
        });
    });

    // Connection lines effect
    const highlight = document.querySelector('.highlight');
    const connectionLines = document.querySelector('.connection-lines');

    if (highlight && connectionLines) {
        highlight.addEventListener('mousemove', (e) => {
            const { left, top } = highlight.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            connectionLines.style.background = `
                radial-gradient(circle at ${x}px ${y}px,
                rgba(139, 92, 246, 0.2) 0%,
                transparent 50%),
                linear-gradient(45deg, transparent 45%, var(--primary-color) 45%, var(--primary-color) 55%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, var(--primary-color) 45%, var(--primary-color) 55%, transparent 55%)
            `;
        });
    }

    // Glitch text effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('active');
            setTimeout(() => {
                glitchText.classList.remove('active');
            }, 100);
        }, 3000);
    }
});

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    initWaveInteraction();
    initMobileMenu();
    handleLoadingState();
    initPortfolioFilter();
    initThemeToggle();
    initTypedText();
    initScrollProgress();
    initParticles();
    initAOS();
    initCustomCursor();
    
    // Preload images for smooth transitions
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
});