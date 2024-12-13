import { ObjectId } from 'mongodb';

/**
 * Module with basic utilities
 */
const basicUtils = {
  /**
   * Checks if Id is Valid in  Mongodb
   * @id {string|number} id to be validated
   * @return {boolean} true if valid,else false
   */
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

export default basicUtils;
