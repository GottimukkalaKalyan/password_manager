import {Component} from 'react'
import {v4 as uuid4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    showPassword: false,
    username: '',
    password: '',
    website: '',
    listOfPasswords: [],
  }

  AddPassword = event => {
    event.preventDefault()
    const {username, password, website} = this.state
    console.log('Submit Button Clicked')
    if (
      username.length !== 0 &&
      password.length !== 0 &&
      website.length !== 0
    ) {
      const newList = {
        id: uuid4(),
        username,
        password,
        website,
      }
      this.setState(prevState => ({
        listOfPasswords: [...prevState.listOfPasswords, newList],
        username: '',
        password: '',
        website: '',
      }))
    } else {
      console.log('Please Provide all Details')
    }
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  checked = event => {
    console.log(event.target.checked)
    this.setState({showPassword: event.target.checked})
  }

  searching = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {listOfPasswords} = this.state
    const newList = listOfPasswords.filter(each => each.id !== id)
    this.setState({listOfPasswords: newList})
  }

  render() {
    const {listOfPasswords, showPassword, searchInput} = this.state
    const passwordListAfterSearched = listOfPasswords.filter(eachPassword =>
      eachPassword.website
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )

    const lengthOfTheList = passwordListAfterSearched.length
    const applyBackgroundImage =
      lengthOfTheList !== 0 ? 'passwordManagerNothing' : 'passwordManagerEmpty'
    const {username, password, website} = this.state
    return (
      <div className="mainContainer">
        <div className="logoCard">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logoImage"
          />
        </div>
        <div className="passwordManager">
          <form className="formControl" onSubmit={this.AddPassword}>
            <h1 className="addHeading">Add New Password</h1>
            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="inputImages"
              />
              <input
                value={website}
                type="text"
                className="websiteInput"
                placeholder="Enter Website"
                onChange={this.changeWebsite}
              />
            </div>

            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="inputImages"
              />
              <input
                value={username}
                type="text"
                className="websiteInput"
                placeholder="Enter Username"
                onChange={this.changeUsername}
              />
            </div>

            <div className="input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="inputImages"
              />
              <input
                value={password}
                type="password"
                className="websiteInput"
                placeholder="Enter Password"
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="addingButton">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="passwordManagerImage"
          />
        </div>
        <div className="passwordStoreContainer">
          <div className="passwordSearchBar">
            <div className="yourPasswordsCountContainer">
              <h1 className="yourPasswordsHeading">Your Passwords</h1>
              <p className="lengthOfThePassword">{lengthOfTheList}</p>
            </div>
            <div className="searchInputContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="inputImages"
              />
              <div>
                <input
                  type="search"
                  className="searchInput"
                  placeholder="Search"
                  onChange={this.searching}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className={applyBackgroundImage}>
            <div className="checkBoxContainer">
              <input
                type="checkbox"
                id="showPassword"
                onChange={this.checked}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>
            {passwordListAfterSearched.length !== 0 ? (
              <ul className="unorderListOfPasswords">
                {passwordListAfterSearched.map(each => (
                  <li className="passwordListItem" key={each.id}>
                    <div className="initialCard">
                      <p className="Initial">
                        {each.username[0].toUpperCase()}
                      </p>
                    </div>
                    <div className="DetailedCard">
                      <p className="website allInputDetails">{each.website}</p>
                      <p className="username allInputDetails">
                        {each.username}
                      </p>
                      {!showPassword ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="starImage"
                        />
                      ) : (
                        <p className="password">{each.password}</p>
                      )}
                    </div>
                    <div>
                      <button
                        type="button"
                        data-testid="delete"
                        className="PassworddeleteButton"
                        onClick={() => this.deletePassword(each.id)}
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          alt="delete"
                          className="deleteImage"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                  className="noPasswordImage"
                />
                <p className="noPasswordsHeading">No Passwords</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
