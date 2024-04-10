<template>
  <q-card class="app-card text-white" :style="cardStyle">
    <q-card-section>
      <slot name="header"></slot>
    </q-card-section>

    <q-card-section>
      <slot></slot>
    </q-card-section>

    <q-card-section>
      <slot name="footer"></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppCard',
  props: {
    cardStyle: {
      type: Object,
      default: () => ({
        background: 'linear-gradient(135deg, #f5f5f5 0%, #c0c0c0 100%)',
        boxShadow:
          '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }),
    },
  },
});
</script>

<style scoped>
.app-card {
  width: 100%;
  max-width: 758px;
  min-height: 360px;
  border-radius: 4px;
}
</style>
