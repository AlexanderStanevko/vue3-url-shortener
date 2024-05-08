<template>
  <q-page class="dashboard-page">
    <div class="animated-welcome text-center">Dashboard Page</div>
    <div class="card-container">
      <AppCard class="dashboard-card">
        <template #header>
          <h4 class="h4 text-dark text-center">Total Visits</h4>
        </template>
        <template #default>
          <div class="text-dark text-center statistic-value">
            <h2>{{ totalClicks }}</h2>
          </div>
        </template>
      </AppCard>
      <AppCard class="dashboard-card">
        <template #header>
          <h4 class="h4 text-dark text-center">Unique Visits</h4>
        </template>
        <template #default>
          <div class="text-dark text-center statistic-value">
            <h2>{{ uniqueClicks }}</h2>
          </div>
        </template>
      </AppCard>
    </div>
    <div class="most-active-links bg-primary text-white q-pa-md q-mb-md">
      <h4 class="h4 text-center q-mb-md">Most Active Links</h4>
      <div
        v-if="mostActiveLinks.length > 0"
        class="links-content bg-grey-1 text-dark q-pa-md"
      >
        <div
          v-for="(link, index) in mostActiveLinks"
          :key="link.shortenedUrl"
          class="q-mb-md"
        >
          <div class="row justify-start items-center">
            <q-btn
              flat
              round
              icon="content_copy"
              class="copy-button"
              @click="copyLink(link.shortenedUrl)"
            />
            <span class="link-url ellipsis">{{ link.shortenedUrl }}</span>
          </div>
          <q-separator v-if="index < mostActiveLinks.length - 1" />
        </div>
      </div>
      <div v-else class="empty-state text-center">
        <q-icon name="link_off" size="52px" class="q-my-md" />
        <div>No active links to display. Please check back later!</div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useUrlShortenerStore } from 'stores/UrlShortenerStore';
import { notificationSuccess } from 'utils/notifications';
import AppCard from 'components/App/AppCard.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    AppCard,
  },
  setup() {
    const urlStore = useUrlShortenerStore();

    onMounted(async () => {
      await urlStore.getMostActive();
    });

    const mostActiveLinks = computed(() => urlStore.getMostActiveLinks);
    const totalClicks = computed(() => urlStore.getTotalClicks);
    const uniqueClicks = computed(() => urlStore.getUniqueClicks);

    const copyLink = (url: string) => {
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
    };

    return {
      mostActiveLinks,
      totalClicks,
      uniqueClicks,
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

.dashboard-card {
  flex-basis: calc(50% - 10px);
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 70%;
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
</style>

