(() => {
  "use strict";
  const cg = window.CG || [],
    ip = window.IP || [];
  const chapters = [...cg, ...ip];
  const topics = new Map(chapters.map((ch) => [ch.slug, ch]));
  const view = document.querySelector("#sideinnhold");
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  const nb = new Intl.Collator("nb", { sensitivity: "base" });
  const glossary = new Map();
  for (const ch of chapters) {
    for (const [word, definition] of Object.entries(ch.terms || {})) {
      const key = word.toLocaleLowerCase("nb");
      if (!glossary.has(key)) glossary.set(key, { word, definition, ch });
    }
  }
  function escape(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function url(file, values = {}, anchor = "") {
    const q = new URLSearchParams();
    Object.entries(values).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    return (
      file +
      (q.size ? "?" + q : "") +
      (anchor ? "#" + encodeURIComponent(anchor) : "")
    );
  }
  function topicLink(ch, anchor, from) {
    return url(
      "tema.html",
      {
        k: ch.slug,
        fra: from,
        treningsform: from
          ? params.get("aar") || params.get("modus") || "tema"
          : "",
        treningstema: from ? params.get("k") : "",
      },
      anchor,
    );
  }
  function examLink(q) {
    return url("eksamen.html", { aar: q.aar, id: q.id });
  }
  function crumbs(current) {
    return (
      '<nav class="crumb" aria-label="Brødsmulesti"><a href="./">Fagforsiden</a> / <span>' +
      escape(current) +
      "</span></nav>"
    );
  }
  function header(kicker, title, intro) {
    return (
      '<header class="page-head"><p class="eyebrow">' +
      escape(kicker) +
      "</p><h1>" +
      escape(title) +
      "</h1><p>" +
      escape(intro) +
      "</p></header>"
    );
  }
  function reveal(label, body, kind) {
    return (
      "<details><summary>" +
      escape(label) +
      '</summary><div class="reveal">' +
      (kind ? "<b>" + escape(kind) + "</b><br>" : "") +
      body +
      "</div></details>"
    );
  }
  function source(text) {
    return '<p class="source">' + escape(text) + "</p>";
  }
  function track(list, group, title, description) {
    const items = list
      .map(
        (ch, i) =>
          '<li><a href="' +
          topicLink(ch) +
          '"><span class="num">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          escape(ch.title) +
          "</a></li>",
      )
      .join("");
    return (
      '<article class="track ' +
      group.toLowerCase() +
      '"><div class="track-head"><div><h3>' +
      title +
      "</h3><p>" +
      description +
      '</p></div><canvas data-track="' +
      group +
      '" aria-hidden="true"></canvas></div><ol class="chapter-list">' +
      items +
      "</ol></article>"
    );
  }
  let examPromise;
  function loadExam() {
    if (!examPromise)
      examPromise = fetch("kilder/eksamen.json").then((response) => {
        if (!response.ok) throw Error("HTTP " + response.status);
        return response.json();
      });
    return examPromise;
  }
  function examError(el) {
    el.textContent =
      "Oppgaveregisteret kunne ikke lastes. Åpne siden via en lokal HTTP-server eller GitHub Pages og prøv igjen.";
  }
  function showChapter() {
    const ch = topics.get(params.get("k") || chapters[0]?.slug);
    if (!ch) {
      view.innerHTML =
        crumbs("Ukjent kapittel") +
        '<p>Fant ikke kapitlet. <a href="./#pensum">Åpne pensumoversikten</a>.</p>';
      return;
    }
    const index = chapters.indexOf(ch),
      group = cg.includes(ch) ? "Computer Graphics" : "Image Processing";
    document.title = ch.title + " · Visdat TDT4195";
    const sections = ch.sections
      .map(
        (s) =>
          '<section id="' +
          escape(s.id) +
          '"><h2>' +
          escape(s.title) +
          "</h2>" +
          s.html +
          source(s.source) +
          "</section>",
      )
      .join("");
    const navItems = [
      ["fokus", "Eksamensfokus"],
      ...ch.sections.map((s) => [s.id, s.title]),
      ["eksamensoppgaver", "Tidligere oppgaver"],
      ["prov", "Prøv selv"],
    ];
    view.innerHTML =
      crumbs(group) +
      header(group, ch.title, ch.intro) +
      '<div class="layout"><div class="reading"><section id="fokus" class="focus"><h2>Eksamensfokus</h2><ul>' +
      ch.focus.map((f) => "<li>" + escape(f) + "</li>").join("") +
      "</ul></section>" +
      sections +
      '<section id="eksamensoppgaver"><h2>Tidligere oppgaver</h2><div id="exam-refs" aria-live="polite">Henter oppgavereferanser …</div></section>' +
      '<section class="exercise" id="prov"><p class="eyebrow">NY TRENINGSOPPGAVE</p><h2>Prøv selv</h2><div>' +
      ch.question +
      "</div>" +
      reveal("Hint", ch.hint) +
      reveal("Se svar", ch.answer, "Eget løsningsforslag") +
      "</section>" +
      '<nav class="chapter-nav" aria-label="Les videre">' +
      (index
        ? '<a href="' +
          topicLink(chapters[index - 1]) +
          '">Forrige kapittel</a>'
        : '<a href="./#pensum">Pensumoversikt</a>') +
      (index < chapters.length - 1
        ? '<a href="' +
          topicLink(chapters[index + 1]) +
          '">Neste kapittel · ' +
          escape(chapters[index + 1].title) +
          "</a>"
        : '<a href="eksamen.html">Gå til eksamenstrening</a>') +
      "</nav></div>" +
      '<aside class="sidebar"><h2>I dette kapitlet</h2><ul>' +
      navItems
        .map(
          ([id, label]) =>
            '<li><a href="#' +
            encodeURIComponent(id) +
            '">' +
            escape(label) +
            "</a></li>",
        )
        .join("") +
      '</ul><div id="return"></div></aside></div>';
    wireTerms(ch);
    const refs = document.querySelector("#exam-refs");
    loadExam()
      .then((rows) => {
        const selected = rows.filter((row) => row.kapittel === ch.slug);
        refs.innerHTML = selected.length
          ? "<ul>" +
            selected
              .map(
                (q) =>
                  '<li><a href="' +
                  examLink(q) +
                  '">' +
                  escape(q.id) +
                  "</a> · " +
                  escape(q.ferdighet) +
                  "</li>",
              )
              .join("") +
            "</ul>"
          : "<p>Dette kapitlet følger H26-planen. Du kan øve med oppgaven nedenfor.</p>";
        const from = params.get("fra");
        if (rows.some((q) => q.id === from) || from === "trening-" + ch.slug) {
          const mode = params.get("treningsform");
          const values = { id: from, k: params.get("treningstema") };
          if (mode === "2024" || mode === "2025") values.aar = mode;
          else values.modus = mode === "varianter" ? "varianter" : "tema";
          document.querySelector("#return").innerHTML =
            '<a class="button" href="' +
            url("eksamen.html", values) +
            '">Tilbake til oppgaven</a>';
        }
        scrollToHash();
      })
      .catch(() => examError(refs));
  }
  function scrollToHash() {
    if (location.hash)
      document
        .getElementById(decodeURIComponent(location.hash.slice(1)))
        ?.scrollIntoView();
  }
  function wireTerms(ch) {
    let lastButton;
    const pop = document.createElement("aside");
    pop.className = "definition";
    pop.setAttribute("aria-live", "polite");
    pop.hidden = true;
    const title = document.createElement("strong"),
      definition = document.createElement("p"),
      close = document.createElement("button");
    close.type = "button";
    close.textContent = "×";
    close.setAttribute("aria-label", "Lukk definisjon");
    pop.append(title, definition, close);
    document.body.append(pop);
    function hide(restore) {
      pop.hidden = true;
      if (lastButton) {
        lastButton.setAttribute("aria-expanded", "false");
        if (restore) lastButton.focus();
      }
    }
    close.onclick = () => hide(true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !pop.hidden) hide(true);
    });
    document.addEventListener("click", (e) => {
      if (!pop.hidden && !pop.contains(e.target) && e.target !== lastButton)
        hide(false);
    });
    document.querySelectorAll("dfn").forEach((term) => {
      const word = term.dataset.term || term.textContent.trim();
      const def =
        ch.terms[word] ||
        glossary.get(word.toLocaleLowerCase("nb"))?.definition;
      if (!def) return;
      const button = document.createElement("button");
      button.className = "term";
      button.type = "button";
      button.textContent = term.textContent;
      button.setAttribute("aria-expanded", "false");
      term.replaceWith(button);
      button.onclick = () => {
        const wasOpen = !pop.hidden && lastButton === button;
        hide(false);
        if (wasOpen) return;
        lastButton = button;
        title.textContent = word;
        definition.textContent = def;
        pop.hidden = false;
        button.setAttribute("aria-expanded", "true");
      };
    });
  }
  function showGlossary() {
    const entries = [...glossary.values()].sort((a, b) =>
      nb.compare(a.word, b.word),
    );
    view.innerHTML =
      crumbs("Begreper") +
      header(
        "OPPSLAGSVERK",
        "Begreper",
        "Slå opp en definisjon og åpne kapitlet som bruker begrepet.",
      ) +
      '<label for="term-search">Søk i begreper og definisjoner</label><br><input class="search" type="search" id="term-search" placeholder="Skriv et fagbegrep"><div class="glossary-entries" id="entries" aria-live="polite"></div>';
    function filter() {
      const query = document
        .querySelector("#term-search")
        .value.toLocaleLowerCase("nb")
        .trim();
      const matches = entries.filter((e) =>
        (e.word + " " + e.definition).toLocaleLowerCase("nb").includes(query),
      );
      document.querySelector("#entries").innerHTML =
        matches
          .map(
            (e) =>
              '<article class="panel"><h2>' +
              escape(e.word) +
              "</h2><p>" +
              escape(e.definition) +
              '</p><a href="' +
              topicLink(e.ch) +
              '">' +
              escape(e.ch.title) +
              "</a></article>",
          )
          .join("") || "<p>Ingen begreper samsvarer med søket.</p>";
    }
    document.querySelector("#term-search").addEventListener("input", filter);
    filter();
  }
  function options(items, selected) {
    return items
      .map(
        ([value, label]) =>
          '<option value="' +
          escape(value) +
          '"' +
          (String(value) === String(selected) ? " selected" : "") +
          ">" +
          escape(label) +
          "</option>",
      )
      .join("");
  }
  function showPractice(rows) {
    const allModes = [
      ["2024", "Høst 2024"],
      ["2025", "Høst 2025"],
      ["tema", "Øv etter tema"],
      ["varianter", "Egne treningsvarianter"],
    ];
    const mode = params.get("aar") || params.get("modus") || "tema";
    const topic = params.get("k") || "";
    const selected = rows.filter(
      (r) =>
        (mode === "tema" || mode === "varianter" || String(r.aar) === mode) &&
        (!topic || r.kapittel === topic),
    );
    if (mode === "varianter") {
      chapters
        .filter((ch) => !topic || ch.slug === topic)
        .forEach((ch) =>
          selected.push({
            id: "trening-" + ch.slug,
            chapterExercise: true,
            ch,
            kapittel: ch.slug,
            tema: ch.title,
          }),
        );
    }
    const current = Math.max(
      0,
      selected.findIndex((q) => q.id === params.get("id")),
    );
    const q = selected[current];
    const change = (newMode, newTopic, id) => {
      location.href = url(
        "eksamen.html",
        /^20/.test(newMode)
          ? { aar: newMode, k: newTopic, id }
          : { modus: newMode, k: newTopic, id },
      );
    };
    view.innerHTML =
      crumbs("Eksamenstrening") +
      header(
        "OPPGAVEBANK",
        "Eksamenstrening",
        "Velg et eksamenssett for å følge original rekkefølge, eller konsentrer deg om ett tema. Alle løsningsforslag er skjult fra start.",
      ) +
      '<div class="practice-shell"><div class="filters"><label for="mode">Treningsform<select id="mode">' +
      options(allModes, mode) +
      '</select></label><label for="topic">Tema<select id="topic">' +
      options(
        [["", "Alle temaer"], ...chapters.map((ch) => [ch.slug, ch.title])],
        topic,
      ) +
      '</select></label></div><div id="exercise"></div></div>';
    document.querySelector("#mode").onchange = (e) =>
      change(e.target.value, "", "");
    document.querySelector("#topic").onchange = (e) =>
      change(mode, e.target.value, "");
    const container = document.querySelector("#exercise");
    if (!q) {
      container.innerHTML =
        '<p class="page-note">Ingen registrerte eksamensoppgaver i dette utvalget. <a href="' +
        url("eksamen.html", { modus: "varianter", k: topic }) +
        '">Prøv en egen treningsoppgave</a>.</p>';
      return;
    }
    const ch = topics.get(q.kapittel);
    const variantOnly = mode === "varianter" || q.chapterExercise;
    const anchor = q.chapterExercise ? "prov" : q.anker;
    const points =
      q.poeng != null
        ? q.poeng + " poeng"
        : q.oppgavepoeng != null
          ? q.oppgavepoeng + " poeng for hele nr. " + q.nummer
          : "";
    let card;
    if (q.chapterExercise) {
      card =
        '<p class="eyebrow">NY TRENINGSOPPGAVE</p><h2>' +
        escape(ch.title) +
        "</h2><div>" +
        ch.question +
        "</div>" +
        reveal("Hint", ch.hint) +
        reveal("Se svar", ch.answer, "Eget løsningsforslag");
    } else {
      card =
        '<p class="eyebrow">' +
        (variantOnly ? "NY TRENINGSVARIANT" : "TIDLIGERE EKSAMENSOPPGAVE") +
        "</p><h2>" +
        escape(q.tema) +
        '</h2><p class="meta">' +
        escape(q.id) +
        " · " +
        escape(q.del) +
        (points ? " · " + escape(points) : "") +
        "</p>";
      if (!variantOnly) {
        card +=
          "<p>Bruk originalarket for oppgavetekst og eventuelle figurer.</p>" +
          source(q.kilde) +
          '<p class="source">' +
          escape(q.svarstatus) +
          "</p>" +
          reveal(
            "Se svar til originaloppgaven",
            escape(q.originalSvar) + source(q.fasitkilde),
            q.svarstatus,
          );
      }
      card +=
        '<p class="variant-title">Egen treningsvariant</p><p>' +
        escape(q.variant) +
        "</p>" +
        reveal(
          "Se svar",
          escape(q.losning),
          "Eget løsningsforslag til varianten",
        );
    }
    container.innerHTML =
      '<label for="pick">Oppgave ' +
      (current + 1) +
      " av " +
      selected.length +
      '</label><br><select class="search" id="pick">' +
      options(
        selected.map((v) => [
          v.id,
          v.chapterExercise ? v.ch.title : v.id + " · " + v.tema,
        ]),
        q.id,
      ) +
      '</select><article class="reading panel practice-card">' +
      card +
      (ch
        ? '<p><a href="' +
          topicLink(ch, anchor, q.id) +
          '">Les forklaringen · ' +
          escape(ch.title) +
          "</a></p>"
        : "") +
      '</article><nav class="chapter-nav" aria-label="Bla i oppgaver"><span id="prev"></span><span id="next"></span></nav>';
    document.querySelector("#pick").onchange = (e) =>
      change(mode, topic, e.target.value);
    [
      [current - 1, "prev", "Forrige oppgave"],
      [current + 1, "next", "Neste oppgave"],
    ].forEach(([i, id, label]) => {
      if (!selected[i]) return;
      const link = document.createElement("a");
      link.className = "button";
      link.textContent = label;
      link.href = url(
        "eksamen.html",
        /^20/.test(mode)
          ? { aar: mode, k: topic, id: selected[i].id }
          : { modus: mode, k: topic, id: selected[i].id },
      );
      document.getElementById(id).append(link);
    });
  }
  function showSources() {
    view.innerHTML =
      crumbs("Kilder") +
      header(
        "TDT4195 · HØST 2026",
        "Pensum og kilder",
        "Emneinformasjonen gir læringsutbyttet. Forelesningsplanene avgrenser hvilke metoder og bokavsnitt som hører til semesteret.",
      ) +
      '<div class="sources"><h2>Hva skal du kunne?</h2><p>Forklare prinsipper og algoritmer i grunnleggende bildesyntese og bildeanalyse, og bruke verktøy til grafikk- og bildebehandlingsprogrammering. De konkrete regne- og tegneferdighetene under Eksamensfokus er våre presiseringer ut fra planer, fagstoff og tidligere oppgaver.</p>' +
      source("course_information.txt · «Faglig innhold» og «Læringsutbytte»") +
      "<h2>Computer Graphics</h2><p>Leserekkefølgen går fra punkter og koordinatsystemer til kamera, synlighet og det ferdige bildet. Hvert kapittel viser til aktuelle CGVIZ-slides og avsnitt fra Graphics &amp; Visualization.</p>" +
      source("lecture_plan_CG.txt · 17. august–28. september 2026") +
      "<h2>Image Processing</h2><p>Slidene utgjør IP-pensum. Gonzalez og Woods, Digital Image Processing, 4. utgave, gir støtte til de klassiske metodene. Planen kobler dyp læring til Understanding Deep Learning, kapittel 4, 10 og 12, og til forelesningseksemplene om FCNN, CNN og ViT.</p>" +
      source(
        "lecture_plan_IP.txt · «Link between lecture slides and the relevant books»",
      ) +
      '<h2>Grunnlaget for oppgavene</h2><p>Årgangene 2024 og 2025 har hver en NoAnswers-fil og en svarfil. Kildene er angitt med PDF-side og oppgavenummer i treningen. Egne oppgaver bruker nye tall og egne forklaringer. Vektingen av temaer for H26 er en faglig vurdering.</p><ul><li><a href="kilder/eksamensanalyse.md">Les eksamensanalysen (Markdown)</a></li><li><a href="kilder/eksamen.json">Åpne oppgaveregisteret (JSON)</a></li></ul></div>';
  }
  if (page === "home")
    document.querySelector("#tracks").innerHTML =
      track(
        cg,
        "CG",
        "Computer Graphics",
        "Bygg et bilde fra punkter, flater og lys.",
      ) +
      track(
        ip,
        "IP",
        "Image Processing",
        "Hent informasjon fra piksler og mønstre.",
      );
  if (page === "chapter") showChapter();
  if (page === "glossary") showGlossary();
  if (page === "sources") showSources();
  if (page === "practice")
    loadExam()
      .then(showPractice)
      .catch(() => examError(view));
  const active = {
    home: "./#pensum",
    glossary: "begreper.html",
    practice: "eksamen.html",
    chapter: "./#pensum",
  }[page];
  document.querySelectorAll(".mast nav a").forEach((a) => {
    if (a.getAttribute("href") === active)
      a.setAttribute("aria-current", "page");
  });
  window.visdatFigures();
})();
