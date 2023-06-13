import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import DetailedBookItem from './components/DetailedBookItem'
import PageNotFound from './components/PageNotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:id" component={DetailedBookItem} />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
