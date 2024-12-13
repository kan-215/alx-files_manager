import redis from 'redis';
import { promisify } from 'util';

/* RedisClient class manages interactions with Redis service */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    /* Logs error if Redis fails to connect */
    this.client.on('error', (error) => {
      console.log(`Failed to connect Redis client: ${error.message}`);
    });

    /* Connection success message is omitted for now */
    this.client.on('connect', () => {
      // console.log('Successfully connected to Redis server');
    });
  }

  /* Verifies if the Redis client is connected */
  isAlive() {
    return this.client.connected;
  }

  /* Retrieves the value associated with the provided key from Redis */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /* Stores a key-value pair in Redis with an expiration time (in seconds) */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /* Removes the specified key from Redis storage */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
