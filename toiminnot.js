document.addEventListener("DOMContentLoaded", () => {
    const hotspots = document.querySelectorAll(".hotspot");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupContent = document.querySelector(".popup-content");
    const closePopup = document.querySelector(".close");

    popup.style.display = "none";

    hotspots.forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            if (hotspot.id === "screen2") {
                startGame();
            } else if (hotspot.id === "screen3") {
                popupContent.classList.remove("sahara-style");

                popupText.innerHTML = `
                    <h3>⚡ Pikaklikkihaaste</h3>
                    <p>Klikkaa niin monta kertaa kuin ehdit 5 sekunnissa!</p>
                    <button id="click-me" style="padding: 10px 20px; margin-top: 10px;">Klikkaa minua!</button>
                    <p id="click-counter" style="font-weight: bold; margin-top: 15px;">Klikkauksia: 0</p>
                    <p id="time-left" style="margin-top: 10px;">Aikaa jäljellä: 5 s</p>
                `;

                popup.style.display = "flex";

                let clicks = 0;
                let time = 5;

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
                        result.style.fontWeight = "bold";
                        result.style.color = "green";
                        result.style.marginTop = "10px";
                        popupText.appendChild(result);
                    }
                }, 1000);

                button.addEventListener("click", () => {
                    clicks++;
                    counter.textContent = `Klikkauksia: ${clicks}`;
                });

            } else if (hotspot.id === "teacher") {
                popupContent.classList.remove("sahara-style");

                const wisdoms = [
                    "✨ Virheet ovat parasta koodia – ne kertovat, että yrität.",
                    "💡 Yksi rivikin on jo ohjelmointi.",
                    "🌱 Oppiminen alkaa uteliaisuudesta.",
                    "🎨 Koodikin voi olla taidetta.",
                    "☕ Tauko tekee koodista parempaa.",
                    "💖 Tärkeintä ei ole olla täydellinen – vaan utelias ja rohkea."
                ];

                const random = Math.floor(Math.random() * wisdoms.length);
                popupText.innerHTML = `<p style="font-size: 1.1rem; font-style: italic;">${wisdoms[random]}</p>`;
                popup.style.display = "flex";

            } else if (hotspot.id === "dog" || hotspot.id === "koira") {
                popupContent.classList.remove("sahara-style");

                const missions = [
                    {
                        message: "🐾 Hei! Olen Balto, koodikoulun salainen agentti. Tässä tehtävä sinulle:",
                        code: `let number = "5";\nlet result = number + 2;\nconsole.log(result);`,
                        answer: "🧠 Vastaus: Merkkijono '5' + 2 = '52'. Muunna number numeroksi: `Number(number) + 2`."
                    },
                    {
                        message: "🕵️‍♂️ Balto haastaa sinut: mikä tässä ei ehkä toimi kuten odotat?",
                        code: `const colors = [\"punainen\", \"sininen\", \"vihreä\"];\nconsole.log(colors[3]);`,
                        answer: "🔎 Vastaus: `colors[3]` viittaa olemattomaan alkioon. Taulukossa on vain 3 (indeksit 0–2)."
                    },
                    {
                        message: "🐶 Enskalta aivopähkinä: miksi tämä ei tulosta oikein?",
                        code: `function sayHello(name) {\n    console.log(\"Hei, \" + nimi);\n}\nsayHello(\"Marjatta\");`,
                        answer: "🐾 Vastaus: Muuttuja `nimi` ei ole määritelty. Sen pitäisi olla `name` kuten parametrissa."
                    },
                    {
                        message: "🐾 Hmm... jokin ei toimi tässä napin painalluksessa. Arvaatko mikä?",
                        code: `<button onclick=\"alert(Tervetuloa!)\">Klikkaa</button>` ,
                        answer: "💬 Vastaus: `Tervetuloa!` pitää olla lainausmerkeissä: `alert('Tervetuloa!')`."
                    }
                ];

                const random = Math.floor(Math.random() * missions.length);
                const task = missions[random];

                popupText.innerHTML = `
                    <p style="font-weight: bold; margin-bottom: 10px;">${task.message}</p>
                    <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px; font-size: 0.9rem;">${task.code}</pre>
                    <p style="font-style: italic; margin-top: 10px;">🔍 Missä tässä voisi olla virhe?</p>
                    <button id="show-answer" style="margin-top: 10px;">Näytä vastaus</button>
                    <p id="answer-text" style="display: none; margin-top: 10px; color: #116611; font-weight: bold;"></p>
                `;

                document.getElementById("show-answer").addEventListener("click", () => {
                    const answerEl = document.getElementById("answer-text");
                    answerEl.textContent = task.answer;
                    answerEl.style.display = "block";
                });

                popup.style.display = "flex";

            } else if (hotspot.id === "board") {
                popupContent.classList.remove("sahara-style");

                popupText.innerHTML = `
                    <h3 style="margin-bottom: 10px;">🧪 Mini-visa: HTML</h3>
                    <p>Mikä HTML-elementti tekee pääotsikon?</p>
                    <div style="margin-top: 10px;">
                        <button class="quiz-btn" data-correct="false">A) &lt;head&gt;</button>
                        <button class="quiz-btn" data-correct="true">B) &lt;h1&gt;</button>
                        <button class="quiz-btn" data-correct="false">C) &lt;title&gt;</button>
                    </div>
                    <p id="quiz-result" style="margin-top: 15px; font-weight: bold;"></p>
                `;

                popup.style.display = "flex";

                document.querySelectorAll(".quiz-btn").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const isCorrect = btn.dataset.correct === "true";
                        const result = document.getElementById("quiz-result");
                        if (isCorrect) {
                            result.textContent = "✅ Oikein! Hyvin tehty!";
                            result.style.color = "green";
                        } else {
                            result.textContent = "❌ Oho! Kokeile vielä.";
                            result.style.color = "crimson";
                        }
                    });
                });

            } else if (hotspot.id === "title") {
                popupContent.classList.remove("sahara-style");
                popupText.innerHTML = `
                    <h2>Tervetuloa Marjatan koodikouluun!</h2>
                    <p>Täällä opitaan ohjelmointiin liittyvistä asioista leikkimielisesti ja lempeästi.</p>
                    <p>Klikkaa eri kohtia luokkahuoneessa, ratkaise haasteita ja tutustu koodauksen maailmaan yhdessä opettajan, maskottikoiran ja muiden yllätyksien kanssa.</p>
                `;
                popup.style.display = "flex";

            } else {
                popupContent.classList.remove("sahara-style");
                popupText.textContent = hotspot.dataset.content;
                popup.style.display = "flex";
            }
        });
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
        popupContent.classList.remove("sahara-style");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
            popupContent.classList.remove("sahara-style");
        }
    });

    const toggleButton = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("menuItems");

    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener("click", () => {
            mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
        });

        const menuLinks = document.querySelectorAll(".menu-link");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                const target = link.dataset.target;
                const element = document.getElementById(target);
                if (element) {
                    element.click();
                }
                mobileMenu.style.display = "none";
            });
        });
    }

    const dragTarget = document.getElementById("koira");
    const container = document.querySelector(".scene");
    let isDragging = false;

    dragTarget?.addEventListener("mousedown", () => {
        isDragging = true;

        const onMouseMove = (eMove) => {
            if (!isDragging) return;

            const rect = container.getBoundingClientRect();
            const x = eMove.clientX - rect.left;
            const y = eMove.clientY - rect.top;

            const leftPercent = (x / rect.width) * 100;
            const topPercent = (y / rect.height) * 100;

            dragTarget.style.left = `${leftPercent}%`;
            dragTarget.style.top = `${topPercent}%`;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function startGame() {
        popupContent.classList.add("sahara-style");

        popupText.innerHTML = `
            <div id="game-area" style="
                position: relative;
                width: 400px;
                height: 250px;
                border-radius: 10px;
                padding: 10px;
                overflow: hidden;
            ">
                <p><strong>Etsi 3 Python-käärmettä!</strong></p>
                <p id="counter">Löydetty: 0 / 3</p>
                <div class="hidden-item" style="top: 20%; left: 10%;"></div>
                <div class="hidden-item" style="top: 50%; left: 50%;"></div>
                <div class="hidden-item" style="top: 70%; left: 80%;"></div>
                <button id="restartBtn" style="position: absolute; bottom: 10px; right: 10px;">Pelaa uudestaan</button>
            </div>
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
                        const message = document.createElement("div");
                        message.textContent = "🎉 Hienoa, löysit kaikki käärmeet!";
                        message.style.marginTop = "15px";
                        message.style.fontWeight = "bold";
                        message.style.fontSize = "1.1rem";
                        message.style.color = "#116611";
                        message.style.textShadow = "1px 1px 2px white";
                        document.getElementById("game-area").appendChild(message);
                    }
                }
            });
        });

        document.getElementById("restartBtn").addEventListener("click", startGame);
    }
});