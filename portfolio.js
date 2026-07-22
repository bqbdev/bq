(function () {
  const projetos = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const grid = document.getElementById("portfolioGrid");
  const lightbox = document.getElementById("portfolioLightbox");
  const lightboxImage = document.getElementById("portfolioLightboxImage");
  const lightboxTitle = document.getElementById("portfolioLightboxTitle");
  const lightboxClose = document.getElementById("portfolioLightboxClose");

  function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
  }

  function urlValida(valor) {
    const link = String(valor || "").trim();
    if (!link) return "";
    return /^https?:\/\//i.test(link) ? link : `https://${link}`;
  }

  function abrirImagem(imagem, titulo) {
    lightboxImage.src = imagem;
    lightboxImage.alt = titulo;
    lightboxTitle.textContent = titulo;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  }

  function fecharImagem() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
  }

  function renderizar() {
    grid.replaceChildren();

    projetos.forEach((projeto) => {
      const titulo = String(projeto.titulo || "Projeto");
      const descricao = String(projeto.descricao || "");
      const imagem = String(projeto.imagem || "").trim();
      const link = urlValida(projeto.link);
      const card = criar("article", "portfolio-card");

      if (link) {
        const preview = criar("div", "portfolio-site-preview");
        const iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.title = `Prévia do site ${titulo}`;
        iframe.loading = "lazy";
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
        preview.append(iframe);
        card.append(preview);
      } else if (imagem) {
        const botao = criar("button", "portfolio-image-btn");
        botao.type = "button";
        botao.setAttribute("aria-label", `Ampliar imagem do projeto ${titulo}`);
        const img = document.createElement("img");
        img.src = imagem;
        img.alt = titulo;
        botao.append(img);
        botao.addEventListener("click", () => abrirImagem(imagem, titulo));
        card.append(botao);
      } else {
        card.append(criar("div", "portfolio-placeholder", "Projeto sem imagem"));
      }

      card.append(criar("h3", "", titulo));
      card.append(criar("p", "", descricao));

      if (link) {
        const actions = criar("div", "portfolio-site-actions");
        const abrir = criar("a", "btn btn-primary", "Abrir site");
        abrir.href = link;
        abrir.target = "_blank";
        abrir.rel = "noopener noreferrer";
        actions.append(abrir);
        card.append(actions);
      }

      grid.append(card);
    });
  }

  lightboxClose.addEventListener("click", fecharImagem);
  lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) fecharImagem();
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && lightbox.classList.contains("is-open")) fecharImagem();
  });

  renderizar();
})();
