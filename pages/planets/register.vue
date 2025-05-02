<template>
  <div class="planet-register-page">
    <h1>Register New Planet</h1>
    
    <div class="planet-form-container">
      <form @submit.prevent="handleSubmit" class="planet-form">
        <div class="form-group">
          <label for="planetName">Planet Name *</label>
          <input 
            type="text" 
            id="planetName" 
            v-model="planetForm.name" 
            class="form-control" 
            required
            :class="{ 'error': errors.name }"
          >
          <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
        </div>
        
        <div class="form-group">
          <label for="planetDescription">Planet Description *</label>
          <textarea 
            id="planetDescription" 
            v-model="planetForm.description" 
            class="form-control" 
            rows="5" 
            required
            :class="{ 'error': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
        </div>
        
        <div class="form-group">
          <label for="planetImage">Planet Image URL *</label>
          <input 
            type="url" 
            id="planetImage" 
            v-model="planetForm.image" 
            class="form-control" 
            required
            placeholder="https://example.com/image.jpg"
            :class="{ 'error': errors.image }"
          >
          <p v-if="errors.image" class="error-message">{{ errors.image }}</p>
        </div>
        
        <div v-if="planetForm.image" class="image-preview">
          <h3>Image Preview</h3>
          <img :src="planetForm.image" alt="Planet preview" @error="handleImageError">
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i> Saving...
            </span>
            <span v-else>Register Planet</span>
          </button>
          <button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
        </div>
      </form>
    </div>
    
    <div v-if="successMessage" class="success-message-container">
      <div class="success-message">
        <i class="fas fa-check-circle"></i>
        <p>{{ successMessage }}</p>
        <button class="btn" @click="resetForm">Register Another Planet</button>
      </div>
    </div>
    
    <div class="registered-planets">
      <h2>Registered Planets</h2>
      <div v-if="planets.length === 0" class="no-planets">
        <p>No planets registered yet.</p>
      </div>
      <div v-else class="planets-grid grid">
        <div v-for="planet in planets" :key="planet.id" class="planet-card card">
          <div class="planet-image">
            <img :src="planet.image || 'https://via.placeholder.com/300x300?text=No+Image'" :alt="planet.name">
          </div>
          <div class="planet-info">
            <h3>{{ planet.name }}</h3>
            <p class="planet-description">{{ truncateText(planet.description, 100) }}</p>
            <p class="planet-date">Added: {{ formatDate(planet.createdAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { savePlanet, getPlanets } from '~/services/api';

// Form state
const planetForm = ref({
  name: '',
  description: '',
  image: ''
});

const errors = ref({
  name: '',
  description: '',
  image: ''
});

const isSubmitting = ref(false);
const successMessage = ref('');
const planets = ref([]);
const imageError = ref(false);

// Load planets from local storage
const loadPlanets = () => {
  planets.value = getPlanets();
};

// Validate form
const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: '',
    description: '',
    image: ''
  };
  
  if (!planetForm.value.name.trim()) {
    errors.value.name = 'Planet name is required';
    isValid = false;
  } else if (planetForm.value.name.length < 2) {
    errors.value.name = 'Planet name must be at least 2 characters';
    isValid = false;
  }
  
  if (!planetForm.value.description.trim()) {
    errors.value.description = 'Planet description is required';
    isValid = false;
  } else if (planetForm.value.description.length < 10) {
    errors.value.description = 'Description must be at least 10 characters';
    isValid = false;
  }
  
  if (!planetForm.value.image.trim()) {
    errors.value.image = 'Planet image URL is required';
    isValid = false;
  } else if (!isValidUrl(planetForm.value.image)) {
    errors.value.image = 'Please enter a valid URL';
    isValid = false;
  }
  
  if (imageError.value) {
    errors.value.image = 'The provided image URL is invalid or inaccessible';
    isValid = false;
  }
  
  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    const newPlanet = savePlanet({
      name: planetForm.value.name,
      description: planetForm.value.description,
      image: planetForm.value.image
    });
    
    successMessage.value = `Planet ${newPlanet.name} has been registered successfully!`;
    resetForm();
    loadPlanets();
  } catch (error) {
    console.error('Error saving planet:', error);
    alert('Failed to save planet. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  planetForm.value = {
    name: '',
    description: '',
    image: ''
  };
  errors.value = {
    name: '',
    description: '',
    image: ''
  };
  imageError.value = false;
  successMessage.value = '';
};

// Handle image error
const handleImageError = () => {
  imageError.value = true;
};

// Helper functions
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Load planets on component mount
onMounted(() => {
  loadPlanets();
});
</script>

<style scoped>
.planet-register-page h1 {
  margin-bottom: 30px;
}

.planet-form-container {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 40px;
}

.planet-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-control.error {
  border-color: var(--error-color);
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.image-preview {
  margin-top: 20px;
}

.image-preview h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.success-message-container {
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 40px;
  text-align: center;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.success-message i {
  font-size: 48px;
  color: var(--success-color);
}

.registered-planets {
  margin-top: 40px;
}

.registered-planets h2 {
  margin-bottom: 20px;
}

.no-planets {
  text-align: center;
  padding: 30px;
  background-color: var(--card-bg);
  border-radius: 8px;
}

.planet-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.planet-image {
  height: 200px;
  overflow: hidden;
}

.planet-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.planet-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.planet-description {
  margin: 10px 0;
  flex-grow: 1;
}

.planet-date {
  font-size: 12px;
  color: #666;
  margin-top: auto;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
}
</style>