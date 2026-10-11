(function () {
  "use strict";

  var canvas = document.getElementById("constellation");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");

  var GLOW_RADIUS = 250;
  var CONNECT_DIST = 120;
  var PARALLAX = 0.5;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touchPrimary =
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(pointer: fine)").matches;
  var interactive = !reducedMotion && !touchPrimary;

  var w = 0;
  var h = 0;
  var stars = [];
  var pairs = new Int32Array(0);
  var glowCur = new Float32Array(0);
  var mouseX = -1e5;
  var mouseY = -1e5;
  var rafId = 0;
  var running = false;
  var accent = "167, 139, 250";
  var vibrant = "255, 255, 255";

  function readAccent() {
    var hex = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim()
      .replace("#", "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.slice(0, 2), 16) || 255;
    var g = parseInt(hex.slice(2, 4), 16) || 255;
    var b = parseInt(hex.slice(4, 6), 16) || 255;
    accent = r + ", " + g + ", " + b;
    var m = 0.25;
    var vr = Math.round(r + (255 - r) * m);
    var vg = Math.round(g + (255 - g) * m);
    var vb = Math.round(b + (255 - b) * m);
    vibrant = vr + ", " + vg + ", " + vb;
  }

  function generate() {
    var count = Math.max(40, Math.min(110, Math.round((w * h) / 16000)));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.4,
        base: 0.3 + Math.random() * 0.15,
      });
    }

    var dist2 = CONNECT_DIST * CONNECT_DIST;
    var list = [];
    for (var a = 0; a < count; a++) {
      for (var b = a + 1; b < count; b++) {
        var dx = stars[a].x - stars[b].x;
        var dy = stars[a].y - stars[b].y;
        if (dx * dx + dy * dy < dist2) list.push(a, b);
      }
    }
    pairs = Int32Array.from(list);
    glowCur = new Float32Array(count);
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    generate();
  }

  function updateGlow(offY) {
    var R = GLOW_RADIUS;
    var R2 = R * R;
    var n = stars.length;
    for (var i = 0; i < n; i++) {
      var s = stars[i];
      var raw = s.y + offY;
      var p = raw - Math.floor(raw / h) * h;
      var dx = s.x - mouseX;
      var dy = p - mouseY;
      var d2 = dx * dx + dy * dy;
      var target = 0;
      if (d2 < R2) {
        var d = Math.sqrt(d2);
        var t = 1 - d / R;
        target = t * t * (3 - 2 * t);
      }
      var cur = glowCur[i];
      cur += (target - cur) * (target > cur ? 0.3 : 0.04);
      glowCur[i] = cur;
    }
  }

  function drawField(offY) {
    var n = stars.length;
    var i, s;

    var plen = pairs.length;
    ctx.lineWidth = 1;
    for (i = 0; i < plen; i += 2) {
      var ax = stars[pairs[i]].x;
      var ay = stars[pairs[i]].y + offY;
      var bx = stars[pairs[i + 1]].x;
      var by = stars[pairs[i + 1]].y + offY;
      if ((ax < 0 && bx < 0) || (ax > w && bx > w)) continue;
      if ((ay < 0 && by < 0) || (ay > h && by > h)) continue;
      var g = glowCur[pairs[i]];
      var g2 = glowCur[pairs[i + 1]];
      var maxg = g > g2 ? g : g2;
      ctx.strokeStyle = "rgba(255, 255, 255, " + (0.13 + maxg * 0.55).toFixed(3) + ")";
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = "lighter";
    for (i = 0; i < n; i++) {
      s = stars[i];
      var sy = s.y + offY;
      var glow = glowCur[i];
      if (glow <= 0.002) continue;
      if (sy < -40 || sy > h + 40) continue;
      var hr = s.r + 8 + glow * 26;
      var grad = ctx.createRadialGradient(s.x, sy, 0, s.x, sy, hr);
      grad.addColorStop(0, "rgba(" + vibrant + ", " + (0.85 * glow).toFixed(3) + ")");
      grad.addColorStop(0.25, "rgba(" + vibrant + ", " + (0.45 * glow).toFixed(3) + ")");
      grad.addColorStop(0.6, "rgba(" + vibrant + ", " + (0.15 * glow).toFixed(3) + ")");
      grad.addColorStop(1, "rgba(" + vibrant + ", 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, sy, hr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    for (i = 0; i < n; i++) {
      s = stars[i];
      var cy = s.y + offY;
      if (cy < -20 || cy > h + 20) continue;
      var cg = glowCur[i];
      ctx.fillStyle = "rgba(255, 255, 255, " + (s.base + cg * (1 - s.base)).toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(s.x, cy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    var offY = -(window.scrollY * PARALLAX) % h;
    updateGlow(offY);
    drawField(offY);
    if (offY !== 0) drawField(offY + h);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (running || !interactive || document.hidden) return;
    running = true;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    ctx.clearRect(0, 0, w, h);
  }

  function renderStatic() {
    ctx.clearRect(0, 0, w, h);
    mouseX = -1e5;
    mouseY = -1e5;
    glowCur.fill(0);
    drawField(0);
  }

  function isDark() {
    return document.documentElement.getAttribute("data-theme") !== "light";
  }

  function refresh() {
    if (!isDark()) {
      stop();
    } else if (interactive) {
      start();
    } else {
      renderStatic();
    }
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (!running && isDark()) renderStatic();
    }, 150);
  });

  function enableInteraction() {
    if (interactive || reducedMotion) return;
    interactive = true;
    if (isDark()) start();
  }

  if (window.PointerEvent) {
    window.addEventListener(
      "pointermove",
      function (e) {
        if (e.pointerType && e.pointerType !== "mouse") return;
        mouseX = e.clientX;
        mouseY = e.clientY;
        enableInteraction();
      },
      { passive: true }
    );

    window.addEventListener(
      "pointerout",
      function (e) {
        if (e.pointerType && e.pointerType !== "mouse") return;
        if (!e.relatedTarget) {
          mouseX = -1e5;
          mouseY = -1e5;
        }
      },
      { passive: true }
    );
  } else {
    window.addEventListener(
      "mousemove",
      function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        enableInteraction();
      },
      { passive: true }
    );

    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget) {
        mouseX = -1e5;
        mouseY = -1e5;
      }
    });
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stop();
    } else if (isDark() && interactive) {
      start();
    }
  });

  new MutationObserver(function () {
    readAccent();
    refresh();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  resize();
  readAccent();
  refresh();
})();
