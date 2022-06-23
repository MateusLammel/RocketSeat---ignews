import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import {FiX} from 'react-icons/fi'

const SignInButton = () => {
    const isUserLoggedIn = true;
  return isUserLoggedIn ? (
    <button className={styles.signInButton} title="githubLogin" type="button">
      <FaGithub color= "#84D361" />
      Mateus
      <FiX color="#737388" className={styles.closeIcon}/>
    </button>
  ) : (
    <button className={styles.signInButton} title="githubLogin" type="button">
      <FaGithub color= "#eba417" />
      Sign in with Github
    </button>
  );
};

export default SignInButton;
