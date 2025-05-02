<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li v-if="currentPage > 1">
        <a href="#" @click.prevent="onPageChange(currentPage - 1)" aria-label="Previous page">
          <i class="fas fa-chevron-left"></i>
        </a>
      </li>
      
      <li v-for="page in displayedPages" :key="page">
        <a href="#" 
           @click.prevent="onPageChange(page)" 
           :class="{ active: page === currentPage }">
          {{ page }}
        </a>
      </li>
      
      <li v-if="currentPage < totalPages">
        <a href="#" @click.prevent="onPageChange(currentPage + 1)" aria-label="Next page">
          <i class="fas fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const onPageChange = (page) => {
  emit('page-change', page);
};

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(props.totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});
</script>

<style scoped>
.pagination-container {
  margin: 30px 0;
}
</style>