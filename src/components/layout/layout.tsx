import React from 'react';
import styles from './Layout.module.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';



interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <Footer /> 
    </div>
  );
};

export default Layout;