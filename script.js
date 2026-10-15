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
   FORMULÁRIO TURBO STUDIO
   Supabase + FormSubmit
============================ */
const form = document.getElementById("contactForm");
const SUPABASE_URL =
    "https://msfehhtxujkzwiwoquxf.supabase.co";
const SUPABASE_KEY =
    "sb_publishable_IRw2CckrpiS1q7tfoTuBlQ_yNKOemIP";
const EMAIL_DESTINO =
    "suporte.turbostudio@gmail.com";
if (form) {
    let formMessage = document.getElementById("formMessage");
    if (!formMessage) {
        formMessage = document.createElement("p");
        formMessage.id = "formMessage";
        formMessage.setAttribute("role", "status");
        formMessage.setAttribute("aria-live", "polite");
        form.appendChild(formMessage);
    }
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nome =
            document.getElementById("name").value.trim();
        const email =
            document.getElementById("email").value.trim();
        const servico =
            document.getElementById("service").value;
        const mensagem =
            document.getElementById("message").value.trim();
        if (!nome || !email || !servico || !mensagem) {
            formMessage.textContent =
                "Preencha todos os campos antes de enviar.";
            return;
        }
        const botao = form.querySelector('[type="submit"]');
        const textoOriginal = botao.textContent;
        botao.disabled = true;
        botao.textContent = "Enviando...";
        formMessage.textContent = "";
        let salvoNoBanco = false;
        try {
            // 1. Salvar a solicitação no Supabase
            const respostaBanco = await fetch(
                `${SUPABASE_URL}/rest/v1/agendamentos`,
                {
                    method: "POST",
                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        servico: servico,
                        observacoes: mensagem
                    })
                }
            );
            if (!respostaBanco.ok) {
                const detalhe = await respostaBanco.text();
                console.error("Erro Supabase:", detalhe);
                throw new Error("Falha ao salvar no banco.");
            }
            salvoNoBanco = true;
            // 2. Enviar a solicitação por e-mail
            const respostaEmail = await fetch(
                `https://formsubmit.co/ajax/${encodeURIComponent(EMAIL_DESTINO)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        _subject: "Nova solicitação - Turbo Studio",
                        _template: "table",
                        _captcha: "false",
                        nome: nome,
                        email: email,
                        servico: servico,
                        mensagem: mensagem
                    })
                }
            );
        const resultadoEmail = await respostaEmail.json();
console.log("Resposta completa do FormSubmit:", resultadoEmail);
if (!respostaEmail.ok || resultadoEmail.success !== "true") {
    throw new Error(
        resultadoEmail.message ||
        resultadoEmail.error ||
        "Falha no envio do e-mail."
    );
}
        } finally {
            botao.disabled = false;
            botao.textContent = textoOriginal;
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
