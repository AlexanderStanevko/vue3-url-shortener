import { Notify, QNotifyCreateOptions } from 'quasar'
import { Nullable } from 'utils/nullable'

interface NotifyCallback {
  (): void;
}

type NotifyHandler = Nullable<NotifyCallback>;

type ActionNotificationOptions = QNotifyCreateOptions & {
  actionLabel: string;
  actionCb: () => void;
}

const DISMISS_ACTION = {
  'aria-label': 'Dismiss',
  'color': 'white',
  'icon': 'close',
}

export const notificationAlert = (options: QNotifyCreateOptions) => {
  const {
    color = 'primary',
    position = 'top',
    progress = true,
    timeout = 5000,
    ...restOptions
  } = options

  Notify.create({
    color,
    position,
    progress,
    timeout,
    ...restOptions,
  })
}

export const notificationSuccess = (options: QNotifyCreateOptions) => {
  const {
    actions = [DISMISS_ACTION],
    color = 'green-1',
    position = 'top',
    progress = true,
    timeout = 5000,
    ...restOptions
  } = options

  Notify.create({
    actions,
    color,
    position,
    progress,
    timeout,
    ...restOptions,
  })
}

export const plannedAlert = () => {
  notificationAlert({
    message: 'plannedFunction',
  })
}

let prevActionDismiss: NotifyHandler = null

export const notificationWithAction = (options: ActionNotificationOptions) => {
  const {
    actionCb = () => {},
    actionLabel = '',
    actions = [
      {
        label: actionLabel,
        color: 'white',
        handler: actionCb,
      },
    ],
    color = 'primary',
    position = 'top',
    timeout = 0,
    ...restOptions
  } = options

  if (prevActionDismiss) {
    prevActionDismiss()
    prevActionDismiss = null
  }

  prevActionDismiss = Notify.create({
    color,
    position,
    timeout,
    actions,
    ...restOptions,
  })
}


let prevErrorAlertDismiss: NotifyHandler = null

export const prevErrorAlertDismissMethod = () => {
  if (prevErrorAlertDismiss) {
    prevErrorAlertDismiss()
    prevErrorAlertDismiss = null
  }
}
export const errorAlert = (options: QNotifyCreateOptions) => {
  const {
    actions = [DISMISS_ACTION],
    color = 'red',
    position = 'top',
    timeout = 10000,
    ...restOptions
  } = options

  prevErrorAlertDismissMethod()

  prevErrorAlertDismiss = Notify.create({
    actions,
    position,
    color,
    timeout,
    ...restOptions,
  })
}

export const htmlAlert = (options: QNotifyCreateOptions) => {
  const {
    actions = [DISMISS_ACTION],
    color = 'primary',
    html = true,
    position = 'top',
    timeout = 5000,
    ...restOptions
  } = options

  Notify.create({
    actions,
    color,
    html,
    position,
    timeout,
    ...restOptions,
  })
}
