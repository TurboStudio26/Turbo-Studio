/* ============================
   MENU MOBILE
============================ */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle.addEventListener("click", () => {

    const opened =
        mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        opened
    );

    menuToggle.setAttribute(
        "aria-label",
        opened
            ? "Fechar menu"
            : "Abrir menu"
    );

});
/* fecha o menu ao clicar */

document.querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });


/* ============================
   ANIMAÇÕES DE ENTRADA
============================ */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* ============================
   NÚMEROS ANIMADOS
============================ */

const numbers =
    document.querySelectorAll("[data-number]");


const numberObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                const element =
                    entry.target;

                const target =
                    Number(
                        element.dataset.number
                    );

                let current = 0;

                const duration = 1500;

                const steps =
                    Math.max(
                        1,
                        Math.floor(
                            duration / 20
                        )
                    );

                const increment =
                    target / steps;


                const counter =
                    setInterval(() => {

                        current += increment;

                        if (current >= target) {

                            current = target;

                            clearInterval(counter);

                        }

                        element.textContent =
                            Math.floor(current)
                            .toLocaleString("pt-BR");

                    }, 20);


                numberObserver.unobserve(
                    element
                );

            });

        },

        {
            threshold: .5
        }

    );


numbers.forEach(number => {

    numberObserver.observe(number);

});


/* ============================
   BOTÃO VOLTAR AO TOPO
============================ */

const topBtn =
    document.getElementById("topBtn");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ============================
   ALTO CONTRASTE
============================ */
const contrastBtn =
    document.getElementById("contrastBtn");
if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
        document.body.classList.toggle(
            "high-contrast"
        );
        const enabled =
            document.body.classList.contains(
                "high-contrast"
            );

        contrastBtn.setAttribute(
            "aria-pressed",
            enabled
        );
    });
}
/* ============================
   TAMANHO DA FONTE
============================ */
const fontPlus =
    document.getElementById("fontPlus");
const fontMinus =
    document.getElementById("fontMinus");
if (fontPlus) {
    fontPlus.addEventListener("click", () => {
        document.body.classList.add("large-text");
    });
}
if (fontMinus) {
    fontMinus.addEventListener("click", () => {
        document.body.classList.remove("large-text");

    });
}

/* ============================
   FORMULÁRIO TURBOSTUDIO
============================ */
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();
        const submitButton = form.querySelector('[type="submit"]');
        if (!name || !email || !service || !message) {
            formMessage.textContent = "Preencha todos os campos.";
            return;
        }
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
        formMessage.textContent = "";
        try {
            const resposta = await fetch(
                "https://formsubmit.co/ajax/suporte.turbostudio@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        service: service,
                        message: message,
                        _subject: "Nova solicitação - Turbo Studio"
                    })
                }
            );
            const resultado = await resposta.json();
            if (!resposta.ok || resultado.success !== "true") {
                throw new Error("Não foi possível enviar a solicitação.");
            }
            formMessage.textContent =
                "Solicitação enviada com sucesso! Nossa equipe entrará em contato.";
            form.reset();
        } catch (erro) {
            console.error("Erro no formulário:", erro);
            formMessage.textContent =
                "Não foi possível enviar. Verifique sua conexão e tente novamente.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Preparar solicitação";
        }
    });
}
/* ============================
   EFEITO DE MOVIMENTO DO HERO
============================ */
const hero = document.querySelector(".hero");
if (hero) {
    hero.addEventListener("mousemove", event => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        const card = hero.querySelector(".hero-card");

        if (card) {
            card.style.transform = `translate(${x}px, ${y}px)`
        }
    });
}
/* ============================
   FEEDBACK VISUAL DOS LINKS
============================ */

document.querySelectorAll(
    "a[href^='#']"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            link.blur();

        }
    );
});
document.addEventListener("DOMContentLoaded", function () {
    const abrir = document.getElementById("abrirWhatsapp");
    const fechar = document.getElementById("fecharWhatsapp");
    const caixa = document.getElementById("whatsappBox");
    if (abrir && caixa) {
        abrir.addEventListener("click", function () {
            caixa.classList.add("ativo");
        });
    }
    if (fechar && caixa) {
        fechar.addEventListener("click", function () {
            caixa.classList.remove("ativo");
        });
    }
});
/* ============================
   CARREGAMENTO
============================ */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);
