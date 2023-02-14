import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class SignupPage extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
    localStorage.removeItem('current_user')
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeRePassword = e => {
    const {password} = this.state
    const passwordInput = document.getElementById('Repass')
    if (e.target.value !== password) {
      passwordInput.classList.remove('match')
      passwordInput.classList.add('un-match')
    } else {
      passwordInput.classList.remove('un-match')
      passwordInput.classList.add('match')
    }
  }

  checkFields = details => {
    const {username, password} = this.state
    const passwordInput = document.getElementById('Repass')
    if (username === '' || password === '' || passwordInput.value === '') {
      this.setState({isError: true, errMsg: 'Please Enter all credentials'})
    } else {
      const {history} = this.props
      const userDetails = [
        ...details,
        {username, password, transactionsList: []},
      ]
      localStorage.setItem('user_details', JSON.stringify(userDetails))
      this.setState({username: '', password: '', isError: false})
      passwordInput.value = ''
      history.replace('/login')
    }
  }

  onSignUp = e => {
    e.preventDefault()
    const {username} = this.state
    const details = JSON.parse(localStorage.getItem('user_details'))
    if (details.length === 0) {
      this.checkFields(details)
    } else {
      let isExisted = false
      details.forEach(eachItem => {
        if (eachItem.username === username) {
          isExisted = true
          this.setState({isError: true, errMsg: 'user already exists'})
        }
      })
      if (!isExisted) {
        this.checkFields(details)
      }
    }
  }

  render() {
    const {username, password, isError, errMsg} = this.state
    return (
      <div className="form-cont">
        <form onSubmit={this.onSignUp}>
          <h1>Sign UP</h1>
          <label htmlFor="name">USERNAME</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Username"
            title="Enter Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label htmlFor="pass">PASSWORD</label>
          <input
            type="password"
            id="pass"
            placeholder="Enter Password"
            title="Enter Password"
            value={password}
            onChange={this.onChangePassword}
          />
          <label htmlFor="Repass">RE-ENTER PASSWORD</label>
          <input
            type="password"
            id="Repass"
            placeholder="Re-Enter Password"
            title="Re-Enter Password"
            className="re-pass-inp"
            onChange={this.onChangeRePassword}
          />
          <button type="submit" className="sign-up-btn">
            SIGN UP
          </button>
          {isError && <p className="err">{errMsg}</p>}
          <p>
            Already a User ?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default SignupPage
