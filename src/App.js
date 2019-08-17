import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Genres from './Genres'
import Series from './Series'
import NewGenres from './NewGenres'
import NewSerie from './NewSerie'
import InfoSerie from './InfoSerie'
import EditGenre from './EditGenre'

const homeCover = {
  minHeight: '600px',
  backgroundImage: 'url(https://wallpapercave.com/wp/wp1839581.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: 0.8,
  color: '#fff'
}

const Home = () => {
  return (
    <div style={homeCover}>
      <div className='container'>
        <div className='pt-5'>
          <h1 className='mt-5'>My Series App</h1>
          <h3 className='mt-3'>Gerencie as séries que você mais curte!</h3>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/series' exact component={Series} />
          <Route path='/genres' exact component={Genres} />
          <Route path='/genres/new' exact component={NewGenres} />
          <Route path='/serie/new' exact component={NewSerie} />
          <Route path='/genres/:id' exact component={EditGenre} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
        <Footer className='row h-100 align-items-center h-100'></Footer>
      </div>
    </Router>

  )
}

export default App
