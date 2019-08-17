import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoSerie = ({match}) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [name, setName] = useState('')
  const [comments, setComments] = useState('')
  const [success, setSuccess] = useState(false)

  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
    .then(res => {
      setData(res.data)
    })
  }, [match.params.id])

  const onChange = evt => {
    setName(evt.target.value)
  }
  const onChangeComments = evt => {
    setComments(evt.target.value)
  }
  const save = () => {
    axios.post('/api/series', {
      name,
      comments
    }).then(res => setSuccess(true)
    )
  }
  if (success) {
    return <Redirect to='/series' />
  }
  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <pre>{JSON.stringify(data)}</pre>
      <form>
        <div className='row'>
          <div className="form-group col-6">
            <label htmlFor='name'> Nome</label>
            <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Insira o nome da série' />
          </div>
          <div className="form-group col-6">
            <label htmlFor='comments'> Comentários</label>
            <input type='text' value={form.comments} onChange={onChangeComments} className='form-control' id='comments' placeholder='Insira comentários sobre a série' />
          </div>
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default InfoSerie