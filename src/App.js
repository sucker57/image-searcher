import './App.css'
import {Route, Switch} from 'react-router-dom'
import SignupForm from './components/signupPage'
import LoginPage from './components/loginPage'
import Home from './components/Home'

// Replace your code here
const App = () => {
  const details = localStorage.getItem('user_details')
  if (details === null) {
    const detailsList = []
    localStorage.setItem('user_details', JSON.stringify(detailsList))
  }
  return (
    <Switch>
      <Route exact path="/sign-up" component={SignupForm} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={Home} />
    </Switch>
  )
}
export default App
