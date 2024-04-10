<template>
  <q-btn
    class="app-rounded-btn"
    :color="color"
    :label="label"
    :rounded="rounded"
    :unelevated="unelevated"
  >
    <template
      v-for="(slot, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot
        :name="slotName"
        v-bind="slotProps ?? {}"
      ></slot>
    </template>
  </q-btn>
</template>

<script lang="ts">
import { QBtnProps } from 'quasar'
import { PropType, defineComponent } from 'vue'
export default defineComponent({
  name: 'AppRoundedBtn',
  props: {
    color: {
      type: String as PropType<QBtnProps['color']>,
      default: 'primary',
    },
    label: {
      type: String as PropType<QBtnProps['label']>,
      default: '',
    },
    rounded: {
      type: Boolean as PropType<QBtnProps['rounded']>,
      default: false,
    },
    unelevated: {
      type: Boolean as PropType<QBtnProps['unelevated']>,
      default: true,
    },
  },
  setup (props, { slots }) {
    return {
      slots,
    }
  },
})
</script>

<style lang="scss">
.app-rounded-btn {
  font-weight: 500;
  height: 56px;
  letter-spacing: 1.25px;

  &.q-btn--outline::before {
    border-width: 2px;
  }
}
</style>
