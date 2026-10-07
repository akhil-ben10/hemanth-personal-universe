# Hemanth Portfolio — React

A complete React website with Vite for development and esbuild for production with the original cream, orange and black design with scroll scenes and parallax effects, all supplied photos, silent looping videos, interactive 3D gaming gear, mobile navigation, a full-screen photo viewer, and website-design contact links.

## Run locally

Install Node.js 20.19+ or 22.12+, then run these commands in this folder:

```bash
npm install
npm run dev
```

Open the URL printed in the terminal. Stop the server with Ctrl+C.

## Build and preview

```bash
npm run build
npm run preview
```

Upload the generated `dist` folder to a static hosting service. The project can also be imported into Vercel or Netlify: use `npm run build` and output directory `dist`.

## Edit the website

- `src/App.jsx`: page structure, introduction, projects, contact number and navigation.
- `src/components/Content.jsx`: photos, recipe cards, reunion items and other content.
- `src/components/GamingGear.jsx`: 3D models and rotation controls.
- `src/components/DetailDialog.jsx`: photo viewer and project detail dialogs.
- `src/useAmbientMedia.js`: silent video playback and scroll reveals.
- `src/motion.js`: original sticky scroll scenes, horizontal gallery, cursor, image parallax and card tilt.
- `src/projects.js`: reunion, cooking, creativity and community-service details.
- `src/styles/`: original design styles, responsive refinements and new-media/contact styles.
- `public/assets/`: all photos, videos, 3D models and the bundled model viewer.

The website-design contact number is 7661919185. Call links use `tel:+917661919185`; WhatsApp links open a chat and do not automatically send a message.

All three videos have no audio track. Autoplay is muted; playback pauses off-screen or when the browser tab is hidden. A pause button and reduced-motion preferences are supported. External Google Fonts are used, with system-font fallbacks.

3D model credits and viewer attribution are in `public/assets/credits.txt`. No login, backend, paid API, or secret keys are required. The ZIP excludes generated files, repository metadata and dependencies; run `npm install` first.

## Latest changes

- Formal and work portraits appear first in the gallery.
- The tree-root group photo has its own friendship section.
- Mithrulam and Dishcovery dialogs use the supplied group photos as backgrounds.
- The 3D models include coloured materials; geometry and rotation controls are preserved.
