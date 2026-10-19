---
title: How I built this website
description: The tools, skills, and ideas behind my personal website.
repository: https://github.com/SebaOfficial/racca.me
link: https://racca.me
created: '2026-10-10'
updated: '2026-10-20'
---

## The idea

I wanted a personal website that was more than a list of links. It needed to work as a portfolio, a place for technical writing, and a small experiment where visitors could explore the project.

The result is [racca.me](https://racca.me), built as a static SvelteKit website. The source code is available in the [GitHub repository](https://github.com/SebaOfficial/racca.me).

## Skills and tools

The project helped me practice several parts of web development:

- **TypeScript** for typed application code and terminal logic.
- **Svelte 5** for components and reactive state.
- **SvelteKit** for routing, server-side data loading, and static output.
- **Tailwind CSS** for layout, responsive design, and visual styling.
- **Markdown and mdsvex** for writing blog posts and project pages as content files.
- **Accessibility** for keyboard navigation, focus handling, semantic output, and live terminal updates.
- **API integration** with Octokit to load public GitHub project data.
- **Docker Compose** to run the local screenshot service used for project previews.

This combination keeps the site simple: content lives in Markdown, while the components provide the interface around it.

## Content and static pages

Blog posts and project descriptions are stored in `src/lib/blog`. The server-side blog loader compiles Markdown with mdsvex and adds heading IDs with `rehype-slug`. SvelteKit then uses the compiled content to create the page output.

The site uses the static adapter, so the public pages can be served as generated files instead of requiring a long-running application server. GitHub data is loaded separately for the project carousel, where repositories are filtered by stars and sorted before they are displayed.

## A terminal in the browser

The most unusual part of the site is the terminal on the home page. It looks like a shell, but it is an application running inside the browser.

The terminal uses [ZenFS](https://zenfs.dev/) with its browser `WebStorage` backend. When it starts, the application builds a virtual filesystem from the site's blog posts and projects:

```text
/
├── blog/
└── projects/
```

Each Markdown page becomes a virtual `.md` file. The `ls`, `cd`, and `cat` commands operate on that filesystem. `cat` renders the selected file as HTML, so visitors can read the same content through the terminal.

This is virtualization and emulation in a small, practical form:

- **Virtualization:** the filesystem exists in browser storage rather than on the user's real disk.
- **Emulation:** the application emulates a few shell behaviours, including prompts, paths, command history, errors, and tab completion.

It is not a virtual machine and it does not emulate a complete operating system. There is no separate kernel or remote shell. All commands run locally in the page, which makes the feature safe to explore and easy to deploy with the rest of the static site.

The terminal supports `help`, `clear`, `cd`, `ls`, and `cat`. It also keeps command history, resolves paths such as `~` and `..`, and provides command and path completion. The terminal state is connected to Svelte's UI, while the command and filesystem logic stays in separate TypeScript modules.

## Resources

The main resources for the project are:

- [Source code](https://github.com/SebaOfficial/racca.me)
- [Live website](https://racca.me)
- [SvelteKit documentation](https://svelte.dev/docs/kit)
- [Svelte documentation](https://svelte.dev/docs/svelte)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [ZenFS documentation](https://zenfs.dev/)
- [mdsvex documentation](https://mdsvex.pngfilter.dev/)
- [Octokit REST.js](https://octokit.github.io/rest.js/)

The site is intentionally small. Its main value is not the number of features, but the way content, a static build, and a small browser-based terminal fit together.
