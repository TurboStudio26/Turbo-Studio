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
   FORMULÁRIO
============================ */

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        if (!name) {

            formMessage.textContent =
                "Por favor, informe seu nome.";

            return;

        }


        formMessage.textContent =
            "Solicitação enviada com sucesso! Nossa equipe entrará em contato.";


        form.reset();

    }
);


/* ============================
   EFEITO DE MOVIMENTO DO HERO
============================ */

const hero =
    document.querySelector(".hero");


hero.addEventListener(
    "mousemove",
    event => {

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            return;

        }


        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 10;


        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 10;


        const card =
            document.querySelector(
                ".hero-card"
            );


        if (card) {

            card.style.transform =
                `translate(${x}px, ${y}px)`;

        }

    }
);


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
    /* ABRIR */
    abrir.addEventListener("click", function () {
        caixa.classList.add("ativo");
    });
    /* FECHAR */
    fechar.addEventListener("click", function () {
        caixa.classList.remove("ativo");

    });
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
