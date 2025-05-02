<template>
  <div class="characters-page">
    <div v-if="loading">
      <LoadingSpinner message="Loading characters..." />
    </div>

    <div v-else-if="error">
      <ErrorMessage
        title="Failed to Load Characters"
        :message="error"
        :retry-action="loadCharacters"
      />
    </div>

    <template v-else>
      <div class="view-toggle">
        <h1>Characters</h1>
        <div class="view-buttons">
          <button
            class="btn"
            :class="{ 'btn-secondary': viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <i class="fas fa-th"></i> Grid
          </button>
          <button
            class="btn"
            :class="{ 'btn-secondary': viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <i class="fas fa-list"></i> List
          </button>
        </div>
      </div>

      <div v-if="characters.length === 0" class="no-results">
        <p>No characters found.</p>
      </div>

      <div v-else-if="viewMode === 'grid'" class="characters-grid grid">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
      </div>

      <div v-else class="characters-list">
        <div
          v-for="character in characters"
          :key="character.id"
          class="character-list-item"
        >
          <div class="character-list-image">
            <img
              :src="
                character.image ||
                'https://via.placeholder.com/100x100?text=No+Image'
              "
              :alt="character.name"
            />
          </div>
          <div class="character-list-info">
            <h3>{{ character.name }}</h3>
            <p>{{ character.race }}</p>
          </div>
          <div class="character-list-actions">
            <NuxtLink :to="`/characters/${character.id}`" class="btn">
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchCharacters } from "~/services/api";

// State
const characters = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(5);
const viewMode = ref("grid"); // 'grid' or 'list'

// Load characters
const loadCharacters = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetchCharacters(
      currentPage.value,
      itemsPerPage.value
    );
    characters.value = response.items || [];
    totalItems.value = response.total || 0;
    totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
  } catch (err) {
    error.value = "Failed to load characters. Please try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  loadCharacters();
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Load characters on component mount
onMounted(() => {
  loadCharacters();
});
</script>

<style scoped>
.characters-page h1 {
  margin-bottom: 30px;
}

.view-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-toggle .view-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.characters-grid {
  margin-bottom: 30px;
}

.characters-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.character-list-item {
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.character-list-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.character-list-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.character-list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.character-list-info {
  flex-grow: 1;
  padding: 15px;
}

.character-list-info h3 {
  margin-bottom: 5px;
}

.character-list-actions {
  padding: 15px;
}

.no-results {
  text-align: center;
  padding: 30px;
}

@media (max-width: 768px) {
  .character-list-item {
    flex-direction: column;
    align-items: stretch;
  }

  .character-list-image {
    width: 100%;
    height: 200px;
  }

  .character-list-actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
