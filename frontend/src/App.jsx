import {Routes,Route } from 'react-router-dom'
import './App.css'
import AuthProvider from './AuthContext/AuthProvider'
import ScrollTop from './OnTopScroll/ScrollTop'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Protected from './components/Protected/Protected'
import Meal from './components/Protected/Meal/Meal'
import SelectedMeal from './components/Protected/Meal/SelectedMeal'
import Favourites from './components/Protected/Favourites/Favourites'
import Profiles from './components/Protected/Profiles/Profiles'

const App = () => {
  return (
    <AuthProvider>
        <ScrollTop>
            <Routes>
              
              {/* Login & Register User Account */}
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>

              {/* Protected routes  */}
              <Route path='/meal/' element={<Protected/>}>
                  <Route path=':name?' element={<Meal/>}/>
                  <Route path='id/:mealId' element={<SelectedMeal/>}/>
                  <Route path='favourites/' element={<Favourites/>}/>
                  <Route path='profiles' element={<Profiles/>}/>
              </Route>
              
          </Routes>
        </ScrollTop>
    </AuthProvider>
  )
}

export default App
