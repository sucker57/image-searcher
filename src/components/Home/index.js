import {Component} from 'react'
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
      <ul className="vinnu">
        {imagesList.map(eachItem => (
          <li key={eachItem.id}>
            <img src={eachItem.src.small} alt={eachItem.alt} />
          </li>
        ))}
      </ul>
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

  render() {
    const {searchVal} = this.state
    return (
      <div className="homesearch">
        <h1>Images search </h1>
        <input
          type="search"
          value={searchVal}
          onChange={this.manipul}
          onKeyDown={this.getImages}
        />
        {this.renderFinalView()}
      </div>
    )
  }
}

export default Home
