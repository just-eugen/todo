import { writable, readable } from 'svelte/store'

export const statusList = readable([
    'todo',
    'inProgress',
    'finished',
])
export const _id = writable(3)
export const tasklist = writable([])


