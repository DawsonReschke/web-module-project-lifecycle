import React from 'react'

export default class Todo extends React.Component {
  render() {
    const { toggleCompleted, todo:{ name, completed, id } } = this.props
    return (
      <p
      style={{"textDecoration":completed ? "line-through":"none"}}
      onClick={()=>{toggleCompleted(id)}}
      >{name}</p>
    )
  }
}
