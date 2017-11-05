import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import MessageList from '../MessageList'
import ProfileBar from '../ProfileBar'
import InputText from '../InputText'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    // Para que llame al constructor de la clase padre (React. Component)
    super(props)
    this.state = {
      user: Object.assign({}, this.props.user,  { retweets: []}, { favorites: [] }),
      openText: false,
      usernameToReply: '',
      messages: [
        {
          id: uuid.v4(),
          text: 'Mensaje de prueba',
          picture: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAc-AAAAJDk2ZWQ0MzgzLTIwYTYtNGM0ZC04MzJhLWY0ZjUzNTk4NzZiMw.jpg',
          displayName: 'Luisma',
          userName: 'Luis Manuel Fernandez Camacho',
          date: Date.now() - 180000,
          retweets: 0,
          favorites: 0
        },
        {
          id: uuid.v4(),
          text: 'Otro mensaje de prueba',
          picture: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAc-AAAAJDk2ZWQ0MzgzLTIwYTYtNGM0ZC04MzJhLWY0ZjUzNTk4NzZiMw.jpg',
          displayName: 'Luisma',
          userName: 'Luis Manuel Fernandez Camacho',
          date: Date.now() - 1800000,
          retweets: 0,
          favorites: 0
        }
      ]
    }
    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleReplyTweet = this.handleReplyTweet.bind(this)
  }

  handleSendText (event) {
    event.preventDefault()

    let newMessage = {
      id: uuid.v4(),
      userName: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      picture: this.props.user.photoURL,
      date: Date.now(),
      text: event.target.text.value
    }

    this.setState({
      messages: this.state.messages.concat(newMessage),
      openText: false
    })
  }

  handleCloseText () {
    event.preventDefault()

    this.setState({ openText: false })
  }

  handleOpenText (event) {
    event.preventDefault()

    this.setState({ openText: true })
  }

  handleRetweet(msgId) {
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)

    if (alreadyRetweeted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets ++
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.retweets.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  handleFavorite(msgId) {
    let alreadyFavorite = this.state.user.favorites.filter(fav => fav === msgId)

    if (alreadyFavorite.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favorites ++
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favorites.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  handleReplyTweet(msgId, usernameToReply) {
    this.setState({
      openText: true,
      usernameToReply
    })
  }

  renderOpenText () {
    if (this.state.openText) {
      return (
        <InputText
          onSendText={ this.handleSendText }
          onCloseText={ this.handleCloseText }
          usernameToReply={ this.state.usernameToReply }
        />
      )
    }
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture= { this.props.user.photoURL }
          userName= { this.props.user.email.split('@')[0] }
          onOpenText={ this.handleOpenText.bind(this) }
          onLogout={this.props.onLogout}
        />
        { this.renderOpenText() }
        <MessageList
          messages={ this.state.messages }
          onRetweet={ this.handleRetweet }
          onFavorite={ this.handleFavorite }
          onReplyTweet={ this.handleReplyTweet}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes

export default Main
