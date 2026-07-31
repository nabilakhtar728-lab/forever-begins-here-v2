/* --- PURE JAVASCRIPT --- */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const beginBtn = document.getElementById('begin-story');

    // Dates
    const startDateStr = "10 August 2022 00:00:00";

    /* --- INTRO / PRELOADER --- */
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            mainContent.classList.add('fade-in');
            body.classList.remove('is-loading');
            animateOnScroll();
        }, 4500); 
    });

    /* --- Begin Our Story Button --- */
    beginBtn.addEventListener('click', function() {
        tryAutoplay();
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

function initParticleLayer() {
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
    document.addEventListener('click', function(e) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('cursor-sparkle');
        sparkle.style.left = `${e.clientX - 5}px`;
        sparkle.style.top = `${e.clientY - 5}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    });
}

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
        });
        playPauseBtn.innerHTML = '❤️';
        playPauseBtn.classList.add('glowing-icon');
    }
    isPlaying = !isPlaying;
}

function tryAutoplay() {
    if (!isPlaying) {
        togglePlay();
    }
}

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
        const diff = now - start;

        if (diff <= 0) return;

        const msPerSec = 1000;
        const msPerMin = msPerSec * 60;
        const msPerHour = msPerMin * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30.44;
        const msPerYear = msPerDay * 365.25;

        counterElements.years.innerText = Math.floor(diff / msPerYear);
        counterElements.months.innerText = Math.floor((diff % msPerYear) / msPerMonth);
        counterElements.days.innerText = Math.floor((diff % msPerMonth) / msPerDay);
        counterElements.hours.innerText = Math.floor((diff % msPerDay) / msPerHour);
        counterElements.minutes.innerText = Math.floor((diff % msPerHour) / msPerMin);
        counterElements.seconds.innerText = Math.floor((diff % msPerMin) / msPerSec);
    }

    setInterval(updateCounter, 1000);
    updateCounter();
}

const scrollElements = document.querySelectorAll('.js-scroll-animate, .timeline-item, .reason-card');

function initScrollAnimations() {
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

function animateOnScroll() {
    scrollElements.forEach(el => {
        if (elementInViewport(el)) {
            const animationElement = el.hasAttribute('data-animate') ? el : el.querySelector('[data-animate]');
            if (animationElement && !animationElement.classList.contains('animate-active')) {
                animationElement.classList.add('animate-active');
            }
        }
    });
}

function elementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const threshold = window.innerHeight * 0.8;
    return (rect.top <= threshold);
}

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

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

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
    body.classList.add('is-loading');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    body.classList.remove('is-loading');
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    if (currentPhotoIndex < 0) currentPhotoIndex = galleryItems.length - 1;
    if (currentPhotoIndex >= galleryItems.length) currentPhotoIndex = 0;
    
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

    window.addEventListener('scroll', function() {
        if (elementInViewport(proposalSection) && !sequenceTriggered) {
            triggerProposalSequence();
            sequenceTriggered = true;
        }
    });

    function triggerProposalSequence() {
        proposalSection.classList.add('climax-active');
        
        setTimeout(() => pretext.classList.remove('hide'), 1000);
        setTimeout(() => pretext.classList.add('hide'), 4000);

        setTimeout(() => ring.classList.remove('hide'), 500); 
        setTimeout(() => question.classList.remove('hide'), 6000);
        setTimeout(() => buttons.classList.remove('hide'), 7500);
    }

    decisionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            stage.style.display = 'none';
            
            // Aesthetic updates inside the card instead of an alert window popup
            const happyMessage = successMsg.querySelector('.happy-message');
            if (happyMessage) {
                happyMessage.innerHTML = "WAIT FOR MORE 4years 🤭😝";
                happyMessage.style.fontFamily = "'Playfair Display', serif";
                happyMessage.style.fontSize = "2.5rem";
                happyMessage.style.color = "#D4AF37";
            }
            
            successMsg.classList.remove('hide');
        });
    });
}
