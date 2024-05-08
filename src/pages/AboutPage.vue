<template>
  <q-page class="row justify-center items-center">
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">About URL Shortener</h4>
      </template>
      <template #default>
        <div class="col justify-center">
          <div class="col-8">
            <p class="text-dark text-center">
              Welcome to our URL shortener! Our platform allows you to shorten
              long URLs to make them easier to share and manage. Perfect for
              sharing on social media, through email, or anywhere you need a
              concise link.
            </p>
            <p class="text-dark text-center">
              Our service not only shortens URLs but also provides detailed
              analytics, including the total number of clicks, unique clicks,
              and the most active links for each user. This data helps you
              understand how your links perform, making it invaluable for
              tracking marketing campaigns and general usage.
            </p>
            <p class="text-dark text-center">
              Accessibility is key to our service. You do not need an account to
              start shortening links; however, creating an account will give you
              access to advanced features like detailed analytics and a personal
              dashboard to manage your links.
            </p>
          </div>
        </div>
      </template>
    </AppCard>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppCard from 'components/App/AppCard.vue';

export default defineComponent({
  name: 'AboutPage',
  components: {
    AppCard,
  },
});
</script>

<style lang="scss" scoped>
p {
    font-size: 1.3rem;
}
</style>
