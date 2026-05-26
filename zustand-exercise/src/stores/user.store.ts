import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  firstname: string
  lastname: string
  age: number
  hobbies: string[]
}

type UserState = {
  users: User[]
  addUser: (user: Omit<User, 'id'>) => void
  deleteUser: (id: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              id: crypto.randomUUID(),
              firstname: user.firstname,
              lastname: user.lastname,
              age: user.age,
              hobbies: user.hobbies,
            },
          ],
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    {
      name: 'zustand-user-storage',
    },
  ),
)
