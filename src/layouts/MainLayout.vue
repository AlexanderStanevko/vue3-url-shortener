<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Url Shortener </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="flex flex-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
});
</script>

<style scoped>
.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* padding-top: 100px; */
}
</style>
