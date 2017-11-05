import React from 'react'
import firebase from 'firebase'
import { render } from 'react-dom'

import App from './components/App'

firebase.initializeApp({
  apiKey: 'AIzaSyDkYdwaKwbhLC30NZdA7BpSeek-6AN-rS0',
  authDomain: 'curso-react-fe824.firebaseapp.com',
  databaseURL: 'https://curso-react-fe824.firebaseio.com',
  projectId: 'curso-react-fe824',
  storageBucket: 'curso-react-fe824.appspot.com',
  messagingSenderId: '248809576528'
})

render(<App />, document.getElementById('root'))
