<template>
  <div class="character-detail-page">
    <div class="back-link">
      <NuxtLink to="/" class="btn btn-secondary">
        <i class="fas fa-arrow-left"></i> Back to Characters
      </NuxtLink>
    </div>

    <div v-if="loading">
      <LoadingSpinner message="Loading character details..." />
    </div>

    <div v-else-if="error">
      <ErrorMessage
        title="Failed to Load Character"
        :message="error"
        :retry-action="loadCharacter"
      />
    </div>

    <div v-else-if="character" class="character-detail">
      <div class="character-header">
        <div class="character-image">
          <img
            :src="
              character.image ||
              'https://via.placeholder.com/400x400?text=No+Image'
            "
            :alt="character.name"
          />
        </div>
        <div class="character-header-info">
          <h1>{{ character.name }}</h1>
          <div class="character-tags">
            <span class="tag">{{ character.race }}</span>
            <span v-if="character.gender" class="tag">{{
              character.gender
            }}</span>
            <span v-if="character.ki" class="tag">Ki: {{ character.ki }}</span>
          </div>
        </div>
      </div>

      <div class="character-info-section">
        <h2>Character Information</h2>

        <div class="info-grid">
          <div class="info-item" v-if="character.description">
            <h3>Description</h3>
            <p>{{ character.description }}</p>
          </div>

          <div class="info-item" v-if="character.maxKi">
            <h3>Max Ki</h3>
            <p>{{ character.maxKi }}</p>
          </div>

          <div class="info-item" v-if="character.affiliation">
            <h3>Affiliation</h3>
            <p>{{ character.affiliation }}</p>
          </div>

          <div class="info-item" v-if="character.status">
            <h3>Status</h3>
            <p>{{ character.status }}</p>
          </div>
        </div>
      </div>

      <!-- Note: As per requirements, we're not showing origin planets and transformations -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchCharacterById } from "~/services/api";

const route = useRoute();
const characterId = route.params.id;

// State
const character = ref(null);
const loading = ref(true);
const error = ref(null);

// Load character details
const loadCharacter = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await fetchCharacterById(characterId);
    character.value = data;
  } catch (err) {
    error.value = "Failed to load character details. Please try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Load character on component mount
onMounted(() => {
  loadCharacter();
});
</script>

<style scoped>
.character-detail-page {
  padding-bottom: 40px;
}

.back-link {
  margin-bottom: 20px;
}

.character-detail {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.character-header {
  display: flex;
  background-color: var(--text-color);
  color: white;
}

.character-image {
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.character-header-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-header-info h1 {
  margin-bottom: 10px;
  font-size: 28px;
}

.character-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
}

.character-info-section {
  padding: 20px;
}

.character-info-section h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.info-item h3 {
  margin-bottom: 10px;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .character-header {
    flex-direction: column;
  }

  .character-image {
    width: 100%;
    height: 250px;
  }
}
</style>
