<template>
  <div
    class="link-display-card q-pa-md row justify-between items-center full-width"
  >
    <div class="q-gutter-sm col-12 col-md-7">
      <div class="q-mb-xs cursor-pointer" @click="copyLink">
        <q-icon name="content_copy" class="link-icon" />
        <span class="short-link">{{ urlData?.shortenedUrl }}</span>
      </div>
      <div class="full-link q-mb-xs">
        {{ urlData?.originalUrl }}
      </div>
    </div>
    <div class="clicks-info row col-12 col-md-4 justify-start">
      <div>
        <q-icon name="touch_app" class="clicks-icon" />
        <span>0 click</span>
      </div>
      <div class="owner">
        {{ name }}
      </div>
      <div class="date">
        {{ formattedDate }}
      </div>
    </div>
    <q-icon name="delete" class="delete-icon" @click="emitDelete" />
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
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const userStore = useUserStore();

    const name = computed(() => userStore.getUser?.fullName);

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
        new Date(props.urlData?.createdAt as Date)
      );
    });

    const copyLink = () => {
      navigator.clipboard
        .writeText(props.urlData?.shortenedUrl as string)
        .then(() => {
          notificationSuccess({
            message: 'Successfully copied to clipboard',
          });
        })
        .catch((err) => console.error('Could not copy text: ', err));
    };

    const emitDelete = () => {
      emit('delete', props.urlData?.id);
    };

    return {
      name,
      copyLink,
      emitDelete,
      formattedDate,
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

  .full-link {
    font-size: 19px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .delete-icon {
    color: $negative;
    font-size: 25px;
    cursor: pointer;
  }

  .link-info {
    color: #424242;
  }

  .link-icon,
  .clicks-icon {
    color: $primary;
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
}
</style>
