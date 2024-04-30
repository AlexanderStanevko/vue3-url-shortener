<template>
  <div
    class="link-display-card q-pa-md row justify-between items-center full-width"
  >
    <div class="q-gutter-sm col-12 col-md-7">
      <div class="q-mb-xs cursor-pointer row">
        <q-icon
          name="content_copy"
          size="2rem"
          class="link-icon"
          @click="copyLink"
        />
        <div
          class="short-link q-mb-xs cursor-pointer"
          @click="onRedirect(data?.shortenedUrl || '')"
        >
          {{ data?.shortenedUrl }}
        </div>
      </div>
      <div class="full-link q-mb-xs">
        {{ data?.originalUrl }}
      </div>
    </div>
    <div class="clicks-info row col-12 col-md-4 justify-start">
      <div>
        <q-icon name="touch_app" size="1.5rem" class="clicks-icon" />
        <span>{{ data?.clicks }} clicks</span>
      </div>
      <div class="date">
        {{ formattedDate }}
      </div>
    </div>
    <div class="row justify-center full-width">
      <q-icon
        name="delete"
        :loading="isLoading"
        :disable="isLoading"
        size="2rem"
        class="delete-icon"
        @click="emitDelete"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useUserStore } from 'stores/UserStore';
import { notificationSuccess } from 'utils/notifications';
import { Nullable } from 'utils/nullable';
import { UrlData } from 'types';

export default defineComponent({
  name: 'LinkDisplayCard',
  props: {
    urlData: {
      type: Object as PropType<Nullable<UrlData>>,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const userStore = useUserStore();

    const name = computed(() => userStore.getUser?.fullName);

    const data = computed(() => props.urlData);

    const formattedDate = computed(() => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      return new Intl.DateTimeFormat('ru-RU', options).format(
        new Date(data.value?.createdAt as Date)
      );
    });

    const copyLink = () => {
      navigator.clipboard
        .writeText(data.value?.shortenedUrl as string)
        .then(() => {
          notificationSuccess({
            message: 'Successfully copied to clipboard',
          });
        })
        .catch((err) => console.error('Could not copy text: ', err));
    };

    const onRedirect = (url: string) => {
      window.open(url, '_blank');
    };

    const emitDelete = () => {
      emit('delete', data.value?.id);
    };

    return {
      name,
      copyLink,
      emitDelete,
      formattedDate,
      onRedirect,
      data,
    };
  },
});
</script>

<style scoped lang="scss">
.link-display-card {
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 19px;

  .full-link,
  .short-link {
    font-size: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .delete-icon {
    color: $negative;
    cursor: pointer;
  }

  .link-info {
    color: #424242;
  }

  .link-icon,
  .clicks-icon {
    color: $primary;
    font-size: 2rem;
  }

  .short-link {
    font-weight: bold;
    color: $primary;
    margin-left: 8px;
  }

  .full-link {
    color: #424242;
    font-size: 1rem;
  }

  .clicks-info {
    display: flex;
    align-items: center;
    font-size: 1rem;
    .owner {
      // margin-left: 16px;
      font-weight: bold;
    }
    // .date {
    //   margin-left: auto;
    // }
  }

  .more-btn {
    background-color: $primary;
    color: white;
  }

  @media (max-width: 600px) {
    .short-link {
      margin-left: 0;
    }
  }
}
</style>
