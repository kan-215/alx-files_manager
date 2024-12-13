import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    /* Handle errors */
    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error.message}`);
    });

    /* Promisify Redis client methods for asynchronous use */
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    /* Check if the client is connected */
    return this.client.connected;
  }

  async get(key) {
    try {
      /* Retrieve value for the specified key */
      return await this.getAsync(key);
    } catch (error) {
      console.error(`Error getting key ${key}: ${error.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      /* Validate inputs */
      if (typeof key !== 'string' || duration <= 0) {
        throw new Error('Invalid key or duration');
      }

      /* Store the key-value pair with expiration */
      await this.setAsync(key, value);
      const result = await promisify(this.client.expire).bind(this.client)(key, duration);
      if (!result) {
        throw new Error(`Failed to set expiration for key ${key}`);
      }
    } catch (error) {
      console.error(`Error setting key ${key} with value ${value}: ${error.message}`);
    }
  }

  async del(key) {
    try {
      /* Delete the key from Redis */
      await this.delAsync(key);
    } catch (error) {
      console.error(`Error deleting key ${key}: ${error.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

