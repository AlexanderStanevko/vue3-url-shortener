<template>
  <div>
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Paste the URL to be shortened</h4>
      </template>
      <template #default>
        <q-form ref="form" @submit.prevent="onSubmit" @reset="onReset">
          <div class="row">
            <div class="col-8">
              <q-input
                ref="urlInput"
                v-model="url"
                filled
                label="URL *"
                lazy-rules
                square
                class="full-width"
                :rules="urlFieldRules"
              />
            </div>
            <div class="col-4">
              <AppRoundedBtn
                label="Shorten URL"
                type="submit"
                square
                color="primary"
                class="full-width"
              />
            </div>
          </div>
          <div
            v-if="result"
            class="text-dark text-center row justify-center items-center"
          >
            <q-icon
              name="content_copy"
              size="2rem"
              color="primary"
              class="link-icon cursor-pointer"
              @click="copyLink"
            />
            <p class="no-margin text-h6">
              {{ result }}
            </p>
          </div>
        </q-form>
      </template>
      <template #footer>
        <p class="text-dark text-center">
          ShortURL is a free tool to shorten URLs and generate short links URL
          shortener allows to create a shortened link making it easy to share
        </p>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { QInput } from 'quasar';
import { ref, defineComponent, nextTick } from 'vue';
import { useUrlShortenerStore } from 'stores/UrlShortenerStore';
import { notificationSuccess } from 'utils/notifications';
import { urlFieldRules } from 'utils/rules';
import AppCard from 'components/App/AppCard.vue';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';

export default defineComponent({
  name: 'UrlShortenerForm',
  components: {
    AppCard,
    AppRoundedBtn,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    noCaps: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const urlStore = useUrlShortenerStore();

    const url = ref('');
    const result = ref('');
    const urlInput = ref<InstanceType<typeof QInput> | null>(null);
    const isLoading = ref(false);

    const onReset = async () => {
      url.value = '';
      if (urlInput.value && urlInput.value.resetValidation) {
        urlInput.value.resetValidation();
        await nextTick();
      }
    };
    const onCreate = async () => {
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
    const copyLink = () => {
      navigator.clipboard
        .writeText(result.value)
        .then(() => {
          notificationSuccess({
            message: 'Successfully copied to clipboard',
          });
        })
        .catch((err) => console.error('Could not copy text: ', err));
    };

    const onSubmit = async () => {
      const res = await onCreate();
      if (res) {
        result.value = res.urlData?.shortenedUrl as string;
        notificationSuccess({
          message: 'The URL was successfully shortened',
        });

        copyLink();

        onReset();
      }
    };

    return {
      url,
      onSubmit,
      onReset,
      copyLink,
      result,
      urlFieldRules,
      urlInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
