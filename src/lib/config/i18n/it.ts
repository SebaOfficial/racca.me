import type { Config } from '$lib/types/SiteConfig';

const it: Config = {
	navBar: [
		{
			title: 'Home Page',
			href: '/it',
			content: 'Home'
		},
		{
			title: 'Pagina dei Contatti',
			href: '/it/contacts',
			content: 'Contatti'
		},
		{
			title: 'Pagina dei Progetti',
			href: '/it/projects',
			content: 'Progetti'
		},
		{
			title: 'Pagina delle Donazioni',
			href: '/it/pay',
			content: 'Dona &amp; Paga'
		},
		{
			title: 'Blog di Seba',
			href: '//blog.racca.me',
			content: 'Blog di Seba'
		}
	],
	pages: {
		'': {
			title: 'Seba',
			contents: [
				{
					title: 'Sede in Italia',
					description:
						'Sono uno studente italiano che prosegue la sua formazione e alla ricerca costante di conoscenza e cresita personale in vari campi.'
				},
				{
					title: 'Sviluppatore PHP',
					description:
						'Come sviluppatore web esperto, sono specializzato nella creazione di applicazioni web, siti web e API utilizzando vari linguaggi e tecnologie di programmazione. Inoltre, ho un forte background nello sviluppo di bot per Telegram e possiedo le competenze per progettare e implementare RPA (Robotic Process Automations) per semplificare attività e processi complessi.'
				},
				{
					title: 'Scout Entusiasta',
					description:
						"Essere uno scout è parte integrante della mia vita. Ha formato il mio carattere, mi ha insegnato preziose abilità di vita e mi ha permesso di contribuire alla mia comunità attraverso il lavoro di squadra, la leadership e le attività all'aperto."
				},
				{
					title: 'Sostenitore dei Diritti Umani',
					description:
						"Sono profondamente interessato alle questioni sociali, in particolare a quelle legate all'ecologia, alla diversità etnica e alle minoranze politiche. Sostengo attivamente le iniziative che mirano a creare un mondo più inclusivo e sostenibile."
				}
			],
			seo: {
				title: 'About',
				description:
					"Benvenuto nel sito del portfolio di Sebastiano Racca, che mette in mostra la mia passione per l'informatica e per il mondo. Esplora i miei progetti e contattami."
			}
		},
		contacts: {
			title: 'Contatti',
			contents: {
				title: 'Contattami',
				form: {
					inputs: [
						{
							for: 'subject',
							itemprop: 'about',
							label: 'Oggetto',
							placeholder: "L'Oggetto"
						},
						{
							for: 'name',
							itemprop: 'sender',
							label: 'Nome',
							placeholder: 'Il tuo Nome'
						},
						{
							for: 'message',
							itemprop: 'description',
							label: 'Messaggio',
							placeholder: 'Il messaggio che vuoi inviarmi',
							textarea: true
						}
					],
					submit: 'Submit'
				}
			},
			seo: {
				title: 'Contatti',
				description:
					'Entra in contatto con Sebastiano Racca e collegati direttamente per richiedere informazioni, collaborazioni o qualsiasi altra domanda. Contatta per discutere di progetti, collaborazioni o opportunità.'
			}
		},
		projects: {
			title: 'Progetti',
			seo: {
				title: 'Progetti Open Source',
				description:
					'Esplora i progetti open source di Sebastiano Racca da GitHub, da librerie a progetti completi.'
			},
			contents: {
				title: 'Progetti Open Source da Github',
				star: {
					singular: 'Stella',
					plural: 'Stelle'
				}
			}
		},
		pay: {
			title: 'Dona',
			seo: {
				title: 'Supportami',
				description:
					'Ogni contributo favoreggia il mio sviluppo di progetti open source. Esplora i modi per pagarmi o per effettuare una donazione.'
			},
			contents: {
				title: 'Supportami',
				subTitle: 'Ogni donazione è apprezzata <3',
				bmc: 'Che stanchezza, perchè non mi compri un caffè?',
				form: {
					method: 'Metodo di Pagamento:',
					amount: 'Ammontare:',
					submit: 'Dona/Paga'
				}
			}
		},
		notFound: {
			title: 'Not Found',
			seo: {
				title: '404 Not Found',
				description: ''
			},
			contents: {
				title: 'Pagina Non Trovata',
				description: 'Ma non preoccuparti'
			}
		}
	}
};

export default it;
