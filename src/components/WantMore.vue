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
              support.
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
        <div class="text-dark text-center q-mt-md">
          Already have an account?
          <span class="login-link" @click="onLogin">Log in here.</span>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AppCard from 'components/App/AppCard.vue';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';

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

    const onLogin = () => {
      router.push({ name: 'LoginPage' });
    };

    return {
      onCreateAccount,
      onLogin,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-link {
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  color: $primary;
}

</style>