<template>
  <div>
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Login to Your Account</h4>
      </template>
      <template #default>
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="email"
            filled
            label="Email *"
            lazy-rules
            square
            :rules="emailFieldRules"
            class="full-width q-my-md"
          />
          <q-input
            v-model="password"
            filled
            label="Password *"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            square
            class="full-width q-my-md"
            :rules="passwordFieldRules"
          >
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>
          <div class="row">
            <div class="col">
              <AppRoundedBtn
                label="Log In"
                type="submit"
                color="primary"
                :loading="isLoading"
                class="full-width"
                :disable="isLoading"
              />
            </div>
          </div>
        </q-form>
      </template>
      <template #footer>
        <p class="text-dark text-center">
          Don't have an account?
          <a class="link-url" @click="goToRegister">Register here.</a>
        </p>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/UserStore';
import { notificationSuccess } from 'utils/notifications';
import { emailFieldRules, passwordFieldRules } from 'utils/rules';
import AppCard from 'components/App/AppCard.vue';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';

export default defineComponent({
  name: 'LoginForm',
  components: {
    AppCard,
    AppRoundedBtn,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const isLoading = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const onLogin = async () => {
      if (!email.value || !password.value) return;

      try {
        isLoading.value = true;

        const res = await userStore.login({
          email: email.value,
          password: password.value,
        });

        return res;
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      const res = await onLogin();
      console.log('LOGN: ', res);
      if (res?.success) {
        notificationSuccess({
          message: 'You have successfully logged in',
        });
      }


      router.push({ name: 'Dashboard' });
    };

    const goToRegister = () => {
      router.push({ name: 'CreateAccount' });
    };

    return {
      email,
      password,
      onSubmit,
      showPassword,
      togglePasswordVisibility,
      goToRegister,
      emailFieldRules,
      isLoading,
      passwordFieldRules,
    };
  },
});
</script>
<style lang="scss">
.link-url {
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  color: $primary;
}
</style>
