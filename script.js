// Mobile-first smooth navigation scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.body.classList.remove('menu-open');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.exp-item, .skill-card, .cert-item, .lang-card, .info-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease';
    observer.observe(el);
});

// Prevent double-tap zoom on buttons and links
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('a, button, .btn')) {
        e.preventDefault();
        e.target.closest('a, button, .btn').click();
    }
}, false);

// Add ripple effect for mobile touch
document.querySelectorAll('.btn, .badge, .exp-item, .skill-card, .cert-item, .lang-card').forEach(element => {
    element.addEventListener('touchend', function() {
        this.style.opacity = '0.8';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 150);
    });
});

// Handle viewport changes
let lastWidth = window.innerWidth;
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (lastWidth !== currentWidth) {
            lastWidth = currentWidth;
            window.dispatchEvent(new Event('resize'));
        }
    }, 100);
});

// Improve touch responsiveness
document.addEventListener('touchmove', function() {
    // Allow smooth scrolling
}, { passive: true });

// Add active state for mobile elements
const interactiveElements = document.querySelectorAll('a, button, .exp-item, .skill-card, .cert-item, .lang-card, .info-block, .badge');
interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
});

// Performance optimization - lazy load
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
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===== MINIMALIST PDF DOWNLOAD FUNCTIONALITY =====
function downloadPDF() {
    // Use browser's built-in print to PDF
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Mahmoud-El-Moudad-CV</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    line-height: 1.4;
                    background: white;
                    font-size: 10pt;
                }
                @page {
                    margin: 0.5in;
                    size: A4;
                }
                @media print {
                    body { background: white; }
                    .navbar, footer, .cta-buttons, .hero, .about-sidebar { display: none !important; }
                }
                h1 {
                    font-size: 18pt;
                    margin: 0 0 2pt 0;
                    font-weight: bold;
                }
                .subtitle {
                    font-size: 11pt;
                    color: #0066cc;
                    margin: 0 0 1pt 0;
                }
                .contact-info {
                    font-size: 9pt;
                    margin-bottom: 8pt;
                    color: #666;
                }
                h2 {
                    font-size: 11pt;
                    font-weight: bold;
                    margin: 6pt 0 3pt 0;
                    padding-bottom: 2pt;
                    border-bottom: 1pt solid #333;
                }
                h3 {
                    font-size: 10pt;
                    font-weight: bold;
                    margin: 3pt 0 1pt 0;
                    color: #0066cc;
                }
                p {
                    margin: 0 0 3pt 0;
                    font-size: 10pt;
                }
                .company {
                    font-weight: bold;
                    display: inline;
                }
                .dates {
                    float: right;
                    font-style: italic;
                    font-size: 9pt;
                    color: #666;
                }
                ul {
                    margin: 2pt 0 3pt 15pt;
                    padding: 0;
                    font-size: 9.5pt;
                }
                li {
                    margin-bottom: 1pt;
                    line-height: 1.3;
                }
                .exp-item, .skill-section {
                    margin-bottom: 4pt;
                    page-break-inside: avoid;
                }
                .two-column {
                    display: inline-block;
                    width: 48%;
                    vertical-align: top;
                    margin-right: 2%;
                }
                .two-column:nth-child(even) {
                    margin-right: 0;
                }
                .summary {
                    font-size: 9.5pt;
                    line-height: 1.4;
                    margin-bottom: 6pt;
                    text-align: justify;
                }
                .badges {
                    display: inline;
                    font-size: 9pt;
                }
                .badge {
                    display: inline-block;
                    background: #f0f0f0;
                    padding: 1pt 4pt;
                    margin: 1pt 2pt 1pt 0;
                    border-radius: 2pt;
                }
            </style>
        </head>
        <body>
            <h1>Mahmoud El-Moudad</h1>
            <p class="subtitle">SOC Analyst & Cybersecurity Professional</p>
            <div class="contact-info">
                Luxembourg | mahmoud@el-moudad.cv | 6+ Years SOC/SIEM Experience
            </div>

            <h2>Professional Summary</h2>
            <p class="summary">
                Dedicated SOC Analyst with 6+ years of experience in cybersecurity operations. Expert in SIEM administration (QRadar, Sentinel, Splunk), threat detection using MITRE ATT&CK framework, incident response, and security governance. Specialized in designing detection strategies and managing enterprise security operations across multiple clients.
            </p>

            <h2>Professional Experience</h2>
            
            <div class="exp-item">
                <div class="dates">Oct 2024 – Present</div>
                <h3>SOC Analyst & Security Operations Engineer</h3>
                <p><span class="company">EDAN / POST Luxembourg</span></p>
                <ul>
                    <li>Monitor and manage security events using SIEM platforms; optimize detection rules</li>
                    <li>Conduct incident response and post-incident analysis for security breaches</li>
                    <li>Collaborate on security policy implementation and infrastructure protection</li>
                </ul>
            </div>

            <div class="exp-item">
                <div class="dates">Nov 2022 – Sep 2024</div>
                <h3>SOC Analyst & Security Consultant</h3>
                <p><span class="company">Sogeti Luxembourg</span></p>
                <ul>
                    <li>Administered QRadar SIEM for enterprise SOC operations across 15+ clients</li>
                    <li>Led SOC L1 team operations; implemented detection rules and automated responses</li>
                    <li>Managed Guardium and Tripwire deployments for database and infrastructure security</li>
                </ul>
            </div>

            <div class="exp-item">
                <div class="dates">Mar 2022 – Oct 2022</div>
                <h3>Security Operations Analyst</h3>
                <p><span class="company">Dataprotect</span></p>
                <ul>
                    <li>Monitored security events and performed threat analysis</li>
                    <li>Configured SIEM platforms and assisted in security documentation</li>
                </ul>
            </div>

            <div class="exp-item">
                <div class="dates">Apr 2019 – Feb 2022</div>
                <h3>IT Security Consultant</h3>
                <p><span class="company">Corporate Software</span></p>
                <ul>
                    <li>Performed security assessments and vulnerability management for client environments</li>
                    <li>Implemented security policies and deployed security infrastructure components</li>
                </ul>
            </div>

            <h2>Technical Skills & Expertise</h2>
            
            <div class="two-column">
                <h3>SIEM & Detection</h3>
                <ul style="margin-bottom: 4pt;">
                    <li>QRadar, Sentinel, Splunk</li>
                    <li>Detection Rule Development</li>
                    <li>Threat Analysis & Investigation</li>
                    <li>MITRE ATT&CK Framework</li>
                </ul>
            </div>
            
            <div class="two-column">
                <h3>Infrastructure & Tools</h3>
                <ul>
                    <li>Firewall & Network Security</li>
                    <li>Guardium, Tripwire, GNS3</li>
                    <li>PowerShell, Bash, YAML</li>
                    <li>AWS, Azure, Docker</li>
                </ul>
            </div>

            <h2>Education & Certifications</h2>
            <p><strong>Master's Degree - Cybersecurity</strong> | Université Côte d'Azur, France</p>
            <p><strong>Engineering Degree - Computer Science & Networks</strong> | EMSI, Morocco</p>
            <p><strong>Certifications:</strong> <span class="badges"><span class="badge">CompTIA CySA+ (In Progress)</span> <span class="badge">SIEM Administration</span> <span class="badge">Incident Response</span> <span class="badge">MITRE ATT&CK</span></span></p>

            <h2>Languages</h2>
            <p><strong>English</strong> - C1 (Fluent) | <strong>French</strong> - C1 (Fluent) | <strong>Arabic</strong> - Native</p>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Trigger print dialog (user can save as PDF)
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

// Smooth scroll behavior fallback for older browsers
function smoothScroll(target) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        window.scrollBy(0, distance * (progress < 1 ? 0.5 - 0.5 * Math.cos(progress * Math.PI) : 1));
        if (progress < 1) window.requestAnimationFrame(step);
    });
}