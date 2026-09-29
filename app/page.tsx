"use client"
import { useEffect, useState } from "react";
export default function Home() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [aitodo, setAitodo] = useState("")
  useEffect(() => {
    if (loaded === true) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }


  }, [todos, loaded])

  useEffect(() => {
    const value = localStorage.getItem("todos")
    if (value) {
      const hariu = JSON.parse(value)
      setTodos(hariu)

    }
    setLoaded(true)

  }, [])
  const handlesubmit = async () => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: todo })
    })
    const data = await response.json()
    console.log(data)
    setTodos([...todos, data.todo])
  }
  const handleAI = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Надад энэ сэдвээр нэг богино todo санал болго: ${todo}. Зөвхөн todo-г буцаа.`

      })
    })
    const data = await response.json()
    console.log(data)
    setAitodo(data.ai)
  }
  const handleDelete = (indexDelete: number) => {
    const Updatetodos = todos.filter((item, index) => index != indexDelete)
    setTodos(Updatetodos)
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <input onChange={(e) => setTodo(e.target.value)} className="border" type="text" placeholder="todo bichih" />

        <button onClick={() => {

          handlesubmit()
        }
        } className="border">add</button>
        <button className="border" onClick={handleAI}>ai</button>

        <ul>
          {todos.map((todo, index: number) => {
            return <li key={index}>
              {todo}
              <button onClick={() => handleDelete(index)} className="border">Delete</button>
            </li>

          })}
        </ul>
        <p>{aitodo}</p>
      </div>

    </div >
  )
}
// const handleDelete = (indexToDelete: number) => {
//       const updatedTodo = todo.filter((item, index) => index !== indexToDelete)
//       setTodo(updatedTodo)
//   }