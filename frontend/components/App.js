// lib imports
import React from 'react'
import axios from 'axios'
// component imports
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  todos:[],
  form:{
    nameInput:'',
  },
  hideCompleted:false,
  errorMessage:''
}

export default class App extends React.Component {
  state = initialState

  // lifecycle methods
  componentDidMount(){
    this.updateTodos(); 
  }

  // api methods
  updateTodos = () =>{
    axios.get(URL)
      .then((res)=>{
        this.setState({...this.state,todos:res.data.data})
      })
      .catch(err=>errorCallback(err))
    }

    toggleCompleted = id =>{
      axios.patch(`${URL}/${id}`)
      .then(res=>{
        this.setState({
          ...this.state,
          todos:this.state.todos.map(todo=>{
            return todo.id === id ? res.data.data : todo
          })
        })
      })  
      .catch(err=>errorCallback(err))
    }

    submitForm = () =>{
      axios.post(URL,{name:this.state.form.nameInput})
      .then(res=>{
        this.setState({
          ...this.state,
          todos:[...this.state.todos,res.data.data]
        })
      })
      .catch(err=>errorCallback(err))
      .finally(()=>{
        this.setState({
          ...this.state,
          form:{nameInput:''}
        })
      })
  }

  // state methods
  toggleShowingCompleted = () =>{
    this.setState({
      ...this.state,
      hideCompleted: !this.state.hideCompleted
    })
  }
  
  onFormChange = (evt) =>{
    this.setState({
      ...this.state,
      form:{
        nameInput:evt.target.value
      }
    })
  }

  //helper methods
  errorCallback = (err) => this.setState({...this.state,errorMessage:err})


  render() {
    const {todos, hideCompleted, form} = this.state
    return(
    <div>
      <h2>Todos:</h2>
      <TodoList
        hideCompleted={hideCompleted} 
        toggleCompleted={this.toggleCompleted} 
        todos={todos} 
        />
      <Form 
        submitForm={this.submitForm} 
        form={form} 
        onChange={this.onFormChange}
        />
      <button
        onClick={this.toggleShowingCompleted}
        >{hideCompleted ? "Show Completed" : "Hide Completed"}</button>
    </div>
    )
  }
}
