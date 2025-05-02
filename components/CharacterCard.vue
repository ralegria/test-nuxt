<template>
  <div class="character-card card">
    <div class="character-image">
      <img
        :src="
          character.image || 'https://via.placeholder.com/300x300?text=No+Image'
        "
        :alt="character.name"
      />
    </div>
    <div class="character-info">
      <h3>{{ character.name }}</h3>
      <p class="character-race">{{ character.race }}</p>
      <NuxtLink :to="`/characters/${character.id}`" class="btn"
        >View Details</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.character-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.character-image {
  height: 300px;
  overflow: hidden;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.3s;
}

.character-card:hover .character-image img {
  transform: scale(1.05);
}

.character-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.character-info h3 {
  margin-bottom: 5px;
  font-size: 18px;
}

.character-race {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.character-info .btn {
  margin-top: auto;
  align-self: flex-start;
}
</style>
