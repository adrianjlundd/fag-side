/* Alle figurene beregnes lokalt fra koordinater og pikselverdier. */
(() => {
  "use strict";
  function drawing(canvas, draw) {
    const paint = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.width * ratio));
      canvas.height = Math.max(1, Math.round(box.height * ratio));
      const ctx = canvas.getContext("2d");
      ctx.scale(ratio, ratio);
      draw(ctx, box.width, box.height);
    };
    new ResizeObserver(paint).observe(canvas);
    paint();
    return paint;
  }
  function line(ctx, a, b, color, width = 1) {
    ctx.beginPath();
    ctx.moveTo(...a);
    ctx.lineTo(...b);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function heightfield() {
    const canvas = document.querySelector("#heightfield");
    if (!canvas) return;
    const slider = document.querySelector("#sampler");
    const draw = drawing(canvas, (ctx, w, h) => {
      const n = Number(slider.value);
      document.querySelector("#samplevalue").textContent = n + " × " + n;
      const project = (x, y, z) => [
        w * (0.5 + 0.215 * x - 0.215 * y),
        h * (0.62 + 0.135 * x + 0.135 * y - 0.47 * z),
      ];
      for (let i = -5; i <= 5; i++) {
        const v = i / 5;
        line(ctx, project(v, -1.16, 0), project(v, 1.16, 0), "#426059", 0.65);
        line(ctx, project(-1.16, v, 0), project(1.16, v, 0), "#426059", 0.65);
      }
      function point(i, j) {
        const x = (2 * i) / (n - 1) - 1,
          y = (2 * j) / (n - 1) - 1;
        const peak = (cx, cy, k) =>
          Math.exp(-k * ((x - cx) ** 2 + (y - cy) ** 2));
        const z =
          1.02 * peak(-0.33, -0.2, 4.5) +
          0.64 * peak(0.45, 0.18, 9) -
          0.15 * peak(-0.1, 0.62, 9);
        return { p: project(x, y, z), z };
      }
      for (let i = 0; i < n - 1; i++)
        for (let j = 0; j < n - 1; j++) {
          const a = point(i, j),
            b = point(i + 1, j),
            c = point(i + 1, j + 1),
            d = point(i, j + 1);
          const light = Math.min(1, Math.max(0, (a.z + b.z + c.z + d.z) / 4));
          const tone = Math.round(27 + light * 68);
          ctx.fillStyle =
            "rgb(" +
            Math.round(tone * 0.81) +
            "," +
            Math.round(tone + 26) +
            "," +
            Math.round(45 + light * 28) +
            ")";
          ctx.beginPath();
          ctx.moveTo(...a.p);
          [b, c, d].forEach((v) => ctx.lineTo(...v.p));
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle =
            "rgba(" +
            Math.round(143 + 90 * light) +
            "," +
            Math.round(193 + 48 * light) +
            ",139,.79)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
          line(ctx, a.p, c.p, "rgba(206,239,145,.33)", 0.55);
        }
      ctx.font = "12px Consolas, monospace";
      ctx.fillStyle = "#cbdec9";
      [
        [1.18, 1.11, "x"],
        [-1.12, 1.17, "y"],
      ].forEach(([x, y, label]) => {
        const [px, py] = project(x, label === "x" ? -0.95 : y, 0);
        ctx.fillText(label, px, py + 12);
      });
    });
    slider.addEventListener("input", draw);
  }
  function thumbnail(canvas) {
    drawing(canvas, (ctx, w, h) => {
      if (canvas.dataset.track === "CG") {
        const p = (x, y, z) => [
          w * (0.51 + 0.23 * x - 0.2 * y),
          h * (0.5 + 0.13 * x + 0.1 * y - 0.28 * z),
        ];
        for (const z of [-0.9, 0.9])
          for (const k of [-0.9, 0.9]) {
            line(ctx, p(k, -0.9, z), p(k, 0.9, z), "#37674b", 1.3);
            line(ctx, p(-0.9, k, z), p(0.9, k, z), "#37674b", 1.3);
            line(ctx, p(k, z, -0.9), p(k, z, 0.9), "#37674b", 1.3);
          }
      } else {
        const size = Math.min(w, h) / 8;
        for (let y = 0; y < 7; y++)
          for (let x = 0; x < 9; x++) {
            const n =
              (Math.sin(x * 0.8 + y * 0.6) + Math.cos(x * 0.4 - y * 0.85) + 2) /
              4;
            ctx.fillStyle = "rgba(130,82,42," + (0.13 + n * 0.82) + ")";
            ctx.fillRect(
              x * size + (w - 9 * size) / 2,
              y * size + (h - 7 * size) / 2,
              size - 1.4,
              size - 1.4,
            );
          }
      }
    });
  }
  function transform(widget) {
    widget.innerHTML =
      '<h3>Prøv matriserekkefølgen</h3><p>Den grå trekanten starter med hjørnet P = (1, 1). Flytt langs x og roter om origo. Den grønne trekanten viser resultatet.</p><canvas style="aspect-ratio:1.75" role="img" aria-label="Trekanter i et koordinatsystem med x mot høyre og y opp"></canvas><div class="controls"><label>Rotasjon <select class="angle"><option>0</option><option selected>90</option><option>180</option><option>270</option></select> °</label><label>Flytting <input class="shift" type="range" min="-3" max="3" value="2"></label><label>Rekkefølge <select class="order"><option value="tr">Roter, så flytt</option><option value="rt">Flytt, så roter</option></select></label></div><output aria-live="polite"></output>';
    const draw = drawing(widget.querySelector("canvas"), (ctx, w, h) => {
      const degrees = Number(widget.querySelector(".angle").value);
      const shift = Number(widget.querySelector(".shift").value);
      const tr = widget.querySelector(".order").value === "tr";
      const cos = Math.round(Math.cos((degrees * Math.PI) / 180)),
        sin = Math.round(Math.sin((degrees * Math.PI) / 180));
      const rotate = ([x, y]) => [cos * x - sin * y, sin * x + cos * y];
      const move = ([x, y]) => [x + shift, y];
      const vertices = [
          [1, 1],
          [3, 1],
          [1, 2],
        ],
        changed = vertices.map((p) => (tr ? move(rotate(p)) : rotate(move(p))));
      const step = Math.min(w / 14, h / 14),
        center = [w / 2, h / 2];
      const px = ([x, y]) => [center[0] + x * step, center[1] - y * step];
      for (let k = -6; k <= 6; k++) {
        line(
          ctx,
          px([k, -6]),
          px([k, 6]),
          k ? "#d0dcd1" : "#587065",
          k ? 1 : 1.4,
        );
        line(
          ctx,
          px([-6, k]),
          px([6, k]),
          k ? "#d0dcd1" : "#587065",
          k ? 1 : 1.4,
        );
      }
      function triangle(v, fill, stroke, label) {
        ctx.beginPath();
        ctx.moveTo(...px(v[0]));
        v.slice(1).forEach((p) => ctx.lineTo(...px(p)));
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = stroke;
        const [x, y] = px(v[0]);
        ctx.fillText(label, x + 4, y + 14);
      }
      ctx.font = "12px Consolas, monospace";
      triangle(vertices, "#828c882c", "#556963", "P");
      triangle(changed, "#6aa56c55", "#236e46", "P′");
      const first = tr ? rotate(vertices[0]) : move(vertices[0]);
      widget.querySelector("output").textContent =
        "tₓ = " +
        shift +
        " · P = (1, 1) → (" +
        first.join(", ") +
        ") → P′ = (" +
        changed[0].join(", ") +
        "). Med kolonnevektorer: " +
        (tr ? "P′ = T · R · P" : "P′ = R · T · P") +
        ".";
    });
    widget.addEventListener("input", draw);
  }
  function filter(widget) {
    const image = [
      [1, 2, 4],
      [3, 5, 7],
      [4, 6, 9],
    ];
    widget.innerHTML =
      '<h3>Flytt filteret til kanten</h3><p>Inndata er et gråtonebilde på 3 × 3. Velg sentrum for å se hvilke verdier den vannrette kjernen bruker.</p><div class="kernel-grid" aria-label="Pikselverdier radvis"></div><p>Kjerne fra venstre mot høyre: [−1, 0, 1]</p><div class="controls"><label>Piksel <select class="pos"><option value="1">Midten</option><option value="0">Venstre kant</option><option value="2">Høyre kant</option></select></label><label>Operasjon <select class="op"><option>Korrelasjon</option><option>Konvolusjon</option></select></label><label>Utenfor bildet <select class="edge"><option>Nullutfylling</option><option>Gjenta kantpiksel</option></select></label></div><output aria-live="polite"></output>';
    image.flat().forEach((v) => {
      const cell = document.createElement("span");
      cell.textContent = v;
      widget.querySelector(".kernel-grid").append(cell);
    });
    function update() {
      const col = Number(widget.querySelector(".pos").value);
      const kernel = widget.querySelector(".op").selectedIndex
        ? [1, 0, -1]
        : [-1, 0, 1];
      const sample = (c) =>
        image[1][c] ??
        (widget.querySelector(".edge").selectedIndex
          ? image[1][Math.max(0, Math.min(2, c))]
          : 0);
      const samples = [sample(col - 1), sample(col), sample(col + 1)];
      const sum = samples.reduce((s, v, i) => s + v * kernel[i], 0);
      widget
        .querySelectorAll(".kernel-grid span")
        .forEach((cell, i) => cell.classList.toggle("active", i === 3 + col));
      widget.querySelector("output").textContent =
        samples.map((v, i) => "(" + kernel[i] + ") × " + v).join(" + ") +
        " = " +
        sum +
        ".";
    }
    widget.addEventListener("change", update);
    update();
  }
  function attention(widget) {
    widget.innerHTML =
      '<h3>Fordel oppmerksomheten</h3><p>To tokener har verdiene 2 og 8. Den første skåren er 0. Endre den andre skåren og se hvordan softmax vekter verdiene for én query.</p><label>Skår for token 2 <input type="range" min="-3" max="3" step="0.25" value="0"></label><div class="weights" aria-hidden="true"><span></span><span></span></div><output aria-live="polite"></output>';
    const slider = widget.querySelector("input");
    const format = (n) =>
      n.toLocaleString("nb-NO", { maximumFractionDigits: 3 });
    function update() {
      const score = Number(slider.value);
      const w1 = 1 / (1 + Math.exp(score)),
        w2 = 1 - w1;
      const bars = widget.querySelectorAll(".weights span");
      bars[0].style.flexGrow = w1;
      bars[1].style.flexGrow = w2;
      widget.querySelector("output").textContent =
        "Skårer [0, " +
        format(score) +
        "]. Vekter [" +
        format(w1) +
        "; " +
        format(w2) +
        "]. Ny verdi ≈ " +
        format(w1) +
        " × 2 + " +
        format(w2) +
        " × 8 = " +
        format(w1 * 2 + w2 * 8) +
        ".";
    }
    slider.addEventListener("input", update);
    update();
  }
  function morphology(widget) {
    const pixels = [0, 1, 1, 1, 0, 1, 0];
    widget.innerHTML = '<h3>Test et asymmetrisk strukturelement</h3>' +
      '<p>Endre inngangsraden ved å trykke på pikslene. Indeksene går fra 0 til 6. ' +
      'Elementet B = {0, 1} er forankret til venstre, og utenfor raden er verdien null.</p>' +
      '<div class="pixel-row" aria-label="Inngang"></div>' +
      '<label>Operasjon <select><option value="erosion">Erosjon</option>' +
      '<option value="dilation">Dilasjon</option></select></label>' +
      '<p>Forutsi hvilke posisjoner som blir 1, og åpne resultatet.</p>' +
      '<details><summary>Se resultat</summary><output aria-live="polite"></output></details>';
    const input = widget.querySelector(".pixel-row");
    const operation = widget.querySelector("select");
    function update() {
      const erosion = operation.value === "erosion";
      const result = pixels.map((value, index) => erosion
        ? Math.min(value, pixels[index + 1] ?? 0)
        : Math.max(value, pixels[index - 1] ?? 0));
      widget.querySelector("output").textContent = result.join("  ") + (erosion
        ? " · Ved i må både i og i + 1 være på."
        : " · Ved i holder det med forgrunn i i eller i − 1.");
      widget.querySelector("details").open = false;
    }
    pixels.forEach((value, index) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.textContent = value;
      cell.setAttribute("aria-label", "Inngangspiksel " + index);
      cell.setAttribute("aria-pressed", Boolean(value));
      cell.onclick = () => {
        pixels[index] = 1 - pixels[index];
        cell.textContent = pixels[index];
        cell.setAttribute("aria-pressed", Boolean(pixels[index]));
        update();
      };
      input.append(cell);
    });
    operation.addEventListener("change", update);
    update();
  }
  window.visdatFigures = () => {
    heightfield();
    document.querySelectorAll("canvas[data-track]").forEach(thumbnail);
    document.querySelectorAll("[data-demo]").forEach((widget) => {
      widget.classList.add("widget");
      if (widget.dataset.demo === "transformasjon") transform(widget);
      if (widget.dataset.demo === "filter") filter(widget);
      if (widget.dataset.demo === "morfologi") morphology(widget);
      if (widget.dataset.demo === "oppmerksomhet") attention(widget);
    });
  };
})();
