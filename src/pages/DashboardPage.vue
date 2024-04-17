<template>
  <q-page class="dashboard-page">
    <div class="animated-welcome text-center">
      Dashboard Page
    </div>
    <div class="card-container">
      <!-- Total Visits Card -->
      <AppCard class="dashboard-card">
        <template #header>
          <h4 class="h4 text-dark text-center">Total Visits</h4>
        </template>
        <template #default>
          <div class="text-dark text-center statistic-value">
            <h2>220</h2>
          </div>
        </template>
      </AppCard>

      <!-- Unique Visits Card -->
      <AppCard class="dashboard-card">
        <template #header>
          <h4 class="h4 text-dark text-center">Unique Visits</h4>
        </template>
        <template #default>
          <div class="text-dark text-center statistic-value">
            <h2>22</h2>
          </div>
        </template>
      </AppCard>
    </div>

    <!-- Most Active Links -->
    <div class="most-active-links bg-primary text-white q-pa-md q-mb-md">
      <h4 class="h4 text-center q-mb-md">Most Active Links</h4>
      <div class="links-content bg-grey-1 text-dark q-pa-md">
        <!-- <q-separator color="orange" /> -->
        <div v-for="(link, index) in links" :key="link.id" class="q-mb-md">
          <div class="col q-gutter-sm">
            <div class="row justify-start items-center">
              <q-btn
                flat
                round
                icon="content_copy"
                class="copy-button"
                @click="copyLink(link.url)"
              />
              <span class="link-url">{{ link.url }}</span>
            </div>
          </div>
          <q-separator v-if="index < links.length - 1" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useUserStore } from 'stores/UserStore';
import { notificationSuccess } from 'utils/notifications';
import AppCard from 'components/App/AppCard.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    AppCard,
  },
  setup() {
    const userStore = useUserStore();
    const userName = computed(() => userStore.userData?.name);

    const links = ref([
      { id: 1, url: 'http://example.com/1' },
      { id: 2, url: 'http://example.com/2' },
      { id: 3, url: 'http://example.com/3' },
      { id: 4, url: 'http://example.com/4' },
      { id: 5, url: 'http://example.com/5' },
      { id: 6, url: 'http://example.com/6' },
    ]);

    const copyLink = (url: string) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            notificationSuccess({
              message: 'Successfully copied to clipboard',
            });
          })
          .catch((err) => {
            console.error('Could not copy text: ', err);
          });
      }
    };

    return {
      userName,
      links,
      copyLink,
    };
  },
});
</script>

<style scoped lang="scss">
.dashboard-page {
  padding: 16px;
  max-width: 800px;
  width: 100%;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  max-width: 800px;
  width: 100%;
  margin-bottom: 20px;
  gap: 10px;
}

.statistic-value h2 {
  font-size: 36px;
  font-weight: bold;
}

@media (max-width: 600px) {
  .statistic-value h2 {
    font-size: 28px;
  }
}

.dashboard-card {
  flex-basis: calc(
    50% - 10px
  );

  @media (max-width: 600px) {
    flex-basis: 100%;
  }
}

.copy-button {
  margin-right: 8px;
}

.link-url {
  font-size: 1.25rem;
  word-break: break-all; 
}

.most-active-links {
  width: 100%;
  min-height: 150px;
  border-radius: 4px; 

  .links-content {
    min-height: 100px; 
    border-radius: 4px;
  }
}

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
  color: #1976d2;
}

.animated-welcome span {
  color: #d32f2f;
}
</style>
