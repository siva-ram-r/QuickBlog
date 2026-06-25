// ===================================
// QuickBlog - JavaScript Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeCopyButtons();
    initializeNavigation();
    initializeScrollEffects();
    initializeNewsletterForm();
});

// ===================================
// Copy to Clipboard Functionality
// ===================================

function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const code = this.getAttribute('data-code');
            const originalText = this.innerHTML;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Change button text temporarily
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#10b981';
                
                // Revert after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '#60a5fa';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// ===================================
// Navigation Effects
// ===================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const newPostBtn = document.getElementById('newPostBtn');
    
    // Add shadow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // New Post button click handler
    if (newPostBtn) {
        newPostBtn.addEventListener('click', function() {
            showModal('Coming Soon', 'New Post feature will be available soon!');
        });
    }
}

// ===================================
// Smooth Scroll Effects
// ===================================

function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.sidebar-card, .post-nav-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ===================================
// Newsletter Form Handling
// ===================================

function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            const email = emailInput.value;
            
            if (!email) {
                showAlert('Please enter a valid email address', 'warning');
                return;
            }
            
            // Simulate form submission
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('Thanks for subscribing! Check your email.', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// ===================================
// Share Button Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageTitle = document.querySelector('.article-title').textContent;
    const pageUrl = window.location.href;
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`, '_blank');
            } else if (this.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
            } else if (this.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`, '_blank');
            } else if (this.classList.contains('copy')) {
                navigator.clipboard.writeText(pageUrl).then(() => {
                    showAlert('Link copied to clipboard!', 'success');
                }).catch(() => {
                    showAlert('Failed to copy link', 'error');
                });
            }
        });
    });
});

// ===================================
// Utility Functions
// ===================================

/**
 * Show a toast notification
 */
function showAlert(message, type = 'info') {
    const alertClass = `alert alert-${type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'info'}`;
    const alertHTML = `
        <div class="${alertClass} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; max-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = alertHTML;
    document.body.appendChild(alertContainer.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

/**
 * Show a modal dialog
 */
function showModal(title, message) {
    const modalHTML = `
        <div class="modal fade" id="dynamicModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstChild);
    
    const modal = new bootstrap.Modal(document.getElementById('dynamicModal'));
    modal.show();
    
    // Clean up after modal is hidden
    document.getElementById('dynamicModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

/**
 * Format date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Truncate text to a certain length
 */
function truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substr(0, length) + '...';
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ===================================
// Table of Contents Active Link
// ===================================

function initializeTOCActive() {
    const sections = document.querySelectorAll('h2');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.textContent;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.includes(current.split(' ').slice(1).join(' '))) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Search Functionality
// ===================================

function searchArticles(query) {
    if (!query) return;
    
    const articles = document.querySelectorAll('.article-card');
    const results = [];
    
    articles.forEach(article => {
        const title = article.querySelector('.article-title').textContent.toLowerCase();
        const description = article.querySelector('.article-description').textContent.toLowerCase();
        const content = article.querySelector('.article-body').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || 
            description.includes(query.toLowerCase()) || 
            content.includes(query.toLowerCase())) {
            results.push(article);
        }
    });
    
    return results;
}

// ===================================
// Lazy Loading Images
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Dark Mode Toggle (Optional Feature)
// ===================================

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on page load
loadDarkModePreference();

// ===================================
// Analytics Tracking (Optional)
// ===================================

function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track article view
trackEvent('engagement', 'page_view', 'Article');

console.log('QuickBlog - JavaScript initialized successfully');
