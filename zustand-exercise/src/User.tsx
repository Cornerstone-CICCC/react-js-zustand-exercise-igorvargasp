import type { User } from './stores/user.store'

type UserListProps = {
  users: User[]
  onDelete: (id: string) => void
}

export default function User({ users, onDelete }: UserListProps) {
  if (users.length === 0) {
    return <p className="empty-message">No users yet. Add a user to get started.</p>
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-card">
          <div>
            <strong>
              {user.firstname} {user.lastname}
            </strong>
            <p>Age: {user.age}</p>
            <p>Hobbies: {user.hobbies.length ? user.hobbies.join(', ') : 'None'}</p>
          </div>
          <button type="button" className="delete-button" onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
