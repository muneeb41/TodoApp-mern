import TodoApp from './components/todo app/TodoApp'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Navbar from './components/todo app/Navbar'
import Signin from './components/todo app/Signin'
import Login from './components/todo app/Login'

function App() {
 

  return (
    <Provider store={store}>
      <Router>
          <Navbar/>
          <Routes>
              <Route path='/' element={<TodoApp/>} />
              <Route path='/signin' element={<Signin/>} />
              <Route path='/login' element={<Login/>} />
          </Routes>
      </Router>
    </Provider>
    
  )
}

export default App
