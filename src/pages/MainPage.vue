<template>
  <q-page class="column items-center justify-around gap__20">
    <UrlShortenerForm />
    <WantMore />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UrlShortenerForm from 'components/UrlShortenerForm.vue';
import WantMore from 'components/WantMore.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    UrlShortenerForm,
    WantMore,
  },
  setup() {},
});
</script>

