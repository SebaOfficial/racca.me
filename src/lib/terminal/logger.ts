import { configure, getConsoleSink } from '@logtape/logtape';

await configure({
	sinks: {
		console: getConsoleSink()
	},
	filters: {},
	loggers: [
		{ category: ['logtape', 'meta'], sinks: ['console'], lowestLevel: 'warning' },
		{ category: ['sys'], sinks: ['console'] },
		{ category: ['terminal'], sinks: ['console'] },
		{ category: ['history'], sinks: ['console'] }
	]
});
