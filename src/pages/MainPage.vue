<template>
  <q-page class="row items-center justify-evenly">
    <UrlShortenerForm />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UrlShortenerForm from 'components/UrlShortenerForm.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    UrlShortenerForm,
  },
  setup() {},
});
</script>
