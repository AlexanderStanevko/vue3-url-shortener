<template>
  <q-page class="row justify-center items-center">
    <AppCard>
      <template #header>
        <h4 class="h4 text-dark text-center">Frequently Asked Questions</h4>
      </template>
      <template #default>
        <div class="col justify-center">
          <div class="col-8">
            <p class="text-dark text-center">
              Our FAQ section helps address some of the common questions you
              might have about using our URL shortening service. Find detailed
              responses to frequently asked questions below.
            </p>
            <ul class="text-dark text-center no-padding">
              <li>
                <strong>How do I create a short link?</strong> - To create a
                short link, simply enter your long URL into the input field on
                our main page and click "Shorten". You don't need an account to
                create short links. For registered users, additional options
                such as custom aliases and tracking are available.
              </li>
              <li>
                <strong>What kind of statistics do I get for my links?</strong>
                - Our service provides detailed analytics for each short link,
                including total clicks, unique clicks, and an overview of the
                most active links if you're a registered user. These statistics
                help you understand how effectively your links are performing.
              </li>
              <li>
                <strong>Can I use the service without signing up?</strong> -
                Absolutely! You can create short links and access basic
                functionality without an account. Signing up will provide you
                with advanced features like detailed analytics and link
                management.
              </li>
              <li>
                <strong>How does the public access feature work?</strong> - All
                short links created are accessible publicly by default. This
                means that anyone with the link can access the URL it redirects
                to, without any restrictions.
              </li>
            </ul>
            <p class="text-dark text-center">
              If your question is not covered here, please feel free to contact
              our support team for more personalized assistance.
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
  name: 'FaqPage',
  components: {
    AppCard,
  },
});
</script>

<style lang="scss" scoped>
li {
  list-style-type: none;
}
p,
li {
  font-size: 1.3rem;
}
</style>
