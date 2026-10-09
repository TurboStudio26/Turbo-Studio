
/* ============================
   MENU MOBILE
============================ */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const opened = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", opened);
        menuToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
    });

    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}

/* ============================
   ANIMAÇÕES AO ROLAR A TELA
============================ */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element, index) => {
        if (element.classList.contains("service-card")) {
            element.style.animationDelay = `${(index % 4) * 110}ms`;
        }
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add("active"));
}

/* ============================
   NÚMEROS ANIMADOS
============================ */
const numbers = document.querySelectorAll("[data-number]");

if ("IntersectionObserver" in window) {
    const numberObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const target = Number(element.dataset.number);
            let current = 0;
            const duration = 1500;
            const steps = Math.max(1, Math.floor(duration / 20));
            const increment = target / steps;

            const counter = setInterval(() => {
                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }

                element.textContent = Math.floor(current).toLocaleString("pt-BR");
            }, 20);

            numberObserver.unobserve(element);
        });
    }, { threshold: 0.5 });

    numbers.forEach(number => numberObserver.observe(number));
}

/* ============================
   BOTÃO VOLTAR AO TOPO
============================ */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("show", window.scrollY > 500);
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================
   ALTO CONTRASTE
============================ */
const contrastBtn = document.getElementById("contrastBtn");

if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");

        const enabled = document.body.classList.contains("high-contrast");
        contrastBtn.setAttribute("aria-pressed", enabled);
    });
}

/* ============================
   TAMANHO DA FONTE
============================ */
const fontPlus = document.getElementById("fontPlus");
const fontMinus = document.getElementById("fontMinus");

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

/* ==========================================
   FORMULÁRIO — SIMULAÇÃO DE WHATSAPP
   Não envia mensagens reais nem usa telefone.
========================================== */

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = form.querySelector('[name="name"]')?.value.trim()
            || document.getElementById("name")?.value.trim();

        const email = form.querySelector('[name="email"]')?.value.trim()
            || document.getElementById("email")?.value.trim();

        const servico = form.querySelector('[name="service"]')?.value
            || document.getElementById("service")?.value;

        const mensagem = form.querySelector('[name="message"]')?.value.trim()
            || document.getElementById("message")?.value.trim();

        if (!nome || !email || !servico || !mensagem) {
            if (formMessage) {
                formMessage.textContent =
                    "Preencha todos os campos antes de continuar.";
            }
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {
            if (formMessage) {
                formMessage.textContent =
                    "Digite um endereço de e-mail válido.";
            }
            return;
        }

        const textoMensagem = [
            "Olá! Gostaria de solicitar um orçamento.",
            "",
            `Nome: ${nome}`,
            `E-mail: ${email}`,
            `Serviço desejado: ${servico}`,
            `Mensagem: ${mensagem}`
        ].join("\n");

        abrirSimulacaoWhatsApp(textoMensagem);
    });
}

function abrirSimulacaoWhatsApp(texto) {
    let modal = document.getElementById("simulacaoWhatsApp");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "simulacaoWhatsApp";
        modal.innerHTML = `
            <div class="sim-whatsapp-card" role="dialog"
                 aria-modal="true" aria-labelledby="simTitulo">
                <div class="sim-whatsapp-header">
                    <div class="sim-avatar">T</div>
                    <div>
                        <strong id="simTitulo">Turbo Studio</strong>
                        <small>Simulação de atendimento</small>
                    </div>
                    <button type="button" id="simFechar"
                            aria-label="Fechar simulação">×</button>
                </div>

                <div class="sim-whatsapp-body">
                    <div class="sim-aviso">
                        MODO DE TESTE — nenhuma mensagem será enviada.
                    </div>
                    <div class="sim-bolha">
                        <small>Prévia da solicitação</small>
                        <p id="simTexto"></p>
                        <span>Simulação · Não enviado</span>
                    </div>
                </div>

                <div class="sim-whatsapp-footer">
                    <button type="button" id="simEditar">
                        Voltar ao formulário
                    </button>
                    <button type="button" id="simConcluir">
                        Concluir teste
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector("#simFechar").addEventListener("click", fecharSimulacao);
        modal.querySelector("#simEditar").addEventListener("click", fecharSimulacao);

        modal.querySelector("#simConcluir").addEventListener("click", function () {
            const aviso = modal.querySelector(".sim-aviso");
            aviso.textContent = "Teste concluído! Nenhuma mensagem foi enviada.";
            aviso.classList.add("sim-concluido");
        });

        modal.addEventListener("click", function (event) {
            if (event.target === modal) fecharSimulacao();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") fecharSimulacao();
        });
    }

    modal.querySelector("#simTexto").textContent = texto;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modal.querySelector("#simFechar").focus();
}

function fecharSimulacao() {
    const modal = document.getElementById("simulacaoWhatsApp");

    if (modal) modal.style.display = "none";

    document.body.style.overflow = "";
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
        const card = document.querySelector(".hero-card");

        if (card) {
            card.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

/* ============================
   FEEDBACK VISUAL DOS LINKS
============================ */
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => link.blur());
});

/* ============================
   JANELA DO WHATSAPP
============================ */
const abrirWhatsapp = document.getElementById("abrirWhatsapp");
const fecharWhatsapp = document.getElementById("fecharWhatsapp");
const whatsappBox = document.getElementById("whatsappBox");

if (abrirWhatsapp && whatsappBox) {
    abrirWhatsapp.addEventListener("click", () => {
        whatsappBox.classList.add("ativo");
    });
}

if (fecharWhatsapp && whatsappBox) {
    fecharWhatsapp.addEventListener("click", () => {
        whatsappBox.classList.remove("ativo");
    });
}

/* ============================
   CARREGAMENTO DA PÁGINA
============================ */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});