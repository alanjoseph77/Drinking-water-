"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// PET bottle profile: [radius, y] in world units, base at y = -1.6.
const PROFILE: [number, number][] = [
  [0, -1.6], [0.34, -1.6], [0.44, -1.58], [0.52, -1.53], [0.56, -1.44], [0.565, -1.3], [0.54, -1.27], [0.565, -1.24],
  [0.565, 0.4], [0.54, 0.44], [0.565, 0.48], [0.56, 0.6], [0.53, 0.74], [0.46, 0.88], [0.36, 1.0], [0.26, 1.09],
  [0.2, 1.15], [0.19, 1.2], [0.19, 1.24], [0.235, 1.25], [0.235, 1.28], [0.19, 1.29], [0.19, 1.31],
];
const BOTTLE_H = 3.16; // world height incl. cap
const LABEL_TOP = 0.44; // label top as a fraction of bottle height, measured from the top
const LABEL_ASPECT = 2048 / 667; // sticker artwork width / height

/** Keeps the hero bottle positioned so the headline never covers the label (desktop only). */
function layoutHero(slot: HTMLElement) {
  const hero = document.getElementById("hero");
  const title = hero?.querySelector<HTMLElement>(".hero-title");
  const cue = hero?.querySelector<HTMLElement>(".scroll-cue");
  if (!hero || !title) return;
  if (window.innerWidth <= 820) {
    slot.style.top = slot.style.height = slot.style.transform = "";
    return;
  }
  const tb = title.offsetTop + title.offsetHeight + 14;
  const limit = (cue ? cue.offsetTop : hero.offsetHeight - 90) - 10;
  const h = Math.max(260, Math.min(hero.offsetHeight * 0.72, 640, (limit - tb) / (1 - LABEL_TOP)));
  slot.style.height = `${h}px`;
  slot.style.top = `${tb - LABEL_TOP * h}px`;
  slot.style.transform = "translateX(-50%)";
}

export function BottleStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heroSlot = document.getElementById("heroSlot");
    const prodSlot = document.getElementById("prodSlot");
    if (!canvas || !heroSlot || !prodSlot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { t: 0, intro: reduce ? 1 : 0 };
    let disposed = false;
    let raf = 0;
    const cleanups: (() => void)[] = [];

    const relayout = () => layoutHero(heroSlot);
    relayout();
    window.addEventListener("resize", relayout);
    cleanups.push(() => window.removeEventListener("resize", relayout));
    document.fonts?.ready.then(() => !disposed && relayout());

    // Scroll progress: 0 at the top of the page, 1 when the product frame is centred.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: () => {
          const c = prodSlot.closest("section") as HTMLElement;
          return Math.max(c.offsetTop + c.offsetHeight / 2 - window.innerHeight / 2, window.innerHeight * 0.6);
        },
        scrub: reduce ? true : 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.t = self.progress;
        },
      });
      if (!reduce) gsap.to(state, { intro: 1, duration: 1.8, delay: 1.5, ease: "power3.out" });
    });

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the static bottle image stays visible
      }
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
      camera.position.set(0, 0, 12);

      // Painted studio environment for reflections
      const ec = document.createElement("canvas");
      ec.width = 1024;
      ec.height = 512;
      const e = ec.getContext("2d")!;
      const eg = e.createLinearGradient(0, 0, 0, 512);
      eg.addColorStop(0, "#ffffff");
      eg.addColorStop(0.45, "#dfe3e6");
      eg.addColorStop(0.55, "#a2a8ad");
      eg.addColorStop(1, "#3d4146");
      e.fillStyle = eg;
      e.fillRect(0, 0, 1024, 512);
      e.fillStyle = "#ffffff";
      e.fillRect(110, 80, 80, 280);
      e.fillRect(610, 110, 50, 240);
      e.fillStyle = "rgba(255,255,255,.7)";
      e.fillRect(820, 60, 140, 120);
      const envTex = new THREE.CanvasTexture(ec);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      envTex.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromEquirectangular(envTex).texture;

      scene.add(new THREE.AmbientLight(0xffffff, 0.45 * Math.PI));
      const key = new THREE.DirectionalLight(0xffffff, 1.1 * Math.PI);
      key.position.set(4, 5, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xd6e8ff, 0.9 * Math.PI);
      rim.position.set(-5, 2, -4);
      scene.add(rim);

      const labelTex = await new THREE.TextureLoader().loadAsync("/images/label.jpg").catch(() => null);
      if (disposed || !labelTex) return;
      labelTex.colorSpace = THREE.SRGBColorSpace;
      labelTex.wrapS = THREE.RepeatWrapping;
      labelTex.offset.x = 0.025; // centre the "Mareeba" oval on the front
      labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const bottle = new THREE.Group();
      const inner = new THREE.Group();
      inner.position.y = 0.025;
      bottle.add(inner);
      scene.add(bottle);

      const shellGeo = new THREE.LatheGeometry(PROFILE.map(([r, y]) => new THREE.Vector2(r, y)), 96);
      const shell = new THREE.Mesh(
        shellGeo,
        new THREE.MeshPhysicalMaterial({ color: 0xcfe7f8, roughness: 0.05, transparent: true, opacity: 0.5, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2, depthWrite: false })
      );
      shell.renderOrder = 3;
      const hull = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: 0x7d9fba, side: THREE.BackSide, transparent: true, opacity: 0.55, depthWrite: false }));
      hull.scale.set(1.025, 1.004, 1.025);
      hull.renderOrder = 1;
      const back = new THREE.Mesh(
        shellGeo,
        new THREE.MeshPhysicalMaterial({ color: 0xb9d8ee, side: THREE.BackSide, roughness: 0.1, transparent: true, opacity: 0.35, depthWrite: false })
      );
      back.renderOrder = 1;
      const waterPts = PROFILE.filter(([, y]) => y <= 0.86).map(([r, y]) => new THREE.Vector2(Math.max(0, r - 0.025), y + 0.01));
      waterPts.push(new THREE.Vector2(0, 0.87));
      const water = new THREE.Mesh(
        new THREE.LatheGeometry(waterPts, 64),
        new THREE.MeshPhysicalMaterial({ color: 0x7cc2f0, roughness: 0.1, transparent: true, opacity: 0.45, depthWrite: false })
      );
      water.renderOrder = 2;
      const R = 0.568;
      const labelH = (2 * Math.PI * R) / LABEL_ASPECT;
      const label = new THREE.Mesh(
        new THREE.CylinderGeometry(R, R, labelH, 128, 1, true, Math.PI, Math.PI * 2),
        new THREE.MeshPhysicalMaterial({ map: labelTex, roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.1 })
      );
      label.position.y = -0.4;
      inner.add(shell, hull, back, water, label);

      const capMat = new THREE.MeshStandardMaterial({ color: 0x1c8fd9, roughness: 0.38, metalness: 0.05 });
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.22, 48), capMat);
      cap.position.y = 1.42;
      const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.215, 0.02, 48), capMat);
      capTop.position.y = 1.54;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.215, 0.018, 10, 48), capMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.3;
      inner.add(cap, capTop, ring);
      const ridgeGeo = new THREE.BoxGeometry(0.018, 0.2, 0.02);
      for (let i = 0; i < 40; i++) {
        const a = (i / 40) * Math.PI * 2;
        const r = new THREE.Mesh(ridgeGeo, capMat);
        r.position.set(Math.sin(a) * 0.218, 1.42, Math.cos(a) * 0.218);
        r.rotation.y = a;
        inner.add(r);
      }

      // Soft contact shadow
      const sc = document.createElement("canvas");
      sc.width = sc.height = 128;
      const sx = sc.getContext("2d")!;
      const sg = sx.createRadialGradient(64, 64, 0, 64, 64, 64);
      sg.addColorStop(0, "rgba(10,30,60,.32)");
      sg.addColorStop(1, "rgba(10,30,60,0)");
      sx.fillStyle = sg;
      sx.fillRect(0, 0, 128, 128);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 0.42),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false })
      );
      scene.add(shadow);

      document.documentElement.classList.add("webgl");

      let W = 0;
      let H = 0;
      const size = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
      };
      size();
      window.addEventListener("resize", size);
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (ev: PointerEvent) => {
        mouse.tx = ev.clientX / W - 0.5;
        mouse.ty = ev.clientY / H - 0.5;
      };
      window.addEventListener("pointermove", onMove);
      cleanups.push(() => {
        window.removeEventListener("resize", size);
        window.removeEventListener("pointermove", onMove);
      });

      const rect = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, h: r.height };
      };
      const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
      let spin = 0;
      let last = performance.now();

      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const a = rect(heroSlot);
        const b = rect(prodSlot);
        const p = ease(state.t);
        const visible = b.cy + b.h / 2 > -50 || state.t < 1;
        if (visible) {
          const worldH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
          const k = worldH / H;
          const cx = a.cx + (b.cx - a.cx) * p;
          const cy = a.cy + (b.cy - a.cy) * p;
          const h = a.h + (b.h - a.h) * p;
          mouse.x += (mouse.tx - mouse.x) * 0.06;
          mouse.y += (mouse.ty - mouse.y) * 0.06;
          spin += reduce ? 0 : dt;
          const sway = Math.sin(spin * 0.6) * 0.22;
          const arc = Math.sin(p * Math.PI);
          const scale = ((h * k) / BOTTLE_H) * (0.6 + 0.4 * state.intro) * (1 + arc * 0.22);
          bottle.position.set((cx - W / 2) * k, -(cy - H / 2) * k + (1 - state.intro) * -1.2, 0);
          bottle.scale.setScalar(scale);
          bottle.rotation.set(
            0.06 + mouse.y * 0.3 + arc * 0.8,
            sway * (1 - arc) + p * Math.PI * 2 + mouse.x * 0.7 - (1 - state.intro) * 2.4,
            arc * -0.32
          );
          shadow.position.set(bottle.position.x, bottle.position.y - 1.6 * scale, -0.6);
          shadow.scale.setScalar(scale * (1 - arc * 0.6));
          (shadow.material as import("three").MeshBasicMaterial).opacity = 1 - arc * 0.85;
          renderer.render(scene, camera);
        } else {
          renderer.clear();
        }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);

      cleanups.push(() => {
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose();
          const mat = m.material as import("three").Material | import("three").Material[] | undefined;
          (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
        });
        labelTex.dispose();
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
      });
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ctx.revert();
      cleanups.forEach((fn) => fn());
      document.documentElement.classList.remove("webgl");
    };
  }, []);

  return <canvas id="stage" ref={canvasRef} aria-hidden="true" />;
}
