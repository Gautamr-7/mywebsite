
        // Theme toggle
        function toggleTheme() {
            document.body.classList.toggle('dark');
            const themeToggle = document.querySelector('.theme-toggle');
            themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
            
            // Save theme preference
            const isDark = document.body.classList.contains('dark');
            const themeData = { theme: isDark ? 'dark' : 'light', timestamp: Date.now() };
            // Store in memory instead of localStorage
            window.themePreference = themeData;
        }

        // Load theme preference on page load
        window.addEventListener('load', () => {
            // Check for saved preference or default to light mode
            if (window.themePreference && window.themePreference.theme === 'dark') {
                document.body.classList.add('dark');
                document.querySelector('.theme-toggle').textContent = '☀️';
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            
            // Store form data in memory
            window.contactFormData = { ...data, timestamp: Date.now() };
            
            // Show success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            event.target.reset();
        }

        // Add some interactive effects
        document.querySelectorAll('.skill-card, .project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = document.body.classList.contains('dark') 
                    ? 'rgba(15, 15, 35, 0.98)' 
                    : 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = document.body.classList.contains('dark') 
                    ? 'rgba(15, 15, 35, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Add floating animation to hero background
        let mouseX = 0, mouseY = 0;
        let ballX = 0, ballY = 0;
        const speed = 0.02;

        function animate() {
            const distX = mouseX - ballX;
            const distY = mouseY - ballY;
            
            ballX += distX * speed;
            ballY += distY * speed;
            
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translate(${ballX * 0.02}px, ${ballY * 0.02}px) rotate(${ballX * 0.01}deg)`;
            }
            
            requestAnimationFrame(animate);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - window.innerWidth / 2;
            mouseY = e.clientY - window.innerHeight / 2;
        });

        animate();