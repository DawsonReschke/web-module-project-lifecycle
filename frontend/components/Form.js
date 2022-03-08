import React from 'react'

export default class Form extends React.Component {
  render() {
    const {submitForm,onChange, form:{nameInput}} = this.props
    return (
      <div>
        <form>
          <input
            type={'text'}
            value={nameInput}
            placeholder="Type todo" 
            onChange={onChange}
            />
          <input
            onClick={(evt)=>{
                evt.preventDefault()
                submitForm()
            }}
            type={'submit'} 
            />
        </form>
      </div>
    )
  }
}
