import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Genres = () => {
  //Carregar todos os gêneros
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('./api/genres').then(res => {
      setData(res.data.data)
    })
  }, [])

  //Deletar gênero
  const deleteGenero = id => {
    axios.delete('/api/genres/' + id)
      .then(res => {
        const filtered = data.filter(item => item.id !== id)
        setData(filtered)
      })
  }

  //Para cada resultado de gênero, renderiza uma linha com o resultado
  const renderLine = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger mr-3' onClick={() => deleteGenero(record.id)}>Remover</button>
          <Link to={'/genres/' + record.id} className='btn btn-warning'>Editar</Link>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link to='/genres/new' className='btn btn-primary'>Cadastrar novo gênero</Link>
        <div className='alert text-center center alert-warning' role='alert'>
          Não existem gêneros cadastrados.
      </div>
      </div>
    )
  }

  return (
    <div className='container col-sm-8 col-lg-5 mb-5 pb-5'>
      <h1 className='mt-3 text-secondary pt-5'>Gêneros</h1>
      <Link to='/genres/new' className='btn btn-primary mb-3'>Cadastrar novo gênero</Link>
      <table className='table table-dark table-hover text-center mb-5 pb-5'>
        <thead>
          <tr>
            <th scope='col-3'>Id</th>
            <th scope='col-4 col-md-5'>Gênero</th>
            <th scope='col-5 col-md-4'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLine)}
        </tbody>
      </table>
    </div>
  )
}

export default Genres