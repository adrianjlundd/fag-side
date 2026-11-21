(() => {
  "use strict";
  let ready;
  window.visdatPageReady = new Promise(resolve => { ready = resolve; });
  let contentReady = Promise.resolve();
  const cg = window.CG || [],
    ip = window.IP || [];
  const chapters = [...cg, ...ip];
  const topics = new Map(chapters.map((ch) => [ch.slug, ch]));
  const view = document.querySelector("#sideinnhold");
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  const nb = new Intl.Collator("en", { sensitivity: "base" });
  const glossary = new Map();
  for (const ch of chapters) {
    for (const [word, definition] of Object.entries(ch.terms || {})) {
      const key = word.toLocaleLowerCase("en");
      const aliases = Object.entries(ch.termAliases || {}).filter(([, label]) => label === word).map(([original]) => original);
      if (!glossary.has(key)) glossary.set(key, { word, definition, ch, aliases });
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
      "<nav class=\"crumb\" aria-label=\"Breadcrumbs\"><a href=\"./\">Course home</a> / <span>" +
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
      examPromise = fetch("kilder/eksamen.en.json").then((response) => {
        if (!response.ok) throw Error("HTTP " + response.status);
        return response.json();
      });
    return examPromise;
  }
  function examError(el) {
    el.textContent =
      "The question register could not be loaded. Open the site through a local HTTP server or GitHub Pages and try again.";
  }
  function showChapter() {
    const ch = topics.get(params.get("k") || chapters[0]?.slug);
    if (!ch) {
      view.innerHTML =
        crumbs("Unknown chapter") +
        "<p>The chapter was not found. <a href=\"./#pensum\">Open the syllabus overview</a>.</p>";
      return;
    }
    const index = chapters.indexOf(ch),
      group = cg.includes(ch) ? "Computer Graphics" : "Image Processing";
    const foundations = {
      scenegrafer: ["transformasjoner", "rekkefolge"],
      kamera: ["scenegrafer", "referanse"],
      klipping: ["kamera", "perspektiv"],
      rasterisering: ["klipping", "polygon"],
      farge: ["intensitet", "bildedannelse"],
      lys: ["farge", "modeller"],
      filtrering: ["intensitet", "punktoperator"],
      frekvens: ["filtrering", "kjerne"],
      segmentering: ["filtrering", "derivasjon"],
      morfologi: ["segmentering", "regionvekst"],
      "nevrale-nett": ["intensitet", "bildedannelse"],
      cnn: ["nevrale-nett", "forover"],
      transformer: ["nevrale-nett", "forover"],
    };
    const required = foundations[ch.slug];
    const foundation = required && topics.get(required[0]);
    const preparation = foundation
      ? "<p>Prerequisite: <a href=\"" + topicLink(foundation, required[1]) + '">' +
        escape(foundation.sections.find(section => section.id === required[1]).title) + '</a>.</p>'
      : "";
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
      ["fokus", "Exam focus"],
      ...ch.sections.map((s) => [s.id, s.title]),
      ["eksamensoppgaver", "Past exam questions"],
      ["prov", "Try it yourself"],
    ];
    view.innerHTML =
      crumbs(group) +
      header(group, ch.title, ch.intro) +
      "<div class=\"layout\"><div class=\"reading\"><section id=\"fokus\" class=\"focus\"><h2>Exam focus</h2><ul>" +
      ch.focus.map((f) => "<li>" + escape(f) + "</li>").join("") +
      "</ul>" + preparation + "</section>" +
      "<p class=\"page-note\">Number notation: examples retain the originals’ decimal commas and semicolons between components. Some supplementary examples use decimal points.</p>" +
      sections +
      "<section id=\"eksamensoppgaver\"><h2>Past exam questions</h2><div id=\"exam-refs\" aria-live=\"polite\">Loading question references …</div></section>" +
      "<section class=\"exercise\" id=\"prov\"><p class=\"eyebrow\">NEW PRACTICE EXERCISE</p><h2>Try it yourself</h2><div>" +
      ch.question +
      "</div>" +
      reveal("Hint", ch.hint) +
      reveal("Show answer", ch.answer, "Our proposed solution") +
      "</section>" +
      "<nav class=\"chapter-nav\" aria-label=\"Read on\">" +
      (index
        ? '<a href="' +
          topicLink(chapters[index - 1]) +
          "\">Previous chapter</a>"
        : "<a href=\"./#pensum\">Syllabus overview</a>") +
      (index < chapters.length - 1
        ? '<a href="' +
          topicLink(chapters[index + 1]) +
          "\">Next chapter · " +
          escape(chapters[index + 1].title) +
          "</a>"
        : "<a href=\"eksamen.html\">Go to exam practice</a>") +
      "</nav></div>" +
      "<aside class=\"sidebar\"><h2>In this chapter</h2><ul>" +
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
    contentReady = loadExam()
      .then((rows) => {
        const selected = rows.filter((row) => row.kapittel === ch.slug);
        for (const section of ch.sections) {
          const related = selected.filter(row => row.anker === section.id);
          if (!related.length) continue;
          const links = related.map(row => '<a href="' + examLink(row) + '">' +
            escape(row.id) + '</a>').join(" · ");
          document.getElementById(section.id).insertAdjacentHTML("beforeend",
            "<details><summary>Practise with past exam questions (" +
            related.length + ')</summary><p>' + links + '</p></details>');
        }
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
          : "<p>This chapter follows the H26 plan. Practise with the exercise below.</p>";
        const from = params.get("fra");
        if (rows.some((q) => q.id === from) || from === "trening-" + ch.slug) {
          const mode = params.get("treningsform");
          const values = { id: from, k: params.get("treningstema") };
          if (mode === "2024" || mode === "2025") values.aar = mode;
          else values.modus = mode === "varianter" ? "varianter" : "tema";
          document.querySelector("#return").innerHTML =
            '<a class="button" href="' +
            url("eksamen.html", values) +
            "\">Back to the question</a>";
        }
        scrollToHash();
      })
      .catch(() => examError(refs));
  }
  function scrollToHash() {
    if (location.hash)
      document
        .getElementById(decodeURIComponent(location.hash.slice(1)))
        ?.scrollIntoView({behavior: "instant", block: "start"});
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
    close.setAttribute("aria-label", "Close definition");
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
      const originalWord = term.dataset.term || term.textContent.trim();
      const word = ch.termAliases?.[originalWord] || originalWord;
      const def =
        ch.terms[word] ||
        glossary.get(word.toLocaleLowerCase("en"))?.definition;
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
      crumbs("Glossary") +
      header(
        "REFERENCE",
        "Glossary",
        "Look up a definition and open the chapter that uses the term.",
      ) +
      "<label for=\"term-search\">Search terms and definitions</label><br><input class=\"search\" type=\"search\" id=\"term-search\" placeholder=\"Enter a technical term\"><div class=\"glossary-entries\" id=\"entries\" aria-live=\"polite\"></div>";
    function filter() {
      const query = document
        .querySelector("#term-search")
        .value.toLocaleLowerCase("en")
        .trim();
      const matches = entries.filter((e) =>
        (e.word + " " + e.definition + " " + e.aliases.join(" ")).toLocaleLowerCase("en").includes(query),
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
          .join("") || "<p>No terms match your search.</p>";
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
      ["2024", "Autumn 2024"],
      ["2025", "Autumn 2025"],
      ["tema", "Practise by topic"],
      ["varianter", "Our practice variants"],
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
      crumbs("Exam practice") +
      header(
        "QUESTION BANK",
        "Exam practice",
        "Choose an exam paper to follow its original order, or focus on one topic. All proposed solutions are initially hidden.",
      ) +
      "<div class=\"practice-shell\"><div class=\"filters\"><label for=\"mode\">Practice mode<select id=\"mode\">" +
      options(allModes, mode) +
      "</select></label><label for=\"topic\">Topic<select id=\"topic\">" +
      options(
        [["", "All topics"], ...chapters.map((ch) => [ch.slug, ch.title])],
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
        "<p class=\"page-note\">There are no registered exam questions in this selection. <a href=\"" +
        url("eksamen.html", { modus: "varianter", k: topic }) +
        "\">Try one of our practice exercises</a>.</p>";
      return;
    }
    const ch = topics.get(q.kapittel);
    const variantOnly = mode === "varianter" || q.chapterExercise;
    const anchor = q.chapterExercise ? "prov" : q.anker;
    const points =
      q.poeng != null
        ? q.poeng + " points"
        : q.oppgavepoeng != null
          ? q.oppgavepoeng + " points for the whole question no. " + q.nummer
          : "";
    let card;
    if (q.chapterExercise) {
      card =
        "<p class=\"eyebrow\">NEW PRACTICE EXERCISE</p><h2>" +
        escape(ch.title) +
        "</h2><div>" +
        ch.question +
        "</div>" +
        reveal("Hint", ch.hint) +
        reveal("Show answer", ch.answer, "Our proposed solution");
    } else {
      card =
        '<p class="eyebrow">' +
        (variantOnly ? "NEW PRACTICE VARIANT" : "PAST EXAM QUESTION") +
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
          "<p>Use the original paper for the question wording and any figures.</p>" +
          source(q.kilde) +
          '<p class="source">' +
          escape(q.svarstatus) +
          "</p>" +
          reveal(
            "Show answer to the original question",
            escape(q.originalSvar) + source(q.fasitkilde),
            q.svarstatus,
          );
      }
      card +=
        "<p class=\"variant-title\">Our practice variant</p><p>" +
        escape(q.variant) +
        "</p>" +
        reveal(
          "Show answer",
          escape(q.losning),
          "Our proposed solution to the variant",
        );
    }
    container.innerHTML =
      "<label for=\"pick\">Question " +
      (current + 1) +
      " of " +
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
          "\">Read the explanation · " +
          escape(ch.title) +
          "</a></p>"
        : "") +
      "</article><nav class=\"chapter-nav\" aria-label=\"Browse questions\"><span id=\"prev\"></span><span id=\"next\"></span></nav>";
    document.querySelector("#pick").onchange = (e) =>
      change(mode, topic, e.target.value);
    [
      [current - 1, "prev", "Previous question"],
      [current + 1, "next", "Next question"],
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
      crumbs("Sources") +
      header(
        "TDT4195 · AUTUMN 2026",
        "Syllabus and sources",
        "The course information defines learning outcomes. The lecture plans specify the methods and book sections belonging to this semester.",
      ) +
      "<div class=\"sources\"><h2>What should you be able to do?</h2><p>Explain principles and algorithms in basic image synthesis and image analysis, and use tools for graphics and image-processing programming. The specific calculation and drawing skills under Exam focus are our interpretations of the plans, teaching material and past questions.</p>" +
      source("course_information.txt · «Faglig innhold» (Course content) and «Læringsutbytte» (Learning outcomes)") +
      "<h2>Computer Graphics</h2><p>The reading path leads from points and coordinate systems to cameras, visibility and the final image. Each chapter references relevant CGVIZ slides and sections of Graphics &amp; Visualization.</p>" +
      source("lecture_plan_CG.txt · 17 August–28 September 2026") +
      "<h2>Image Processing</h2><p>The slides constitute the IP syllabus. Gonzalez and Woods, Digital Image Processing, 4th edition, support the classical methods. The plan links deep learning to Understanding Deep Learning, chapters 4, 10 and 12, and the lecture examples on FCNN, CNN and ViT.</p>" +
      source(
        "lecture_plan_IP.txt · «Link between lecture slides and the relevant books»",
      ) +
      "<h2>Basis of the exercises</h2><p>The 2024 and 2025 exams each have a NoAnswers file and an answer file. Practice references specify PDF page and question number. Our exercises use new numbers and our own explanations. The topic priorities for H26 are an educational judgement.</p><ul><li><a href=\"dokument.html?d=eksamensanalyse\">Read the exam analysis</a></li><li><a href=\"dokument.html?d=pensumdekning\">Syllabus coverage and learning objectives</a></li><li><a href=\"kilder/eksamen.en.json\">Open the question register (JSON)</a></li></ul></div>";
  }
  // The two public source documents share the site's language control. Their
  // raw Markdown files remain available as downloads with their original URLs.
  function renderMarkdown(markdown) {
    function inline(value) {
      const tokens = [];
      const protectedText = value.replace(/`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g, (match, code, label, target) => {
        let href = target;
        if (target && !/^https?:/.test(target)) {
          const documentLink = target.match(/^(eksamensanalyse|pensumdekning)(?:\.en)?\.md$/);
          href = documentLink ? url('dokument.html', {d: documentLink[1]})
            : target.startsWith('../') ? target.slice(3) : 'kilder/' + target;
        }
        const content = code !== undefined ? '<code>' + escape(code) + '</code>'
          : /^(?:https?:|\.\.?\/|[\w-]+\.)/.test(target)
            ? '<a href="' + escape(href) + '">' + escape(label) + '</a>' : escape(label);
        tokens.push(content);
        return '\u0001' + (tokens.length - 1) + '\u0002';
      });
      return escape(protectedText).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\u0001(\d+)\u0002/g, (_, index) => tokens[index]);
    }
    const lines = markdown.split(/\r?\n/);
    let output = '', heading = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const title = line.match(/^(#{1,3}) (.*)$/);
      if (title) {
        output += '<h' + title[1].length + ' id="doc-section-' + heading++ + '">' + inline(title[2]) + '</h' + title[1].length + '>';
      } else if (line.startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].trim());
        i--;
        output += "<div class=\"table-scroll\" tabindex=\"0\" role=\"region\" aria-label=\"Source table\"><table>";
        rows.forEach((row, index) => {
          if (/^\|[\s:|-]+\|$/.test(row)) return;
          const tag = index === 0 ? 'th' : 'td';
          output += '<tr>' + row.slice(1,-1).split('|').map(cell => '<' + tag + (tag === 'th' ? ' scope="col"' : '') + '>' + inline(cell.trim()) + '</' + tag + '>').join('') + '</tr>';
        });
        output += '</table></div>';
      } else if (line.startsWith('- ')) {
        output += '<ul>';
        while (i < lines.length && lines[i].trim().startsWith('- ')) output += '<li>' + inline(lines[i++].trim().slice(2)) + '</li>';
        i--; output += '</ul>';
      } else {
        let paragraph = line;
        while (i+1 < lines.length && lines[i+1].trim() && !/^(?:#|\||- )/.test(lines[i+1].trim())) paragraph += ' ' + lines[++i].trim();
        output += '<p>' + inline(paragraph) + '</p>';
      }
    }
    return output;
  }
  async function showDocument() {
    const slug = params.get('d');
    if (!['eksamensanalyse','pensumdekning'].includes(slug)) {
      view.innerHTML = crumbs("Sources") + "<p>Unknown source document.</p>";
      return;
    }
    const filename = 'kilder/' + slug + '.en.md';
    const response = await fetch(filename);
    if (!response.ok) throw Error('HTTP ' + response.status);
    const content = await response.text();
    view.innerHTML = crumbs("Sources") + '<p><a href="' + filename + "\">Download Markdown</a></p><article class=\"source-document\">" + renderMarkdown(content) + '</article>';
    document.title = view.querySelector('h1').textContent + ' · Visdat TDT4195';
    scrollToHash();
  }
  if (page === "home")
    document.querySelector("#tracks").innerHTML =
      track(
        cg,
        "CG",
        "Computer Graphics",
        "Build an image from points, surfaces and light.",
      ) +
      track(
        ip,
        "IP",
        "Image Processing",
        "Extract information from pixels and patterns.",
      );
  if (page === "chapter") showChapter();
  if (page === "glossary") showGlossary();
  if (page === "sources") showSources();
  if (page === "source-document") contentReady = showDocument().catch(() => examError(view));
  if (page === "practice")
    contentReady = loadExam()
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
  contentReady.finally(ready);
})();
