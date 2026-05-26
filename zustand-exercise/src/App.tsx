import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { useUserStore } from './stores/user.store'
import User from './User'

const hobbyOptions = ['Reading', 'Music', 'Sports', 'Coding', 'Travel', 'Gaming']

function App() {
  const users = useUserStore((state) => state.users)
  const addUser = useUserStore((state) => state.addUser)
  const deleteUser = useUserStore((state) => state.deleteUser)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])

  const handleToggleHobby = (hobby: string) => {
    setSelectedHobbies((current) =>
      current.includes(hobby) ? current.filter((value) => value !== hobby) : [...current, hobby],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedAge = Number(age)
    if (!firstname.trim() || !lastname.trim() || !parsedAge || parsedAge <= 0) {
      return
    }

    addUser({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      age: parsedAge,
      hobbies: selectedHobbies,
    })

    setFirstname('')
    setLastname('')
    setAge('')
    setSelectedHobbies([])
  }

  return (
    <main className="app-shell">
      <h1>Zustand User Manager</h1>
      <div className="layout">
        <section className="panel">
          <h2>Users</h2>
          <User users={users} onDelete={deleteUser} />
        </section>

        <section className="panel">
          <h2>Add a User</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <label>
              First name
              <input
                type="text"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                placeholder="First name"
              />
            </label>

            <label>
              Last name
              <input
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                placeholder="Last name"
              />
            </label>

            <label>
              Age
              <input
                type="number"
                min="1"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Age"
              />
            </label>

            <fieldset>
              <legend>Hobbies</legend>
              <div className="checkbox-group">
                {hobbyOptions.map((hobby) => (
                  <label key={hobby} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedHobbies.includes(hobby)}
                      onChange={() => handleToggleHobby(hobby)}
                    />
                    {hobby}
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="add-button">
              Add User
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default App
