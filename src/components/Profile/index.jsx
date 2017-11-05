import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './profile.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

function Profile ({picture, displayName, userName, emailAddress, location}) {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={picture} />
      <span className={styles.name}>
        {displayName}
      </span>
      <ul className={styles.data}>
        <li>
          <span className="fa fa-user" />
          {userName}
        </li>
        <li>
          <span className="fa fa-envelope" />
          {emailAddress}
        </li>
        <li>
          <span className="fa fa-map-marker" />
          {location}
        </li>
      </ul>
    </div>
  )
}

Profile.propTypes = propTypes

export default Profile
