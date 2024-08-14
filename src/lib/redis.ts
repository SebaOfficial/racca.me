import { createClient } from "redis";
import { REDIS_HOST, REDIS_PASSWORD } from "$env/static/private";

let redis;

if (process.env.BUILD_ENV === 'build') {
  console.log("Skipping Redis connection during the build process");
} else {
  redis = createClient({
    url: REDIS_HOST,
    password: REDIS_PASSWORD,
  });

  await redis.connect().catch(err => {
    console.error("Failed to connect to Redis", err);
  });
}

export default redis;
