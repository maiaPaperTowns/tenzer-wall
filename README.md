# Living Ink — Tenzer Wall Study

An interactive, full-screen generative artwork exploring how brush-written kanji can act as portals into animated landscape scenes. Characters drift through a quiet paper-like canvas; selecting one transforms the entire display into a corresponding visual world.

**[Open the live installation →](https://tenzer-kanji-garden.lmhuong-06.chatgpt.site)**

> Prototype 01 · DePauw Student Research Associate project · Designed for a large-format Windows display and adaptable to desktop, tablet, and touch installations.

## Research premise

Living Ink investigates a simple interaction model: **one character, one touch, one world**. The interface deliberately removes conventional navigation so the artwork can remain approachable in a public space. Meaning is revealed through motion rather than explanatory UI.

The current vocabulary contains seven concrete natural phenomena:

| Kanji | Concept | Scene behavior |
| --- | --- | --- |
| 花 | Flower | Blossoms propagate outward into a full-canvas composition with petals and delayed blooms. |
| 日 | Sun | A warm radial atmosphere expands softly while painted currents and cloud forms settle independently. |
| 虹 | Rainbow | A seamless painted landscape emerges across the viewport with a gradual atmospheric reveal. |
| 雨 | Rain | Layered rainfall crosses the complete painting at varied depth, speed, opacity, and scale. |
| 鳥 | Bird | A flock traverses the canvas; the rendered bird species varies between activations. |
| 山 | Mountain | Separate mountain strata rise sequentially through mist to create spatial depth. |
| 雷 | Thunder | Storm imagery, screen illumination, and procedurally generated branching lightning combine in timed pulses. |

## Interaction design

- Kanji are distributed through responsive lanes with balanced concept frequency.
- Pairwise spacing correction prevents falling characters from visually sticking together.
- Hammer.js normalizes single-touch input with generous movement thresholds for the infrared sensor.
- Both a short tap and a deliberate press activate the nearest character within an enlarged hit radius.
- Duplicate gesture suppression prevents one physical contact from opening the same scene twice.
- `Enter` and `Space` provide an equivalent keyboard interaction.
- The installation begins behind a restrained onboarding veil and reduces UI prominence after the first interaction.
- Sound is optional and only starts after explicit user input, respecting browser autoplay policies.

## Target installation

| Property | Specification |
| --- | --- |
| Host | Windows PC running Chrome |
| Logical canvas | **7680 × 2160** |
| Video topology | Two 4K outputs; each output drives a 2×2 grid of 1920×1080 panels |
| Input | Infrared touch, up to 32 simultaneous contacts |
| Initial interaction level | Single touch, intentionally optimized before multi-touch and gestures |

At the wall's 32:9 aspect ratio, character size and starting density increase automatically while retaining wide separation. Touch targets are larger than their visible glyphs to compensate for infrared imprecision. The current prototype avoids drag, kinetic scrolling, and edge-dependent controls; those patterns are unreliable on this hardware. Multi-touch recognizers can be introduced through the existing Hammer.js manager after single-touch field testing.

## Technical architecture

The prototype is a buildless static HTML/CSS/JavaScript application built on Canvas 2D and Web Audio. Hammer.js provides a focused gesture-recognition boundary while the visual simulation remains framework-free.

```text
Input (Hammer.js / Pointer Events fallback / keyboard)
          │
          ▼
Character scheduler ──► spatial collision correction
          │
          ▼
Scene state machine ──► particles + image layers + procedural effects
          │
          ▼
requestAnimationFrame render loop ──► responsive Canvas 2D output
```

Each active object carries its own elapsed lifetime. Scene opacity follows a sinusoidal envelope, producing a gentle entrance and exit without abrupt cuts. Visual assets are composited with procedural systems—particles, mist, glow, rain, lightning, and easing—so scenes behave as animations rather than static images appearing on top of the canvas.

### Rendering and performance

- The canvas tracks viewport size and caps device pixel ratio at `2` to control fill cost on high-density displays.
- Frame delta is clamped to prevent large simulation jumps after a suspended tab resumes.
- Completed characters, particles, ripples, and scenes are removed every frame.
- Image assets and the brush font are preloaded before interaction where practical.
- Responsive sizing uses viewport-relative bounds with explicit minimums and maximums.
- `prefers-reduced-motion` lowers particle and flock counts and accelerates the interaction cadence.

### Typography and visual system

Kanji use the locally hosted **Aoyagi Kouzan** brush typeface with platform calligraphic fallbacks. The background, color palette, and compositing treatments are derived from East Asian ink-and-wash and mineral-pigment painting references. The interface maintains a quiet neutral ground so the activated phenomenon remains the dominant visual event.

## Project structure

```text
.
├── .openai/
│   └── hosting.json       # Static hosting configuration
└── dist/
    ├── index.html         # Semantic shell and installation controls
    ├── styles.css         # Responsive presentation and accessibility states
    ├── app.js             # Simulation, interaction, audio, and rendering systems
    └── assets/            # Font and composited scene artwork
```

## Run locally

No build step is required. Serve `dist/` with any static web server:

```bash
cd dist
python3 -m http.server 4175
```

Then open [http://127.0.0.1:4175](http://127.0.0.1:4175).

For installation use, launch a current Chromium-based browser with `F11` or kiosk mode. Hammer.js consumes Pointer Events when available, while the fallback keeps the same canvas usable with a mouse, touch display, or pen if the library cannot load.

## Deployment

The production build is deployed as a static site:

- **Live:** [tenzer-kanji-garden.lmhuong-06.chatgpt.site](https://tenzer-kanji-garden.lmhuong-06.chatgpt.site)
- **Document root:** `dist/`
- **Configuration:** `.openai/hosting.json`

## Evaluation plan

The next research iteration can evaluate:

1. **Discoverability:** Do first-time viewers understand that the characters are interactive without instruction?
2. **Embodied pacing:** Does the character fall rate allow comfortable selection on a large wall display?
3. **Semantic legibility:** Can viewers associate each transformation with its kanji after repeated exposure?
4. **Affective response:** Do reveal timing, density, color, and sound sustain a soft, immersive mood?
5. **Display resilience:** How consistently do composition, hit targets, and frame time hold across aspect ratios and touch hardware?

Useful measurements include time to first interaction, successful-target rate, repeat activations per concept, dwell time, frame-time percentiles, and short qualitative interviews. Any analytics should be opt-in and avoid collecting identifying information.

## Roadmap

- Expand the vocabulary through a data-driven scene registry.
- Add deterministic random seeds for repeatable studies and visual regression tests.
- Separate simulation, rendering, and content configuration into testable modules.
- Introduce automated checks for keyboard access, reduced motion, and multiple aspect ratios.
- Add an installation mode with calibration, idle reset, diagnostics, and offline asset verification.
- Explore multi-character encounters where one scene dissolves naturally into the next.

## Status

This repository contains a research prototype, not a production installation package. Artwork and interaction parameters are under active iteration. Confirm font and image licensing before redistribution or public commercial use.
