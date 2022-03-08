import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    const { todos, hideCompleted, toggleCompleted } = this.props
    return (
      <div>
        {todos.map(todo=>{
        return hideCompleted && todo.completed ? null :
        <Todo toggleCompleted={toggleCompleted} key={todo.id} todo={todo}/>
        })}
      </div>
    )
  }
}
