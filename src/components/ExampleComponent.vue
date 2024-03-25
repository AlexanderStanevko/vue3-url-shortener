<template>
  <div>
    <h1>Url Shortener</h1>
    <h4 class="text-center">Coming soon...</h4>

    <div class="text-center">
      <q-spinner-hourglass
        color="blue"
        size="7em"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo, Meta } from './models';

interface Props {
  title: string;
  todos?: Todo[];
  meta: Meta;
  active: boolean;
};

withDefaults(defineProps<Props>(), {
  todos: () => []
});

</script>
