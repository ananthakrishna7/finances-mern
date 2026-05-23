const { createClient } = require('redis');

// Reads directly from the .env file injected by Docker Compose
const redisUrl = process.env.REDIS_URL || 'redis://redis-cache:6379';

const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('⚡ Connected to Redis successfully');
});

// Immediately connect when the file is required
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error('❌ Failed to establish Redis connection:', err);
  }
})();

// Export the client so your entire app can use it
module.exports = redisClient;
