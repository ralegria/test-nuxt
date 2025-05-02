/**
 * Composable for handling local storage operations
 */
export const useLocalStorage = () => {
  /**
   * Get item from local storage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} - Parsed value from storage or default value
   */
  const getItem = (key, defaultValue = null) => {
    if (import.meta.server) return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  /**
   * Set item in local storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} - Success status
   */
  const setItem = (key, value) => {
    if (import.meta.server) return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  };

  /**
   * Remove item from local storage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  const removeItem = (key) => {
    if (import.meta.server) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
