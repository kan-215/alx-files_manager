import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
   * Checks and responds with the health status of Redis and the database.
   * Utilizes the helper methods from utils to determine status.
   * Responds with: { "redis": true, "db": true } and status code 200.
   */
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  /**
   * Retrieves and sends the counts of users and files from the database.
   * The response format is: { "users": <count>, "files": <count> } with status code 200.
   */
  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

export default AppController;
