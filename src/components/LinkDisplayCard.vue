<template>
  <div class="link-display-card">
    <div class="link-info q-pa-md">
      <div class="q-mb-xs">
        <q-icon name="link" class="link-icon" />
        <span class="short-link">{{ shortLink }}</span>
      </div>
      <div class="full-link q-mb-xs">
        {{ longLink }}
      </div>
      <div class="clicks-info">
        <q-icon name="touch_app" class="clicks-icon" />
        <span>1 click</span>
        <span class="owner">Ivan</span>
        <span class="date">4/17/24</span>
      </div>
    </div>
    <q-btn icon="more_vert" flat round dense class="more-btn" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LinkDisplayCard',
  props: {
    shortLink: {
      type: String,
      required: true,
    },
    longLink: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.link-display-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .link-info {
    display: flex;
    flex-direction: column;
    color: #424242;
  }

  .link-icon,
  .clicks-icon {
    color: $primary;
  }

  .short-link {
    font-weight: bold;
    color: $primary; 
    margin-left: 8px;
  }

  .full-link {
    color: #424242;
    font-size: 0.8rem;
  }

  .clicks-info {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    .owner {
      margin-left: 16px;
      font-weight: bold;
    }
    .date {
      margin-left: auto;
    }
  }

  .more-btn {
    background-color: $primary;
    color: white;
  }
}
</style>
