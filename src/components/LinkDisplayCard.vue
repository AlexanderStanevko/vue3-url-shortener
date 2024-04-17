<template>
  <div
    class="link-display-card q-pa-md row justify-between items-center full-width"
  >
    <div class="q-gutter-sm col-12 col-md-7">
      <div class="q-mb-xs cursor-pointer" @click="copyLink">
        <q-icon name="content_copy" class="link-icon" />
        <span class="short-link">{{ shortLink }}</span>
      </div>
      <div class="full-link q-mb-xs">
        {{ longLink }}
      </div>
    </div>
    <div class="clicks-info row col-12 col-md-4 text-right">
      <div>
        <q-icon name="touch_app" class="clicks-icon" />
        <span>1 click</span>
      </div>
      <span class="owner">{{ name }}</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
    <q-icon name="delete" class="delete-icon" @click="emitDelete" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { notificationSuccess } from 'utils/notifications';
import { useUserStore } from '../stores/UserStore';

export default defineComponent({
  name: 'LinkDisplayCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    shortLink: {
      type: String,
      required: true,
    },
    longLink: {
      type: String,
      required: true,
    },
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const userStore = useUserStore();

    const name = computed(() => userStore.getUser?.name);
    const formattedDate = computed(() => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date());
    });

    const copyLink = () => {
      navigator.clipboard
        .writeText(props.shortLink)
        .then(() => {
          notificationSuccess({
            message: 'Successfully copied to clipboard',
          });
        })
        .catch((err) => console.error('Could not copy text: ', err));
    };

    const emitDelete = () => {
      emit('delete', props.id);
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

  .full-link {
    font-size: 14px;
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
  }

  .short-link {
    font-weight: bold;
    color: $primary;
    margin-left: 8px;
  }

  .full-link {
    color: #424242;
    font-size: 0.8rem;
  }

  .clicks-info {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    .owner {
      margin-left: 16px;
      font-weight: bold;
    }
    .date {
      margin-left: auto;
    }
  }

  .more-btn {
    background-color: $primary;
    color: white;
  }
}
</style>
