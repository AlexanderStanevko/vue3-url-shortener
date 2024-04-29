<template>
  <q-page class="links-page column items-center q-pa-md gap__20">
    <div class="full-width">
      <div class="animated-welcome text-center">Links Page!</div>
      <q-form class="form-container" @submit.prevent="onSubmit">
        <div class="row justify-center gap__10">
          <q-select
            v-model="selectedDomain"
            filled
            :options="domains"
            label="Short domain"
            class="domain-selector col-3"
            dense
          />
          <q-input
            v-model="url"
            filled
            placeholder="Enter a link to shorten it"
            class="url-input col-7"
            dense
            :rules="urlFieldRules"
          />
          <q-btn
            label="Shorten"
            type="submit"
            color="primary"
            class="shorten-button"
            :loading="isLoading"
            :disable="isLoading"
          />
        </div>
        <div class="link-list q-mt-xl">
          <transition-group name="list" tag="div" appear>
            <LinkDisplayCard
              v-for="link in urlList"
              :id="link.id"
              :key="link.id"
              :url-data="link"
              :is-loading="isDeletingUrl"
              @delete="onDeleteLink"
            />
          </transition-group>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUrlShortenerStore } from 'stores/UrlShortenerStore';
import { useUserStore } from 'stores/UserStore';
import { notificationSuccess } from 'utils/notifications';
import { urlFieldRules } from 'utils/rules';
import LinkDisplayCard from 'components/LinkDisplayCard.vue';
import responsive from '../utils/responsive';

export default defineComponent({
  name: 'LinksPage',
  components: {
    LinkDisplayCard,
  },
  setup() {
    const userStore = useUserStore();
    const urlStore = useUrlShortenerStore();
    const userName = ref(userStore.getUser?.fullName);
    const url = ref('');
    const isLoading = ref(false);
    const isDeletingUrl = ref(false);

    const urlList = computed(() => urlStore.getAllUrls);

    const domains = ['http://short.est', 'http://short.ly'];
    const selectedDomain = ref(domains[0]);

    const onGetAll = async () => {
      try {
        isLoading.value = true;
        await urlStore.getAll();
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onCreate = async () => {
      debugger;
      if (!url.value) return;

      try {
        isLoading.value = true;

        const res = await urlStore.createShortUrl({
          originalUrl: url.value,
        });

        return res;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onDeleteLink = async (id: number) => {
      if (!id && id !== 0) return;

      try {
        isDeletingUrl.value = true;

        const res = await urlStore.deleteShortUrl(id);

        if (res?.success) {
          notificationSuccess({
            message: res.message,
          });
        }

        return res;
      } catch (error) {
        console.error(error);
      } finally {
        isDeletingUrl.value = false;
      }
    };

    const onSubmit = async () => {
      debugger;
      const res = await onCreate();
      if (res) {
        notificationSuccess({
          message: 'The URL was successfully shortened',
        });
      }
    };

    onMounted(async () => {
      await onGetAll();
    });

    return {
      ...responsive,
      userName,
      selectedDomain,
      url,
      domains,
      onSubmit,
      urlFieldRules,
      onDeleteLink,
      urlList,
      isLoading,
      isDeletingUrl,
    };
  },
});
</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.list-enter,
.list-leave-to {
  transform: translateY(20px);
  opacity: 0;
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

.links-page {
  max-width: 800px;
  width: 100%;
}

.animated-welcome {
  animation: fadeIn 2s ease-in-out;
  font-size: 44px;
  font-weight: bold;
  color: #1976d2;
}

.url-shortener-container {
  padding: 10px;
  gap: 10px;
}

.domain-selector,
.url-input,
.shorten-button {
  height: 60px;
}

.shorten-button {
  width: 100%;
  max-width: 350px;
}

.form-container {
  max-width: 800px;
  width: 100%;
  .row {
    width: 100%;
    .col {
      min-width: 0;
    }
  }
}

.url-input {
  flex-grow: 4;
}

.form-container {
  width: 100%;
}

.shortened-url {
  font-weight: bold;
  color: #1976d2;
}

.shortened-url a {
  color: #1976d2;
  text-decoration: none;
}
</style>
