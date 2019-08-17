import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
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

  //Custon Header
  const mainHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    marginTop: '80px'
  }

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
    axios.put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreId
    })
      .then(res => setSuccess(true)
      )
  }
  if (success) {
    return <Redirect to='/series' />
  }

  return (
    <div style={{ marginBottom: 200 + 'px' }}>
      <header style={mainHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'Assistido' && <Badge className='mr-3' color='success'>Assistido</Badge>}
                  {data.status === 'Assistindo' && <Badge className='mr-3' color='info'>Assistindo</Badge>}
                  {data.status === 'Para assitir' && <Badge className='mr-3' color='warning'>Para assitir</Badge>}
                  <small>Gênero: {data.genre}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container mt-3'>
        {mode === 'INFO' &&
          <div className='row'>
            <div className='col-12 col-sm-6'>
              <h1 className='mt-3 text-secondary'>{data.name}</h1>
              <h3 className='mt-3 text-secondary'>{data.comments}</h3>
              <div className='mt-4'>
                <button onClick={() => setMode('EDIT')} className='btn btn-success mb-3 mb-sm-0 float-left'>Editar</button>
                <div className='col-7 float-left text-right'><Link to={'/series'} className='btn btn-primary'>Voltar para séries</Link></div>
              </div>
            </div>

            <div className='col-6 d-none d-sm-block'>
              <div className='col-lg-9 col-md-12 col-12'style={{marginTop: -100 + 'px'}}>
                <img className='img-fluid' alt={data.name} src={data.poster} />
              </div>
            </div>
          </div>
        }
      </div>
      {mode === 'EDIT' &&
        <div className='container'>
          <h1 className='mt-4 text-secondary'>Editar Série</h1>
          <h2 className='mt-3 text-secondary'>{data.name}</h2>
          <form className='mb-5'>
            <div className='row'>
              <div className="form-group col-12 col-md-6">
                <label htmlFor='name'>Nome:</label>
                <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série' />
              </div>
              <div className="form-group col-12 col-md-6">
                <label htmlFor='name'>Comentários:</label>
                <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Comentários' />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-12 col-md-4'>
                <label htmlFor='name'>Gênero</label>
                <select className='form-control' onChange={onChangeGenre} value={genreId}>
                  {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                </select>
              </div>
              <div className='col-12 col-md-3'>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' checked={form.status === 'Assistido'} name='status' id='assistido' value='Assistido' onChange={seleciona('Assistido')} />
                  <label className='form-check-label' htmlFor='assistido'>Assistido</label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' checked={form.status === 'Assistindo'} name='status' id='Assistindo' value='assistindo' onChange={seleciona('Assistindo')} />
                  <label className='form-check-label' htmlFor='Assistindo'>Assistindo</label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' checked={form.status === 'Para assitir'} name='status' id='paraAssistir' value='Para assitir' onChange={seleciona('Para assitir')} />
                  <label className='form-check-label' htmlFor='paraAssistir'>Para assistir</label>
                </div>
              </div>
              <div className='col-12 col-md-5 mt-4'>
                <button type='button' onClick={save} className='btn btn-primary mr-3'>Salvar</button>
                <button onClick={() => setMode('INFO')} className='btn btn-danger'>Cancelar Edição</button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie