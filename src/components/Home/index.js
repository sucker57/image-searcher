import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusTexts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {searchVal: '', imagesList: [], apiStatus: apiStatusTexts.initial}

  manipul = event => {
    this.setState({searchVal: event.target.value})
  }

  datafetch = async () => {
    const {searchVal} = this.state
    const url = `https://api.pexels.com/v1/search?query=${searchVal}&per_page=500`
    const data = await fetch(url)
    const objectData = await data.json()
    const imagesList = objectData.photos
    if (imagesList.length === 0) {
      this.setState({imagesList, apiStatus: apiStatusTexts.failure})
    } else {
      this.setState({imagesList, apiStatus: apiStatusTexts.success})
    }
  }

  renderLoadingView = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#000000" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure">
      <h1>Sorry, no images found</h1>
      <p>Try something else....!</p>
    </div>
  )

  renderImagesList = () => {
    const {imagesList} = this.state
    return (
      <div className="image-container">
        <h1 className="container-head">Images Reasults</h1>
        <ul className="vinnu">
          {imagesList.map(eachItem => (
            <li key={eachItem.id}>
              <img src={eachItem.src.small} alt={eachItem.alt} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getImages = event => {
    if (event.key === 'Enter') {
      this.setState({apiStatus: apiStatusTexts.inProgress})
      this.datafetch()
    }
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusTexts.success:
        return this.renderImagesList()
      case apiStatusTexts.failure:
        return this.renderFailureView()
      case apiStatusTexts.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  islogout = () => {
    localStorage.removeItem('current_user')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {searchVal} = this.state
    const currentUser = JSON.parse(localStorage.getItem('current_user'))
    if (currentUser === null) {
      return <Redirect to="/login" />
    }
    return (
      <div className="homesearch">
        <div className="ser-first-container">
          <div>
            <h1>Images search </h1>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
                alt="search-icon"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search Image"
                className="search-input"
                value={searchVal}
                onChange={this.manipul}
                onKeyDown={this.getImages}
              />
            </div>
          </div>
          <button
            type="button"
            className="but-container"
            onClick={this.islogout}
          >
            <img
              src="https://cdn.pixabay.com/photo/2017/05/29/23/02/logging-out-2355227_1280.png"
              alt="log-out"
              className="but-image"
            />
          </button>
        </div>
        <div>{this.renderFinalView()}</div>
      </div>
    )
  }
}

export default Home
