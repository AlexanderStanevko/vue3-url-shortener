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
                filled
                v-model="url"
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
          <p v-if="result" class="text-dark text-center">
            Shortened URL: {{ result }}
          </p>
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
import { ref, defineComponent, nextTick } from 'vue';
import { notificationSuccess } from 'utils/notifications';
import AppCard from 'components/App/AppCard.vue';
import { urlFieldRules } from 'utils/rules';
import { urlShortener } from 'utils/urlShortener';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';
import { QInput } from 'quasar';

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
    const url = ref('');
    const result = ref('');
    const urlInput = ref<InstanceType<typeof QInput> | null>(null);

    const onReset = async () => {
      url.value = '';
      if (urlInput.value && urlInput.value.resetValidation) {
        urlInput.value.resetValidation();
        await nextTick();
      }
    };

    const onSubmit = () => {
      result.value = urlShortener(url.value);
      if (result.value) {
        notificationSuccess({
          message: 'The URL was successfully shortened',
        });

        onReset();
      }
    };

    return {
      url,
      onSubmit,
      onReset,
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
