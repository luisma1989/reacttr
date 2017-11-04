import React, { Component } from 'react'
import Message from '../Message'
import styles from './message-list.css'

class MessageList extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={ styles.root}>
      {
        this.props.messages.map((message) => {
          return (
            <Message
              text={ message.text }
              picture={ message.picture }
              displayName={ message.displayName }
              userName={ message.userName }
              date={ message.date }
              key={ message.id }
              numRetweets={ message.retweets }
              numFavorites={ message.favorites }
              onRetweet={() => this.props.onRetweet(message.id) }
              onFavorite={() => this.props.onFavorite(message.id) }
              onReplyTweet={() => this.props.onReplyTweet(message.id, message.userName) }
            />
          )
        }).reverse()
      }
      </div>
    )
  }
}

export default MessageList
