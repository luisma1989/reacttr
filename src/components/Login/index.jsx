import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.css';

const propTypes = {
    onAuth: PropTypes.func.isRequired
}

function Login({ onAuth }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        Inicia sesión tronco
      </p>
      <button
        onClick={onAuth}
        className={styles.button}
      >
        <span className='fa fa-github'></span>Login con Github
      </button>
    </div>
  )
}

Login.propTypes = propTypes

export default Login;
