import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewGenres = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const onChange = evt => {
    setName(evt.target.value)
  }
  const save = () => {
    axios.post('/api/genres', {
      name
    }).then(res => setSuccess(true)
    )
  }
  if (success) {
    return <Redirect to='/genres' />
  }
  return (
    <div className='container'>
      <h1 className='pt-5 mt-3 text-secondary'>Novo Gênero</h1>
      <form>

        <div className='row'>
          <div className="form-group col-6">
            <label htmlFor='name'>Gênero</label>
            <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Insira o nome do Gênero' />
          </div>
        </div>
          <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default NewGenres