<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title
          class="cursor-pointer"
          @click="goHome"
        >
          <q-icon
            name="public"
            style="font-size: 40px"
          />
          {{ mainLabel }}
        </q-toolbar-title>
        <q-tabs
          align="left"
          dense
        >
          <q-route-tab
            name="dashboard"
            :label="isDesktop ? 'Dashboard' : ''"
            icon="dashboard"
            to="/app/dashboard"
          />
          <q-route-tab
            name="links"
            :label="isDesktop ? 'Links' : ''"
            icon="link"
            to="/app/links"
          />
        </q-tabs>
        <q-btn-dropdown
          flat
          round
          dense
          icon="account_circle"
          style="margin-left: auto"
          stretch
          :label="accountLabel"
        >
          <q-list>
            <q-item
              v-close-popup
              clickable
              @click="goToSettings"
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section> Settings </q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="onLogout"
            >
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/UserStore';
import { useLogout } from 'utils/logout';
import responsive from 'utils/responsive';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const logout = useLogout();
    const menuOpen = ref(false);
    const { isDesktop } = responsive;

    const mainLabel = computed(() => (isDesktop.value ? 'Url Shortener' : ''));

    const accountLabel = computed(() =>
      isDesktop.value ? userStore.getUser?.fullName : ''
    );
    const goToSettings = () => {
      router.push('/settings');
    };

    const goHome = () => {
      router.push('/');
    };

    const onLogout = () => {
      logout();
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      ...responsive,
      menuOpen,
      mainLabel,
      accountLabel,
      goToSettings,
      onLogout,
      toggleMenu,
      goHome,
    };
  },
});
</script>

<style scoped lang="scss">
.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.q-toolbar {
  &__title {
    max-width: max-content;
  }
}

img {
  vertical-align: middle;
}
</style>
