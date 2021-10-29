import { useState } from 'react';
import styles from './navbar.module.css';

import { useRouter } from 'next/router';
import Image from 'next/image';

export const NavBar = ({ username }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>
            <Image
              src='/static/netflix.svg'
              alt='Netflix logo'
              width='128px'
              height='34px'
            />
          </div>
        </a>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              {/** Expand more icon */}
              <Image
                src={'/static/expand_more.svg'}
                alt='Expand dropdown'
                width='24px'
                height='24px'
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName}>Sign out</a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
