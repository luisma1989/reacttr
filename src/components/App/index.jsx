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
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion con Github`))
      .catch(error => console.error(`Error: ${error.code} : ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(() => console.log('Te has desconectado correctamente'))
      .catch(() => console.error('Un error ocurrio'))
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
