export default class StorageClass {
  storage: Storage

  namespace: string

  constructor (storage: Storage, namespace = process.env.NAMESPACE) {
    this.storage = storage
    this.namespace = namespace as string
  }

  getDecoratedKey (key: string) {
    return this.namespace
      ? `${this.namespace}:${key}`
      : key
  }

  get (key: string, parse = false) {
    const item = this.storage.getItem(this.getDecoratedKey(key)) as string

    return parse
      ? JSON.parse(item)
      : item
  }

  set (key: string, val: unknown, stringify = false) {
    const data = stringify
      ? JSON.stringify(val)
      : val

    this.storage.setItem(this.getDecoratedKey(key), data as string)
  }

  remove (key: string) {
    this.storage.removeItem(this.getDecoratedKey(key))
  }

  empty (key: string) {
    return this.storage.getItem(this.getDecoratedKey(key)) === null
  }

  clear () {
    this.storage.clear()
  }
}

export const LocalStorage = new StorageClass(window.localStorage)
export const SessionStorage = new StorageClass(window.sessionStorage)
