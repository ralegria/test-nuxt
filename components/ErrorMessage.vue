<template>
  <div class="error-container">
    <div class="error-icon">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <h3 class="error-title">{{ title }}</h3>
    <p class="error-message">{{ message }}</p>
    <slot name="actions">
      <button v-if="retryAction" @click="retryAction" class="btn">
        <i class="fas fa-redo"></i> Try Again
      </button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Something went wrong'
  },
  message: {
    type: String,
    default: 'An error occurred while processing your request.'
  },
  retryAction: {
    type: Function,
    default: null
  }
});
</script>

<style scoped>
.error-container {
  background-color: rgba(244, 67, 54, 0.1);
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.error-icon {
  font-size: 48px;
  color: var(--error-color);
}

.error-title {
  font-size: 20px;
  margin: 0;
}

.error-message {
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}
</style>