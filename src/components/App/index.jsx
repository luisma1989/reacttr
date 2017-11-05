import React, { Component } from 'react'
import firebase from 'firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'normalize-css'

import styles from './app.css'
import Header from '../Header'
import Main from '../Main'
import Profile from "../Profile";
import Login from '../Login'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        photoURL:
          'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAc-AAAAJDk2ZWQ0MzgzLTIwYTYtNGM0ZC04MzJhLWY0ZjUzNTk4NzZiMw.jpg',
        email: 'luisma_1989@hotmail.com',
        displayName: 'Luis Manuel',
        location: 'Madrid, EspaÃƒÂ±a'
      }
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => {
              if (this.state.user) {
                return (
                  <Main
                    user={this.state.user}
                    onLogout={this.handleLogout}
                  />
                )
              } else {
                return (
                  <Login
                    onAuth={this.handleOnAuth}
                    onAuth2={this.handleOnAuthFacebook}
                    onAuth3={this.handleOnAuthGithub}
                  />
                )
              }
            }} />

            <Route path="/profile" render={() => (
              <Profile
                picture={this.state.user.photoURL}
                userName={this.state.user.email.split("@")[0]}
                displayName={this.state.user.displayName}
                location={this.state.user.location}
                emailAddress={this.state.user.email} />
              )} />

            <Route path="/user/:username" render={(params) => (
              <Profile
                displayName={params.username}
                username={params.username}
              />
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}
