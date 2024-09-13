<template>
  <header>
    <BHeader />
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import BHeader from './components/BHeader.vue';
</script>

<style scoped>
header {
  margin-bottom: 20px;
}
</style>