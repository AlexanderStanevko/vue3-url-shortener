<template>
  <div>
    <h1>Url Shortener</h1>
    <h4 class="text-center">Coming soon...</h4>
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
