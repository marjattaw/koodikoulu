document.addEventListener("DOMContentLoaded", () => {
    const hotspots = document.querySelectorAll(".hotspot");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupContent = document.querySelector(".popup-content");
    const closePopup = document.querySelector(".close");

    popup.style.display = "none";

    hotspots.forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            popupContent.classList.remove("sahara-style");

            if (hotspot.id === "screen2") {
                startGame();
            } else if (hotspot.id === "screen3") {
                popupText.innerHTML = `
                    <h3>⚡ Pikaklikkihaaste</h3>
                    <p>Klikkaa niin monta kertaa kuin ehdit 5 sekunnissa!</p>
                    <button id="click-me">Klikkaa minua!</button>
                    <p id="click-counter">Klikkauksia: 0</p>
                    <p id="time-left">Aikaa jäljellä: 5 s</p>
                `;
                popup.style.display = "flex";

                let clicks = 0, time = 5;
                const button = document.getElementById("click-me");
                const counter = document.getElementById("click-counter");
                const timer = document.getElementById("time-left");

                const interval = setInterval(() => {
                    time--;
                    timer.textContent = `Aikaa jäljellä: ${time} s`;
                    if (time === 0) {
                        clearInterval(interval);
                        button.disabled = true;
                        timer.textContent = "⏰ Aika loppui!";
                        const result = document.createElement("p");
                        result.textContent = `🚀 Hienoa! Sait ${clicks} klikkausta!`;
                        popupText.appendChild(result);
                    }
                }, 1000);

                button.addEventListener("click", () => {
                    clicks++;
                    counter.textContent = `Klikkauksia: ${clicks}`;
                });

            } else if (hotspot.id === "screen5") {
                startMemoryGame();

            } else if (hotspot.id === "teacher") {
                const wisdoms = [
                    "✨ Virheet ovat parasta koodia – ne kertovat, että yrität.",
                    "💡 Yksi rivikin on jo ohjelmointi.",
                    "🌱 Oppiminen alkaa uteliaisuudesta.",
                    "🎨 Koodikin voi olla taidetta.",
                    "☕ Tauko tekee koodista parempaa.",
                    "💖 Tärkeintä ei ole olla täydellinen – vaan utelias ja rohkea."
                ];
                const random = Math.floor(Math.random() * wisdoms.length);
                popupText.innerHTML = `<p style="font-style: italic;">${wisdoms[random]}</p>`;
                popup.style.display = "flex";

            } else if (hotspot.id === "dog" || hotspot.id === "koira") {
                const missions = [
                    {
                        message: "🐾 Hei! Olen Balto...",
                        code: `let number = "5";\nlet result = number + 2;\nconsole.log(result);`,
                        answer: "🧠 Vastaus: '52'. Muunna number numeroksi: Number(number) + 2."
                    },
                    {
                        message: "🕵️‍♂️ Balto haastaa...",
                        code: `const colors = ["punainen", "sininen", "vihreä"];\nconsole.log(colors[3]);`,
                        answer: "🔎 Vastaus: indeksin 3 kohdalla ei ole arvoa."
                    }
                ];
                const task = missions[Math.floor(Math.random() * missions.length)];
                popupText.innerHTML = `
                    <p><strong>${task.message}</strong></p>
                    <pre>${task.code}</pre>
                    <button id="show-answer">Näytä vastaus</button>
                    <p id="answer-text" style="display: none;">${task.answer}</p>
                `;
                document.getElementById("show-answer").addEventListener("click", () => {
                    document.getElementById("answer-text").style.display = "block";
                });
                popup.style.display = "flex";

            } else if (hotspot.id === "board") {
                popupText.innerHTML = `
                    <h3>🧪 Mini-visa: HTML</h3>
                    <p>Mikä HTML-elementti tekee pääotsikon?</p>
                    <button class="quiz-btn" data-correct="false">A) &lt;head&gt;</button>
                    <button class="quiz-btn" data-correct="true">B) &lt;h1&gt;</button>
                    <button class="quiz-btn" data-correct="false">C) &lt;title&gt;</button>
                    <p id="quiz-result"></p>
                `;
                popup.style.display = "flex";
                document.querySelectorAll(".quiz-btn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const result = document.getElementById("quiz-result");
                        result.textContent = btn.dataset.correct === "true" ? "✅ Oikein!" : "❌ Väärin!";
                        result.style.color = btn.dataset.correct === "true" ? "green" : "red";
                    });
                });

            } else if (hotspot.id === "title") {
                popupText.innerHTML = `
                    <h2>Tervetuloa Marjatan koodikouluun!</h2>
                    <p>Leikkimielinen ja lempeä tapa tutustua ohjelmointiin.</p>
                `;
                popup.style.display = "flex";

            } else {
                popupText.textContent = hotspot.dataset.content;
                popup.style.display = "flex";
            }
        });
    });

    closePopup.addEventListener("click", () => popup.style.display = "none");

    const dragTarget = document.getElementById("koira");
    const container = document.querySelector(".scene");
    let isDragging = false;

    dragTarget?.addEventListener("mousedown", () => {
        isDragging = true;
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            dragTarget.style.left = `${((e.clientX - rect.left) / rect.width) * 100}%`;
            dragTarget.style.top = `${((e.clientY - rect.top) / rect.height) * 100}%`;
        };
        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    const toggleButton = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("menuItems");

    toggleButton?.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => {
            document.getElementById(link.dataset.target)?.click();
            mobileMenu.style.display = "none";
        });
    });
});

// 🐍 Etsi ja löydä -peli (screen2)
function startGame() {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupContent = document.querySelector(".popup-content");

    popupContent.classList.add("sahara-style");
    
    popupText.innerHTML = `
        <h3>🐍 Etsi 3 Python-käärmettä!</h3>
        <p id="counter"><strong>Löydetty: 0 / 3</strong></p>
        <div id="game-area" style="position: relative; width: 100%; height: 250px; margin-top: 10px;">
            <div class="hidden-item" style="top: 20%; left: 10%;"></div>
            <div class="hidden-item" style="top: 50%; left: 50%;"></div>
            <div class="hidden-item" style="top: 70%; left: 80%;"></div>
        </div>
        <button id="restartBtn" style="margin-top: 10px;">Pelaa uudestaan</button>
    `;

    popup.style.display = "flex";

    let found = 0;
    const total = 3;
    const counter = document.getElementById("counter");
    const items = document.querySelectorAll('.hidden-item');

    items.forEach(item => {
        item.classList.remove("found");
        item.addEventListener("click", () => {
            if (!item.classList.contains("found")) {
                item.classList.add("found");
                found++;
                counter.textContent = `Löydetty: ${found} / ${total}`;
                if (found === total) {
                    const msg = document.createElement("p");
                    msg.textContent = "🎉 Hienoa! Löysit kaikki käärmeet!";
                    msg.style.fontWeight = "bold";
                    msg.style.color = "green";
                    msg.style.marginTop = "10px";
                    popupText.appendChild(msg);
                }
            }
        });
    });

    document.getElementById("restartBtn").addEventListener("click", startGame);
}

// 🎮 Balto-muistipeli (screen5)
function startMemoryGame() {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");

    popupText.innerHTML = `
        <h3>🐾 Balto-muistipeli</h3>
        <p id="memory-counter"><strong>Löydetty: 0 / 3</strong></p>
        <div class="memory-game">
            ${generateCardsHTML()}
        </div>
    `;
    popup.style.display = "flex";
    initMemoryLogic();
}

function generateCardsHTML() {
    const cards = ["balto1", "balto1", "balto2", "balto2", "balto3", "balto3"];
    cards.sort(() => 0.5 - Math.random());
    return cards.map(name => `
        <div class="memory-card" data-name="${name}">
            <img class="front-face" src="images/${name}.png" alt="${name}">
            <img class="back-face" src="images/takakansi.png" alt="takakansi">
        </div>
    `).join('');
}

function initMemoryLogic() {
    let hasFlippedCard = false, lockBoard = false;
    let firstCard, secondCard;
    let pairsFound = 0;
    const totalPairs = 3;
    const counter = document.getElementById("memory-counter");
    const cards = document.querySelectorAll('.memory-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (lockBoard || card === firstCard || card.classList.contains('matched')) return;
            card.classList.add('flip');

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = card;
                return;
            }

            secondCard = card;
            checkForMatch();
        });
    });

    function checkForMatch() {
        if (firstCard.dataset.name === secondCard.dataset.name) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            pairsFound++;
            counter.textContent = `Löydetty: ${pairsFound} / ${totalPairs}`;
            if (pairsFound === totalPairs) showWin();
            reset();
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                reset();
            }, 1000);
        }
    }

    function reset() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showWin() {
        const popupText = document.getElementById("popup-text");
        const winMsg = document.createElement("div");
        winMsg.innerHTML = `
            <p style="font-weight: bold; font-size: 1.2rem; color: green;">🎉 Hienoa! Löysit kaikki parit!</p>
            <button id="replay-memory">Pelaa uudestaan</button>
            <canvas id="confetti-canvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000;"></canvas>
        `;
        popupText.appendChild(winMsg);
        document.getElementById("replay-memory").addEventListener("click", startMemoryGame);
        startConfetti();
    }
}

// 🎊 Konfettisade
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    const confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();
        });
        update();
    }

    function update() {
        confetti.forEach(p => {
            p.y += Math.cos(p.d / 2) + 2 + p.r / 2;
            p.x += Math.sin(0.5);
            p.tiltAngle += 0.1;
            p.tilt = Math.sin(p.tiltAngle) * 15;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    const animation = setInterval(draw, 30);
    setTimeout(() => {
        clearInterval(animation);
        canvas.remove();
    }, 5000);
}
