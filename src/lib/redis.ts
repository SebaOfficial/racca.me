import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD } from '$env/static/private';

const redis = createClient({
	url: REDIS_HOST,
	password: REDIS_PASSWORD
});

await redis.connect().catch((err) => {
	console.error('Failed to connect to Redis', err);
});

export default redis;
