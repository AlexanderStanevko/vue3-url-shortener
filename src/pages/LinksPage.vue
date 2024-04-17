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
          />
        </div>
        <div v-if="shortenedUrl" class="shortened-url q-mt-md">
          Shortened URL:
          <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'stores/UserStore';
import { notificationSuccess } from 'utils/notifications';
import { urlFieldRules } from 'utils/rules';
import responsive from '../utils/responsive';

export default defineComponent({
  name: 'LinksPage',
  components: {},
  setup() {
    const userStore = useUserStore();
    const userName = ref(userStore.userData?.name);

    const url = ref('');
    const shortenedUrl = ref('');

    const domains = ['http://short.est', 'http://short.ly'];
    const selectedDomain = ref(domains[0]);

    const onSubmit = () => {
      shortenedUrl.value = `http://short.est/${Math.random()
        .toString(36)
        .substr(2, 5)}`;
      notificationSuccess({
        message: 'The URL was successfully shortened',
      });
    };

    return {
      ...responsive,
      userName,
      selectedDomain,
      url,
      domains,
      onSubmit,
      shortenedUrl,
      urlFieldRules,
    };
  },
});
</script>

<style scoped lang="scss">
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
