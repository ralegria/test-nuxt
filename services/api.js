/**
 * Service to handle API requests to the Dragon Ball API
 */
import { useLocalStorage } from "~/composables/useLocalStorage";

const BASE_URL = "https://dragonball-api.com/api";
const PLANETS_STORAGE_KEY = "dragonball_planets";

/**
 * Fetch characters with pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Promise} - Promise with character data
 */
export async function fetchCharacters(page = 1, limit = 5) {
  try {
    const response = await fetch(
      `${BASE_URL}/characters?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

/**
 * Fetch a single character by ID
 * @param {number|string} id - Character ID
 * @returns {Promise} - Promise with character data
 */
export async function fetchCharacterById(id) {
  try {
    const response = await fetch(`${BASE_URL}/characters/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Save planet to local storage
 * @param {Object} planet - Planet data
 */
export function savePlanet(planet) {
  const { getItem, setItem } = useLocalStorage();

  try {
    // Get existing planets from local storage
    const existingPlanets = getItem(PLANETS_STORAGE_KEY, []);

    // Add new planet with a unique ID
    const newPlanet = {
      ...planet,
      id: Date.now(), // Use timestamp as a simple unique ID
      createdAt: new Date().toISOString(),
    };

    // Add to the beginning of the array
    existingPlanets.unshift(newPlanet);

    // Save back to local storage
    setItem(PLANETS_STORAGE_KEY, existingPlanets);

    return newPlanet;
  } catch (error) {
    console.error("Error saving planet to local storage:", error);
    throw error;
  }
}

/**
 * Get all planets from local storage
 * @returns {Array} - Array of planets
 */
export function getPlanets() {
  const { getItem } = useLocalStorage();
  return getItem(PLANETS_STORAGE_KEY, []);
}
