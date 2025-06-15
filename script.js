const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');
let isPlaying = false;

// Auto-play audio on page load
window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }).catch(error => {
        console.log('Auto-play blocked:', error);
        audioToggle.addEventListener('click', () => {
            if (!isPlaying) {
                audio.play();
                isPlaying = true;
                audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }, { once: true });
    });
});

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audio.play();
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});

// Ensure audio replays when it ends
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
});

// Particle Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
