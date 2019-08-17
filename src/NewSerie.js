import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios.get('/api/genres/')
      .then(res => {
        setGenres(res.data.data)
        const genres = res.data.data
        const encontrado = genres.find(value => data.genre === value.name)
        if (encontrado) {
          setGenreId(encontrado.id)
        }
      })
  }, [data])

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const save = () => {
    if (form.name && form.comments && form.status && genreId) {
      axios.post('/api/series', {
        ...form,
      }).then(res => setSuccess(true)
      )
    } else {
      return alert('Preencha todos os campos!')
    }
  }
  if (success) {
    return <Redirect to='/series' />
  }

  const cancel = () => {
    return <Redirect to='/series' />
  }
  return (
    <div>
      <div className='container' style={{minHeight: 600 + 'px'}}>
        <h1 className='mt-3 pt-5 text-secondary'>Nova Série</h1>
        <form className='mb-5'>
          <div className='row'>
            <div className="form-group col-12  col-md-6">
              <label htmlFor='name'>Nome:</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série' />
            </div>
            <div className="form-group col-12  col-md-6">
              <label htmlFor='name'>Comentários:</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Comentários' />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-12  col-md-4'>
              <label htmlFor='name'>Gênero</label>
              <select className='form-control' onChange={onChangeGenre} value={genreId}>
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </select>
            </div>
            <div className='col-12  col-md-3'>
              <div className='form-check'>
                <input className='form-check-input' type='radio' checked={form.status === 'Assistido'} name='status' id='assistido' value='Assistido' onChange={seleciona('Assistido')} />
                <label className='form-check-label' htmlFor='assistido'>Assistido</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' checked={form.status === 'Assistindo'} name='status' id='assistindo' value='Assistindo' onChange={seleciona('Assistindo')} />
                <label className='form-check-label' htmlFor='assistindo'>Assistindo</label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' checked={form.status === 'Para assistir'} name='status' id='paraAssistir' value='Para assistir' onChange={seleciona('Para assistir')} />
                <label className='form-check-label' htmlFor='paraAssistir'>Para assistir</label>
              </div>
            </div>
            <div className='col-md-5 mt-4'>
              <button type='button' onClick={save} className='btn btn-primary mr-3'>Salvar</button>
              <button onClick={cancel} className='btn btn-danger mt-md-0'>Cancelar Edição</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewSerie