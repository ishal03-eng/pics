// Set your anniversary or start date here (YYYY, MM-1, DD)
// Note: Month is 0-indexed (0 = January, 11 = December)
const startDate = new Date(2025, 2, 14); // March 14, 2025

// Function to calculate time difference
function updateCountdown() {
    const now = new Date();
    const difference = now - startDate;
    
    // Calculate years, months, and days
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Update the DOM
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    
    // Add animation effect
    animateNumbers();
}

// Animate numbers when they change
function animateNumbers() {
    const timeValues = document.querySelectorAll('.time-value');
    timeValues.forEach(value => {
        value.style.transform = 'scale(1.1)';
        setTimeout(() => {
            value.style.transform = 'scale(1)';
        }, 300);
    });
}

// Smooth scroll to memories section
function scrollToMemories() {
    const memoriesSection = document.getElementById('memories');
    memoriesSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add a little celebration effect
    createHeartBurst();
}

// Create heart burst effect when clicking the button
function createHeartBurst() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    const button = document.querySelector('.surprise-btn');
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        // Animate heart burst
        setTimeout(() => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            heart.style.opacity = '0';
        }, 10);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 1100);
    }
}

// Add intersection observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe photo items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        observer.observe(item);
    });
}

// Add parallax effect to background
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.background-image');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add liquid glass click effect to photos
function addPhotoClickEffect() {
    const photos = document.querySelectorAll('.photo-wrapper');
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            // Create liquid glass wave effect
            const wave = document.createElement('div');
            wave.style.position = 'absolute';
            wave.style.top = '50%';
            wave.style.left = '50%';
            wave.style.width = '20px';
            wave.style.height = '20px';
            wave.style.borderRadius = '50%';
            wave.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 40%, transparent 70%)';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '10';
            wave.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            wave.style.opacity = '1';
            
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.style.width = '500px';
                wave.style.height = '500px';
                wave.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                wave.remove();
            }, 1300);
            
            // Create floating glass particles
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = '8px';
                    particle.style.height = '8px';
                    particle.style.borderRadius = '50%';
                    particle.style.background = 'rgba(255, 255, 255, 0.8)';
                    particle.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
                    particle.style.top = '50%';
                    particle.style.left = '50%';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '11';
                    particle.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    particle.style.opacity = '1';
                    
                    this.appendChild(particle);
                    
                    setTimeout(() => {
                        const angle = (i / 8) * Math.PI * 2;
                        const distance = 100 + Math.random() * 50;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                        particle.style.opacity = '0';
                    }, 10);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 1600);
                }, i * 50);
            }
        });
    });
}

// Create random floating hearts periodically
function createRandomHearts() {
    setInterval(() => {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;
        
        const heart = document.createElement('span');
        heart.className = 'heart-float';
        heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 3000);
}

// Add touch feedback for mobile
function addTouchFeedback() {
    const button = document.querySelector('.surprise-btn');
    const photos = document.querySelectorAll('.photo-wrapper');
    
    [button, ...photos].forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    observeElements();
    addParallaxEffect();
    addPhotoClickEffect();
    createRandomHearts();
    addTouchFeedback();
    
    // Update countdown every day at midnight
    setInterval(updateCountdown, 1000 * 60 * 60 * 24);
    
    // Also update every hour to catch the midnight transition
    setInterval(updateCountdown, 1000 * 60 * 60);
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Prevent context menu on images (optional - for a more polished feel)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
});

// Add a special effect when the page first loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});