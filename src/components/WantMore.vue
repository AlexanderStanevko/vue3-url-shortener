<template>
  <div>
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Want More? Sign Up For Free!</h4>
      </template>
      <template #default>
        <div class="col justify-center">
          <div class="col-8">
            <p class="text-dark text-center">
              Custom short links, powerful dashboard, detailed analytics, API,
              UTM builder, QR codes, browser extension, app integrations and
              support
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="row justify-center">
          <div class="col-4">
            <AppRoundedBtn
              label="Create Account"
              type="submit"
              color="primary"
              class="full-width"
              @click="onCreateAccount"
            />
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppCard from 'components/App/AppCard.vue';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'WantMore',
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
    const router = useRouter();

    const onCreateAccount = () => {
      router.push({ name: 'CreateAccount' });
    };

    return {
      onCreateAccount
    };
  },
});
</script>