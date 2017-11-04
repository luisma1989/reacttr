import React, { Component } from 'react'
//import { HashRouter, Match } from 'react-router'
import Header from '../Header'
import Main from '../Main'
import 'normalize-css'
import styles from './app.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        photoURL:
          'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAc-AAAAJDk2ZWQ0MzgzLTIwYTYtNGM0ZC04MzJhLWY0ZjUzNTk4NzZiMw.jpg',
        email: 'luisma_1989@hotmail.com',
        displayName: 'Luis Manuel'
      }
    }
  }
  render() {
    return (
        <div>
          <Header />
          <Main user={this.state.user} />
        </div>
    )
  }
}

export default App
