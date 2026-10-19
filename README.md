<p align="center">
  <a href="https://racca.me">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:2563eb&height=220&section=header&text=racca.me&fontSize=64&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Sebastiano%20Racca's%20personal%20website&descAlignY=60&descSize=18" alt="racca.me banner">
  </a>
</p>

<p align="center">
  <a href="https://racca.me"><img src="https://img.shields.io/badge/live-racca.me-2563eb?style=for-the-badge" alt="Live website"></a>
  <a href="https://github.com/SebaOfficial/racca.me/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/SebaOfficial/racca.me/build.yml?branch=main&style=for-the-badge&label=build" alt="Build status"></a>
  <a href="https://github.com/SebaOfficial/racca.me/blob/main/README.md"><img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-64748b?style=for-the-badge" alt="CC BY-NC-SA 4.0 license"></a>
</p>

# racca.me

The source code for [racca.me](https://racca.me), a static personal website, portfolio, and technical blog by [Sebastiano Racca](https://github.com/SebaOfficial).

The site combines written content with a small browser-based terminal. Visitors can browse the blog and projects normally, or explore the same content through commands such as `ls`, `cd`, and `cat`.

## Highlights

- **Static SvelteKit site** generated with the static adapter and deployed to GitHub Pages.
- **Markdown content** in [`src/lib/blog`](./src/lib/blog), compiled with mdsvex.
- **Interactive terminal** powered by Svelte 5 and ZenFS, with a virtual filesystem backed by browser storage.
- **GitHub project carousel** populated from the GitHub API with Octokit.
- **Project previews** generated through the local Docker Compose screenshot service.
- **Accessible, responsive UI** with Tailwind CSS, keyboard navigation, and semantic page output.

## Tech stack

| Area      | Technologies                                                                               |
| --------- | ------------------------------------------------------------------------------------------ |
| Framework | SvelteKit 3, Svelte 5, TypeScript, Tailwind CSS, [ZenFS](https://zenfs.dev/)               |
| Services  | GitHub REST API (Octokit), [`usaiinc/scraper`](https://github.com/goodreasonai/ScrapeServ) |

## Getting started

### Prerequisites

- Node.js 26
- pnpm 12
- Docker, with Docker Compose support

Install dependencies from the repository root:

```bash
pnpm install
```

### Environment variables

Set the environment variables by coping the `.env.example` into a `.env` file and fill it with your information.

### Develop

Start the development server with:

```bash
pnpm dev
```

The `predev` script starts the Docker Compose scraper service automatically and waits for it to become healthy. The site is then available at the local URL printed by Vite, usually [`http://localhost:5173`](http://localhost:5173).

The scraper service is exposed on port `5006`. If Docker is not running, `pnpm dev` cannot start the local preview service.

### Build and deploy

To create a production build locally:

```bash
pnpm build
```

The static output is written to `build/`. To serve that output locally, use:

```bash
pnpm preview
```

## Useful commands

| Command       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `pnpm dev`    | Start Docker services and the Vite development server |
| `pnpm predev` | Start Docker services                                 |
| `pnpm build`  | Generate the static production site                   |

## License

This project is licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
