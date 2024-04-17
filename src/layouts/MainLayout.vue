<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="public" style="font-size: 40px" />
          Url Shortener
        </q-toolbar-title>
        <q-tabs align="left" dense>
          <q-tab
            name="dashboard"
            label="Dashboard"
            to="/dashboard"
            icon="dashboard"
          />
          <q-tab name="links" label="Links" to="/links" icon="link" />
        </q-tabs>
        <q-btn-dropdown
          flat
          round
          dense
          icon="account_circle"
          style="margin-left: auto"
          stretch
          label="Profile"
        >
          <q-list>
            <q-item clickable v-close-popup @click="goToSettings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onLogout">
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogout } from 'utils/logout';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const logout = useLogout();
    const menuOpen = ref(false);

    const goToProfile = () => {
      router.push('/profile');
    };

    const goToSettings = () => {
      router.push('/settings');
    };

    const onLogout = () => {
      logout();
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      goToProfile,
      goToSettings,
      onLogout,
      toggleMenu,
      menuOpen,
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
