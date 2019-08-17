import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Badge } from 'reactstrap'

const Series = () => {
  //Carregar todos os gêneros
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('./api/series').then(res => {
      setData(res.data.data)
    })
  }, [])

  //Deletar gênero
  const deleteSerie = id => {
      axios.delete('/api/series/' + id)
      .then(res => {
        const filtered = data.filter(item => item.id !== id)
        setData(filtered)
      })
  }

  //Para cada resultado de gênero, renderiza um post com o resultado
  const renderLine2 = record => {
    return (
      <div key={record.id} className='col-sm-6 col-12 col-lg-3 col-md-4 text-secondary bg-light shadow p-4'>
        <img className='img-fluid rounded' alt={data.name} src={record.poster} />
        <h5 className='pt-2'>{record.name}</h5>
        <div className='row'>
          <div className='col-5 text-left ' >
            <h5>
              {record.status === 'Assistido' && <Badge className='badge-success mr-3'>Assistido</Badge>}
              {record.status === 'Assistindo' && <Badge className='badge-info mr-3'>Assistindo</Badge>}
              {record.status === 'Para assitir' && <Badge className='badge-warning mr-3'>Para assitir</Badge>}
            </h5>
          </div>
          <div className='col-7 text-right'><p className=''>Gênero: {record.genre}</p></div><div className='lead col-12 mb-2' >
            <button className='btn btn-danger mr-3' onClick={() => deleteSerie(record.id)}>Remover</button>
            <Link to={'/series/' + record.id} className='btn btn-warning'>Info</Link>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link to='/serie/new' className='btn btn-primary mb-3'>Cadastrar nova Série</Link>
        <div className='alert text-center center alert-warning' role='alert'>
          Não existem séries cadastradas.
      </div>
      </div>
    )
  }

  return (
    <div className='container' style={{ marginBottom: 200 + 'px' }} >
      <h1 className='mt-3 pt-5 text-secondary'>Séries</h1>
      <Link to='/serie/new' className='btn btn-primary mb-3'>Cadastrar nova Série</Link>
      <div className='row col mt-4'>
        {data.map(renderLine2)}
      </div>
    </div>
  )
}

export default Series