document.addEventListener('DOMContentLoaded', () => {
    // Initialize the year and subyear contents
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
    document.getElementById('year-1800').style.display = 'flex';
    document.getElementById('subyears-1800').style.display = 'flex';
    document.getElementById('subyear-1800').style.display = 'flex';

    // Handle year switching
    yearLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            hideAllYearContents();
            hideAllSubyears();
            hideAllSubyearContents();

            document.getElementById(targetId).style.display = 'flex';

            const subyearsId = targetId.replace('year', 'subyears');
            const firstSubyearId = targetId.replace('year', 'subyear');

            document.getElementById(subyearsId).style.display = 'flex';
            document.getElementById(firstSubyearId).style.display = 'flex';
        });
    });

    // Handle subyear switching
    subyearLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            hideAllSubyearContents();
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.style.display = 'block';
            }
        });
    });

    // Handle image thumbnail clicks
    document.querySelectorAll('.historyimg').forEach(img => {
        img.addEventListener('click', function() {
            // Find the parent historyright container
            const historyRight = this.closest('.historyright');
            if (historyRight) {
                // Find the main image within this container
                const mainImage = historyRight.querySelector('.historyimage');
                if (mainImage) {
                    // Update the main image source with the clicked thumbnail's source
                    mainImage.src = this.src;
                    
                    // Optional: Add a smooth transition effect
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.style.opacity = '1';
                        mainImage.style.transition = 'opacity 0.3s ease';
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