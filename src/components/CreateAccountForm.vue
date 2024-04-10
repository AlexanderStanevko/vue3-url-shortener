<template>
  <div>
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Create your account</h4>
      </template>
      <template #default>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <q-input
            filled
            v-model="name"
            label="Full name *"
            lazy-rules
            square
            class="full-width q-my-md"
            :rules="[(value) => value.length > 0]"
          />
          <q-input
            filled
            v-model="email"
            label="Email *"
            lazy-rules
            square
            :rules="emailFieldRules"
            class="full-width q-my-md"
          />
          <q-input
            filled
            v-model="phone"
            label="Phone number *"
            type="tel"
            mask="(###) ###-####"
            unmasked-value
            lazy-rules
            square
            :rules="phoneFieldRules"
            class="full-width q-my-md"
          />
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
          and benefits of our service.
        </p>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { notificationSuccess } from 'utils/notifications';
import AppCard from 'components/App/AppCard.vue';
import { emailFieldRules, phoneFieldRules } from 'utils/rules';
import AppRoundedBtn from 'components/App/AppRoundedBtn.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/UserStore';

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
    const phone = ref('');

    const onReset = () => {
      name.value = '';
      email.value = '';
      phone.value = '';
    };

    const onSubmit = () => {
      userStore.createUser({
        name: name.value,
        email: email.value,
        phone: phone.value,
      });

      notificationSuccess({
        message: 'Your account has been successfully created',
      });

      onReset();
      router.push({
        name: 'Account',
      });
    };

    return {
      name,
      email,
      phone,
      onSubmit,
      onReset,
      emailFieldRules,
      phoneFieldRules,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-card {
  width: 100%;
  max-width: 758px; /* Adjust the max width as needed */
}
</style>
