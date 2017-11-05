import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'
import styles from './message-list.css'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
}

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

MessageList.propTypes = propTypes

export default MessageList
