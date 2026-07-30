// Forever Begins Here ❤️

const intro = document.getElementById("intro");
const main = document.getElementById("main");
const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
            main.classList.remove("hidden");
            document.body.style.overflowY = "auto";
            updateCounter();
            setInterval(updateCounter, 1000);
        }, 1200);
    });
}

// Relationship Counter
const startDate = new Date("2022-08-10T00:00:00");

function updateCounter() {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diff = now - startDate;

    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    const counter = document.getElementById("counter");

    if (counter) {
        counter.innerHTML = `
            ❤️ ${years} Years<br>
            ❤️ ${months} Months<br>
            ❤️ ${days} Days<br>
            ❤️ ${hours} Hours<br>
            ❤️ ${minutes} Minutes<br>
            ❤️ ${seconds} Seconds
        `;
    }
}
// Music Button

const musicBtn = document.getElementById("musicBtn");
const loveSong = document.getElementById("loveSong");

if (musicBtn && loveSong) {
    musicBtn.addEventListener("click", () => {
        if (loveSong.paused) {
            loveSong.play();
            musicBtn.innerHTML = "⏸ Pause Our Song ❤️";
        } else {
            loveSong.pause();
            musicBtn.innerHTML = "▶ Play Our Song ❤️";
        }
    });
}
