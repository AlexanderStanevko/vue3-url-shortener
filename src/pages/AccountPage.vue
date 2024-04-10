<template>
  <q-page class="column items-center justify-evenly">
    <div class="animated-welcome">
      Welcome, <span>{{ userName }}</span>!
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUserStore } from 'stores/UserStore';

export default defineComponent({
  name: 'AccountPage',
  setup() {
    const userStore = useUserStore();
    const userName = computed(() => userStore.userData?.name);

    return {
      userName,
    };
  },
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animated-welcome {
  animation: fadeIn 2s ease-in-out;
  font-size: 44px;
  font-weight: bold;
  color: #1976D2;
}

.animated-welcome span {
  color: #D32F2F; 
}
</style>
