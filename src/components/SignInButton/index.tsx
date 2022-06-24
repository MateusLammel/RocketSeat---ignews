import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const session = useSession();

  return session.data ? (
    <button
      className={styles.signInButton}
      title="githubLogin"
      type="button"
      onClick={() => {
        signOut();
      }}
    >
      <FaGithub color="#84D361" />
      {session.data.user?.name}
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      title="githubLogin"
      type="button"
      onClick={() => {
        signIn("github");
      }}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
};

export default SignInButton;
