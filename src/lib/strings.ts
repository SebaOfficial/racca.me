import { EnvelopeSolid, GithubSolid, LinkedinSolid, LockSolid } from 'flowbite-svelte-icons';

const s = {
	openExternalLink: (descriptor: string) => `${descriptor} (opens in a new tab)`,
	learnMore: 'Learn More',
	skipToContent: 'Skip to content',
	header: {
		brand: 'Seba',
		name: 'Sebastiano Racca',
		title: `CS Student @ <a rel="external" href="https://unito.it">UniTo</a>`,
		motto: 'Currently thinking about the next side project...',
		navLabel: 'In-page jump links',
		nav: ['about', 'projects', 'blog'],
		navItems: {
			about: 'About',
			projects: 'Projects',
			blog: 'Blog',
		},
		socials: {
			label: 'Social media',
			github: 'GitHub',
			list: [
				{
					name: 'GitHub',
					link: 'https://github.com/SebaOfficial',
					icon: GithubSolid,
				},
				{
					name: 'LinkedIn',
					link: 'https://linkedin.com/in/sebastiano-racca',
					icon: LinkedinSolid,
				},
				{
					name: 'Email',
					link: 'mailto:sebastiano@racca.me',
					icon: EnvelopeSolid,
				},
				{
					name: 'GPG Key',
					link: 'https://gpg.racca.me',
					icon: LockSolid,
				},
			],
		},
	},
	home: {
		about: [
			"Hello there! I'm Sebastiano and I like building things and seeing the results of my work. I'm currently working on my education at UniTo university in Turin, Italy. I've been a scout for more than 10 years and it has shaped my character. It has taught me valuable life skills and allowed me to contribute to my community through teamwork, leadership, and outdoor activities.",
			'I am deeply interested in social issues, particularly those related to ecology, ethnic diversity, and political minorities. I actively support initiatives that aim to create a more inclusive and sustainable world.',
		],
	},
	projects: {
		title: 'Featured Projects',
		preview: {
			alt: (title: string) => `${title}'s preview`,
		},
		github: {
			title: 'Other GitHub projects',
			label: 'GitHub projects',
			carousel: {
				label: 'GitHub projects carousel',
				previous: 'Previous project',
				next: 'Next project',
			},
			stars: 'Stars:',
			forks: 'Forks:',
		},
	},
	blog: {
		title: 'Blog',
	},
	footer: {
		copyright: (year: number) => `© ${year} Sebastiano Racca. All rights reserved.`,
		attribution: 'Built with SvelteKit and Tailwind CSS.',
	},
	terminal: {
		label: 'Terminal command',
		title: 'terminal — lsh',
		commands: {
			welcome: {
				description: 'Display the welcome message',
				messages: ['Welcome to The terminal!', 'Type "help" to see available commands.'],
			},
			help: {
				description: 'List all commands',
				message: 'Available commands:',
			},
			clear: {
				description: 'Clear the terminal display',
			},
			cd: {
				description: 'Change the current working directory',
			},
			ls: {
				description: 'List files and directories in the current directory',
			},
			cat: {
				description: 'Display the contents of a file as HTML using mdsvex',
			},
		},
		errors: {
			noSuchFileOrDirectory: 'No such file or directory',
			notDirectory: 'Not a directory',
			notFile: 'Not a file',
			missingCommand: (name: string) => `Command not found: ${name}`,
			error: (message: string) => `Error: ${message}`,
			missingArgument: 'meow',
		},
	},
	seo: {
		title: 'Sebastiano Racca | Portfolio',
		description: 'Personal website and portfolio of Sebastiano Racca, a software developer.',
	},
	llms: {
		title: 'Sebastiano Racca',
		presentation: 'Personal website and portfolio of Sebastiano Racca, a software developer.',
		description:
			"This site contains information about Sebastiano's projects and technical writing.",
		main: {
			title: 'Main Pages',
			description: 'About, projects, blog posts, and an interactive terminal.',
		},
		blog: 'Blog posts',
		projects: {
			title: 'Projects',
			sourceCode: {
				label: 'Source Code',
				description: 'Public repository containing the implementation.',
			},
			article: {
				label: 'Project Article',
				description: 'Article explaining the project and its technical decisions.',
			},
		},
	},
} as const;

export default s;
