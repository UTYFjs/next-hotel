'use client'
import { useState } from 'react'
import { User } from '../cabins/page'

export default function Counter({users} :{users: User[]}) {
  const [count, setCount] = useState(0)
  console.log(users)
  return <div>
    <p>There are {users.length} users</p>
    <button onClick={() => setCount((c) => c+1)}>{count}</button>
  </div>
}