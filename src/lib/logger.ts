import { Logger } from 'tslog';
import { dev } from '$app/env';

const log = new Logger({ minLevel: dev ? 'DEBUG' : 'INFO' });

export default log;
