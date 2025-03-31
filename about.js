document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Animate text on load
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const text = animatedText.textContent;
        animatedText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            span.classList.add('fade-in');
            animatedText.appendChild(span);
        }
    }
    
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimeline);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image hover effect
    const profileImageWrapper = document.querySelector('.profile-image-wrapper');
    if (profileImageWrapper) {
        profileImageWrapper.addEventListener('mousemove', (e) => {
            const x = e.clientX - profileImageWrapper.getBoundingClientRect().left;
            const y = e.clientY - profileImageWrapper.getBoundingClientRect().top;
            
            const centerX = profileImageWrapper.offsetWidth / 2;
            const centerY = profileImageWrapper.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            profileImageWrapper.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        profileImageWrapper.addEventListener('mouseleave', () => {
            profileImageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
});