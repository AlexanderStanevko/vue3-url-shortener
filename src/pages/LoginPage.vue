<template>
  <q-page class="column items-center justify-evenly">
    <LoginForm />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from 'components/LoginForm.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
  },
  setup() {},
});
</script>
