import React, {useRef, useState, useEffect} from 'react'
import { Todo } from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdOutlineDone} from 'react-icons/md'
import "./styles.css"
import { TodoList } from './TodoList'

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const SingleTodo = ({todo,todos,setTodos}:Props) => {
    const [edit, setEdit] = useState <boolean>(false);
    const [editTodo, setEditTodo] = useState <string>(todo.todo);


    //to delete the task we filter the tasks that don't have the 
    //onclicked id
    const handleDelete = (id:number) =>{
        setTodos(todos.filter((todo)=> todo.id !==id))
    }

    const handleDone = (id:number) => {
        // if the todo matches with the id we copy the todo but changing its state to done
        // if it does not match we will return the current todo
        setTodos(todos.map((todo) => 
            todo.id == id?{...todo,isDone:!todo.isDone}:todo
        ))
    }

    const handleEdit = (e:React.FormEvent,id:number) => {
        e.preventDefault()

        //when its submited the todos are updated and if its the todo
        //with the updated id, we update the todo with the new value (editTodo)
        //otherwise if its not the same id we keep the same todo
        setTodos(todos.map((todo)=>(
            todo.id === id?{...todo, todo:editTodo} : todo
        )))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])
    


  return (
    <form className='todos__single' onSubmit={(e)=>handleEdit(e, todo.id)}>

        {/* Edit mode */}
        {/* If the edit mode is on it will display an input to edit the text
        if not, it will display the task */}
        {
            edit ? (
                <input
                    ref = {inputRef} 
                    value={editTodo} 
                    onChange={(e)=>setEditTodo(e.target.value)} 
                    className='todos_singe--test'/>
            ):(
                todo.isDone? (
                    // if the task is done we strike it with the "s" tag otherwise is shown as normal
                    <s className='todos__single--text'>
                        {todo.todo}
                    </s>
                ) : (
                    <span className='todos__single--text'>
                        {todo.todo}
                    </span>
                )
            )
        }

        <div>
            {/* if edit is one and its not done */}
            <span className='icon' onClick={()=>{
                if(!edit && !todo.isDone) {
                    setEdit(!edit)
                }
            }}>
                <AiFillEdit/>
            </span>
            <span className='icon' onClick={()=>handleDelete(todo.id)}>
                <AiFillDelete/>
            </span>
            <span className='icon' onClick={()=>handleDone(todo.id)}>
                <MdOutlineDone/>
            </span>
        </div>
    </form>
  )
}
