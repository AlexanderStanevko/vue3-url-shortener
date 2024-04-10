<template>
  <q-page class="column items-center justify-evenly">
    <CreateAccountForm />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateAccountForm from 'components/CreateAccountForm.vue';

export default defineComponent({
  name: 'CreateAccount',
  components: {
    CreateAccountForm,
  },
  setup() {},
});
</script>
