import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import SignInButton from "../SignInButton/index";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" />

        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
