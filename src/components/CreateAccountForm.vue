<template>
  <div>
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Create your account</h4>
      </template>
      <template #default>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <q-input
            v-model="name"
            filled
            label="Full name *"
            lazy-rules
            square
            class="full-width q-my-md"
            :rules="[(value) => value.length > 0]"
          />
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
            :rules="passwordFieldRules"
            class="full-width q-my-md"
          >
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwordConfirm"
            filled
            label="Confirm Password *"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            :rules="[(val) => val === password || 'Passwords do not match!']"
            square
            class="full-width q-my-md"
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
                label="Create Account"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
          </div>
        </q-form>
      </template>
      <template #footer>
        <p class="text-dark text-center">
          Registering for an account will give you access to all the features
          and benefits of our service. Already have an account?
          <span class="login-link" @click="goToLogin">Log in</span>.
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
  name: 'AccountCreationForm',
  components: {
    AppCard,
    AppRoundedBtn,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const onReset = () => {
      name.value = '';
      email.value = '';
      password.value = '';
      passwordConfirm.value = '';
      showPassword.value = false;
    };

    const onSubmit = () => {
      userStore.createUser({
        name: name.value,
        email: email.value,
        password: password.value,
      });

      notificationSuccess({
        message: 'Your account has been successfully created',
      });

      router.push({
        name: 'Dashboard',
      });
    };

    const goToLogin = () => {
      router.push({
        name: 'LoginPage',
      });
    };

    return {
      name,
      email,
      password,
      passwordConfirm,
      onSubmit,
      onReset,
      showPassword,
      togglePasswordVisibility,
      emailFieldRules,
      passwordFieldRules,
      goToLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-card {
  width: 100%;
  max-width: 758px; /* Adjust the max width as needed */
}
.login-link {
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: $primary;
}
</style>
