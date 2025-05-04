document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    const video = document.getElementById('bg-video');
    const muteBtn = document.getElementById('mute-toggle');
    const muteIcon = document.getElementById('mute-icon');
    
    // Video Mute Controls
    
    if (video && muteBtn && muteIcon) {
        // Initialize with saved preference or default to muted
        let isMuted = localStorage.getItem('videoMuted') !== 'false';
        
        // Set initial state
        video.muted = isMuted;
        updateButton();
        
        // Toggle on click
        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            video.muted = isMuted;
            localStorage.setItem('videoMuted', isMuted);
            updateButton();
            
            // Button press animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
        
        // Keyboard accessibility
        muteBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Handle autoplay policies
        const playVideo = () => {
            video.play().catch(e => {
                console.log("Autoplay prevented, showing muted:", e);
                video.muted = true;
                isMuted = true;
                localStorage.setItem('videoMuted', true);
                updateButton();
                video.play();
            });
        };
        
        // Wait for video metadata to load
        video.addEventListener('loadedmetadata', playVideo);
        video.addEventListener('canplay', playVideo);
        
        function updateButton() {
            muteIcon.src = isMuted ? "icons/mute.png" : "icons/unmute.png";
            muteBtn.setAttribute('aria-label', isMuted ? "Unmute sound" : "Mute sound");
        }
    }

    // Timeline Functionality

    const yearContents = document.querySelectorAll('.year-content');
    const subyearContents = document.querySelectorAll('.subyear-content');
    const yearLinks = document.querySelectorAll('.year-link');
    const subyearLinks = document.querySelectorAll('.subyear-link');
    const subyearsGroups = document.querySelectorAll('.subyears');
    
    function hideAllYearContents() {
        yearContents.forEach(content => content.style.display = 'none');
    }
    
    function hideAllSubyears() {
        subyearsGroups.forEach(group => group.style.display = 'none');
    }
    
    function hideAllSubyearContents() {
        subyearContents.forEach(content => content.style.display = 'none');
    }
    
    // Default view setup
    hideAllYearContents();
    hideAllSubyears();
    hideAllSubyearContents();
    
    // Show the first year and its subyears
    const initialYear = document.getElementById('year-1800');
    const initialSubyears = document.getElementById('subyears-1800');
    const initialSubyear = document.getElementById('subyear-1800');
    
    if (initialYear) initialYear.style.display = 'flex';
    if (initialSubyears) initialSubyears.style.display = 'flex';
    if (initialSubyear) initialSubyear.style.display = 'flex';
    
    // Handle year switching
    yearLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) return;
            
            hideAllYearContents();
            hideAllSubyears();
            hideAllSubyearContents();
            
            targetElement.style.display = 'flex';
            
            const subyearsId = targetId.replace('year', 'subyears');
            const firstSubyearId = targetId.replace('year', 'subyear');
            
            const subyearsElement = document.getElementById(subyearsId);
            const subyearElement = document.getElementById(firstSubyearId);
            
            if (subyearsElement) subyearsElement.style.display = 'flex';
            if (subyearElement) subyearElement.style.display = 'flex';
        });
    });
    
    // Handle subyear switching
    subyearLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                hideAllSubyearContents();
                targetElement.style.display = 'block';
            }
        });
    });
    
    // Handle image thumbnail clicks
    document.querySelectorAll('.historyimg').forEach(img => {
        img.addEventListener('click', function() {
            const historyRight = this.closest('.historyright');
            
            if (historyRight) {
                const mainImage = historyRight.querySelector('.historyimage');
                const mainImage2 = historyRight.querySelector('.historyimage2');
                
                if (mainImage) {
                    mainImage.src = this.src;
                    mainImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainImage.style.opacity = '1';
                        mainImage.style.transition = 'opacity 0.3s ease';
                    }, 50);
                }
                else if (mainImage2) {
                    mainImage2.src = this.src;                    
                    mainImage2.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainImage2.style.opacity = '1';
                        mainImage2.style.transition = 'opacity 0.3s ease';
                    }, 50);
                }
            }
        });
    });
    
    // Add hover effect to thumbnails
    document.querySelectorAll('.historyimg').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});