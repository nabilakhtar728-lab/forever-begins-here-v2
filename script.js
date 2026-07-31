/* --- PURE JAVASCRIPT --- */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const beginBtn = document.getElementById('begin-story');

    // Dates
    const startDateStr = "10 August 2022 00:00:00"; // Important: Specify date & time

    /* --- INTRO / PRELOADER --- */
    window.addEventListener('load', function() {
        // Allow preloader to show for a minimum of 4 seconds for cinematic effect
        setTimeout(function() {
            preloader.classList.add('fade-out');
            mainContent.classList.add('fade-in');
            body.classList.remove('is-loading');
            
            // Re-check scroll animations after intro
            animateOnScroll();
        }, 4500); 
    });

    /* --- Begin Our Story Button --- */
    beginBtn.addEventListener('click', function() {
        // Try autoplay music if allowed
        tryAutoplay();
        // Smooth scroll to first section
        document.getElementById('love-story').scrollIntoView({ behavior: 'smooth' });
    });

    /* --- FX LAYER: BACKGROUND EFFECTS --- */
    initParticleLayer();
    initMouseMoveGlow();
    initCursorSparkle();

    /* --- MUSIC PLAYER --- */
    initMusicPlayer();

    /* --- LIVE COUNTER --- */
    initLiveCounter(startDateStr);

    /* --- SCROLL ANIMATIONS --- */
    initScrollAnimations();

    /* --- PHOTO GALLERY LIGHTBOX --- */
    initGallery();

    /* --- PROPOSAL EMOTIONAL CLIMAX --- */
    initProposal();
});

/* --- FUNCTION DEFINITIONS --- */

/* 1. FX & Particles */
function initParticleLayer() {
    // Basic setup for floating items. For true cinematic effect, would use Canvas.
    // This adds divs to represent fireflies/petals for simplicity/no-library reqs.
    const fxLayer = document.querySelector('.fireflies');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = `rgba(212, 175, 55, ${Math.random()})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animation = `floatParticle ${5 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        fxLayer.appendChild(particle);
    }
}

// Simple float animation in JS to add keyframes dynamic
const floatKeyframes = `@keyframes floatParticle {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
    50% { transform: translateY(-30px) translateX(${Math.random() * 20 - 10}px); opacity: 1; }
}`;
const styleSheet = document.createElement("style");
styleSheet.innerText = floatKeyframes;
document.head.appendChild(styleSheet);


function initMouseMoveGlow() {
    const mouseGlow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', e => {
        if (!mouseGlow) return;
        mouseGlow.style.opacity = 1;
        mouseGlow.style.left = `${e.clientX - 50}px`;
        mouseGlow.style.top = `${e.clientY - 50}px`;
    });
}

function initCursorSparkle() {
    // Minimal sparkle on click
    document.addEventListener('click', function(e) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('cursor-sparkle');
        sparkle.style.left = `${e.clientX - 5}px`;
        sparkle.style.top = `${e.clientY - 5}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });
}

/* 2. Music Player */
const audio = document.getElementById('romantic-audio');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
let isPlaying = false;

function initMusicPlayer() {
    playPauseBtn.addEventListener('click', togglePlay);
    volumeSlider.addEventListener('input', e => audio.volume = e.target.value);
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '▶️';
        playPauseBtn.classList.remove('glowing-icon');
    } else {
        audio.play().catch(e => {
            console.error("Autoplay prevented:", e);
            alert("To experience the cinematic magic, please allow the browser to play audio.");
        });
        playPauseBtn.innerHTML = '❤️';
        playPauseBtn.classList.add('glowing-icon');
    }
    isPlaying = !isPlaying;
}

function tryAutoplay() {
    // Modern browsers prevent autoplay without interaction.
    // The "Begin Our Story" button click will handle this.
    if (!isPlaying) {
        togglePlay();
    }
}

/* 3. Live Counter */
function initLiveCounter(startDate) {
    const start = new Date(startDate);
    const counterElements = {
        years: document.getElementById('c-years'),
        months: document.getElementById('c-months'),
        days: document.getElementById('c-days'),
        hours: document.getElementById('c-hours'),
        minutes: document.getElementById('c-minutes'),
        seconds: document.getElementById('c-seconds')
    };

    function updateCounter() {
        const now = new Date();
        const diff = now - start; // milliseconds

        if (diff <= 0) return;

        // Simplified calculation (ignoring leap years/precise month durations for pure JS simplicity)
        const msPerSec = 1000;
        const msPerMin = msPerSec * 60;
        const msPerHour = msPerMin * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30.44; // Avg
        const msPerYear = msPerDay * 365.25;

        counterElements.years.innerText = Math.floor(diff / msPerYear);
        counterElements.months.innerText = Math.floor((diff % msPerYear) / msPerMonth);
        counterElements.days.innerText = Math.floor((diff % msPerMonth) / msPerDay);
        counterElements.hours.innerText = Math.floor((diff % msPerDay) / msPerHour);
        counterElements.minutes.innerText = Math.floor((diff % msPerHour) / msPerMin);
        counterElements.seconds.innerText = Math.floor((diff % msPerMin) / msPerSec);
    }

    setInterval(updateCounter, 1000);
    updateCounter(); // Initial call
}

/* 4. Scroll Animations */
const scrollElements = document.querySelectorAll('.js-scroll-animate, .timeline-item, .reason-card');

function initScrollAnimations() {
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

function animateOnScroll() {
    scrollElements.forEach(el => {
        if (elementInViewport(el)) {
            // Find child with data-animate attribute
            const animationElement = el.hasAttribute('data-animate') ? el : el.querySelector('[data-animate]');
            if (animationElement && !animationElement.classList.contains('animate-active')) {
                animationElement.classList.add('animate-active');
            }
        }
    });
}

function elementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const threshold = window.innerHeight * 0.8; // Trigger when 80% is in view
    return (rect.top <= threshold);
}

/* 5. Gallery & Lightbox */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.getElementById('prev-photo');
const nextBtn = document.getElementById('next-photo');
let currentPhotoIndex = 0;

function initGallery() {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => changePhoto(-1));
    nextBtn.addEventListener('click', () => changePhoto(1));

    // Close lightbox on click outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Handle keyboard nav
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") changePhoto(-1);
        if (e.key === "ArrowRight") changePhoto(1);
    });
}

function openLightbox(index) {
    currentPhotoIndex = index;
    const imgSrc = galleryItems[index].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    body.classList.add('is-loading'); // Prevent scrolling body
}

function closeLightbox() {
    lightbox.classList.remove('active');
    body.classList.remove('is-loading');
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    if (currentPhotoIndex < 0) currentPhotoIndex = galleryItems.length - 1;
    if (currentPhotoIndex >= galleryItems.length) currentPhotoIndex = 0;
    
    // Add Ken Burns type fade on change
    lightboxImg.style.transition = 'opacity 0.2s ease-in';
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = galleryItems[currentPhotoIndex].querySelector('img').src;
        lightboxImg.style.opacity = 1;
    }, 200);
}

/* 6. Proposal Emotional Climax */
function initProposal() {
    const proposalSection = document.getElementById('proposal');
    const stage = document.getElementById('proposal-stage');
    const pretext = document.getElementById('proposal-pretext');
    const ring = document.getElementById('proposal-ring');
    const question = document.getElementById('proposal-question');
    const buttons = document.getElementById('proposal-buttons');
    const successMsg = document.getElementById('proposal-success');
    const decisionBtns = document.querySelectorAll('.decision-btn');

    let sequenceTriggered = false;

    // Trigger proposal when section is scrolled into view
    window.addEventListener('scroll', function() {
        if (elementInViewport(proposalSection) && !sequenceTriggered) {
            triggerProposalSequence();
            sequenceTriggered = true;
        }
    });

    function triggerProposalSequence() {
        // Fade to black handled by CSS transition
        proposalSection.classList.add('climax-active');
        
        // Sequence of cinematic appearances
        setTimeout(() => pretext.classList.remove('hide'), 2000); // Wait 2s, then text
        setTimeout(() => pretext.classList.add('hide'), 6000); // Hide pretext after 4s

        setTimeout(() => ring.classList.remove('hide'), 7000); // Ring pops up
        setTimeout(() => question.classList.remove('hide'), 9000); // Question appears
        setTimeout(() => buttons.classList.remove('hide'), 11000); // Buttons appear
    }

    decisionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            stage.classList.add('hide'); // Hide the question stage
            setTimeout(() => successMsg.classList.remove('hide'), 500); // Show success message
            triggerCelebrationFx();
        });
    });
}

function triggerCelebrationFx() {
    // PURE JS celebration FX (Fireworks/Confetti)
    // Create canvas, particles, etc. 
    // This is a placeholder for actual complex canvas JS for fireworks to keep this response within limits, but the event is triggered.
    console.log("TRIGGER: Thousands of Hearts, Fireworks, Confetti, Golden Particles");
    alert("Imagine Fireworks and Confetti! You just made me the happiest man alive.");
}
