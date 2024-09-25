import type { Config } from '$lib/types/SiteConfig';

const en: Config = {
	navBar: [
		{
			title: 'Home Page',
			href: '/en',
			content: 'Home'
		},
		{
			title: 'Contacts Page',
			href: '/en/contacts',
			content: 'Contacts'
		},
		{
			title: 'Projects Page',
			href: '/en/projects',
			content: 'Projects'
		},
		{
			title: 'Donation Page',
			href: '/en/donate',
			content: 'Donate'
		},
		{
			title: "Seba's Blog",
			href: '//blog.racca.me',
			content: "Seba's Blog"
		}
	],
	pages: {
		'': {
			title: 'Seba',
			contents: [
				{
					title: 'Based in italy',
					description:
						'I am an italian student, pursuing my education and constantly seeking knowledge and personal growth in various fields.'
				},
				{
					title: 'Developer',
					description:
						'As an experienced web developer, I specialize in creating web applications, websites, and APIs using various programming languages and technologies. Additionally, I have a strong background in Telegram bot development and possess the skills to design and implement RPAs (Robotic Process Automations) to streamline complex tasks and processes.'
				},
				{
					title: 'Scout Enthusiast',
					description:
						'Being a scout is an integral part of my life. It has shaped my character, taught me valuable life skills, and allowed me to contribute to my community through teamwork, leadership, and outdoor activities.'
				},
				{
					title: 'Advocate for Equal Rights',
					description:
						'I am deeply interested in social issues, particularly those related to ecology, ethnic diversity, and political minorities. I actively support initiatives that aim to create a more inclusive and sustainable world.'
				}
			],
			seo: {
				title: 'About',
				description:
					"Welcome to Sebastiano Racca's portfolio website, showcasing my passion for informatics and the world. Explore my projects and get in touch with me."
			}
		},
		contacts: {
			title: 'Contacts',
			contents: {
				title: 'Get in Touch',
				form: {
					inputs: [
						{
							for: 'subject',
							itemprop: 'about',
							label: 'Subject',
							placeholder: 'The Subject'
						},
						{
							for: 'name',
							itemprop: 'sender',
							label: 'Name',
							placeholder: 'Your Name'
						},
						{
							for: 'message',
							itemprop: 'description',
							label: 'Message',
							placeholder: 'The message you want to send',
							textarea: true
						}
					],
					submit: 'Submit'
				}
			},
			seo: {
				title: 'Contacts',
				description:
					'Get in touch with Sebastiano Racca and connect directly for inquiries, collaborations, or any questions you may have. Reach out to discuss projects, partnerships, or opportunities.'
			}
		},
		projects: {
			title: 'Projects',
			contents: {
				title: 'Open source projects from GitHub',
				star: {
					singular: 'Star',
					plural: 'Stars'
				}
			},
			seo: {
				title: 'Popular Open Source Projects',
				description:
					"Explore Sebastiano Racca's open source projects from GitHub, ranging libraries to full projects."
			}
		},
		pay: {
			title: 'Payment',
			seo: {
				title: 'Payments',
				description: 'Pay Sebastiano Racca for his work.'
			},
			contents: {
				title: 'Payment',
				subTitle: null,
				bmc: null,
				form: {
					method: 'Payment Method:',
					amount: 'Amount:',
					submit: 'Pay'
				}
			}
		},
		donate: {
			title: 'Donate',
			seo: {
				title: 'Donations',
				description:
					'Every contribution supports the development of my open source projects. Explore ways to pay me or make a donation.'
			},
			contents: {
				title: 'Support Me',
				subTitle: 'Every donation is apreciated <3',
				bmc: {
					message: "So tired, why don't you buy me a coffee?",
					description: 'Support me on Buy me a coffee!'
				},
				form: {
					method: 'Payment Method:',
					amount: 'Amount:',
					submit: 'Donate'
				}
			}
		},
		notFound: {
			title: 'Not Found',
			contents: {
				title: 'Page Not Found',
				description: "Don't Worry"
			},
			seo: {
				title: '404 Not Found',
				description: ''
			}
		}
	}
};

export default en;
