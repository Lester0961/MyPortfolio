# John Lester Dematera Portfolio

A cinematic developer portfolio built around real systems, real project captures, and intentionally dramatic motion.

Live site: [lester0961.vercel.app](https://lester0961.vercel.app)

## Experience

The site presents John Lester as a frontend developer and system builder through a long-form, scroll-directed narrative:

- A layered hero with generated cinematic artwork, a live Three.js system, project planes, and pointer depth
- Full-screen project scenes using real captures from SISP, SRS, and Vertica
- GSAP scroll choreography, SplitText reveals, Flip transitions, magnetic controls, orbital links, and a credential scanner
- Expandable case studies and a live GitHub profile panel with a resilient fallback
- Preserved resume, credential, contact, social, and project destinations
- Keyboard support, semantic sections, native dialogs, reduced-motion behavior, and responsive layouts

## Stack

- React 19 and Vite 8
- GSAP with ScrollTrigger, SplitText, and Flip
- Three.js for the hero system
- Phosphor Icons
- Custom CSS design system

No environment variables are required. The GitHub panel reads only public profile information.

## Local development

```powershell
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Verification

```powershell
npm run check
```

This runs the source guard and a production build. The source guard verifies the required section anchors, essential assets, motion constraints, and typography rule used by the page.

For a production preview:

```powershell
npm run build
npm run preview
```

## Project structure

```text
portfolio/
|-- assets/
|   |-- images/        # Profile and generated hero artwork
|   |-- projects/      # Real project captures
|   |-- resume/        # Downloadable resume
|   `-- certificates/  # Credential proof
|-- scripts/           # Lightweight source verification
|-- src/
|   |-- components/    # Three.js visual system
|   |-- App.jsx        # Page structure and GSAP choreography
|   |-- data.js        # Portfolio content and destinations
|   `-- styles.css     # Design system and responsive behavior
|-- index.html
|-- package.json
`-- vite.config.js
```

## Deployment

Vercel can deploy this as a standard Vite project. Use `npm run build` as the build command and `dist` as the output directory if those values are not detected automatically.

## Accessibility and performance

- `prefers-reduced-motion` removes nonessential motion and disables the WebGL scene
- Interactive elements keep visible focus states and semantic labels
- The Three.js experience is loaded as a separate on-demand bundle
- Project images declare dimensions and are deferred outside the hero

## Author

John Lester Dematera

- [GitHub](https://github.com/Lester0961)
- [LinkedIn](https://www.linkedin.com/in/johnlester21/)
- [Email](mailto:johnlesterdematera0961@gmail.com)

## License

Licensed under the [MIT License](LICENSE).
