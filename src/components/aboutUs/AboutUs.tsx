import React from 'react';
import styles from './aboutUs.module.css';

const developers = [
  { name: "Oleksii Ilchenko", specialization: "Fullstack Developer, teamlead", git: "https://github.com/zygomaticontheway/", linkedin: "https://www.linkedin.com/in/aleksey-ilchenko/" },
  { name: "Valerii Kuchynskyi", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Liubov Korchashkina", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Vladyslav Velykyy", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Natalia Boiko", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Kateryna Ushenko", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Koryun Azaryan", specialization: "Fullstack Developer", git: "", linkedin: "" },
];

const testers = [
   { name: "Serhii Shvets", specialization: "QA Manual and Automation Tester", git: "", linkedin: "" },
  { name: "Anna Schaedlich", specialization: "QA Manual and Automation Tester", git: "", linkedin: "" }
  ];

  const AboutUs: React.FC = () => {
    return (
      <div className={styles.profileContainer}>
        <h2>About Us</h2>
  
        <section className={styles.teamSection}>
          <h3>Development Team</h3>
          {developers.map((developer, index) => (
            <div key={index} className={styles.profileField}>
              <label className={styles.name}>{developer.name}</label>
              <span className={styles.profileValue}>{developer.specialization}</span>
              <div className={styles.links}>
                <a href={developer.git} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span> | </span>
                <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          ))}
        </section>
  
        <section className={styles.teamSection}>
          <h3>QA Team</h3>
          {testers.map((tester, index) => (
            <div key={index} className={styles.profileField}>
              <label className={styles.name}>{tester.name}</label>
              <span className={styles.profileValue}>{tester.specialization}</span>
              <div className={styles.links}>
                <a href={tester.git} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span> | </span>
                <a href={tester.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  };
  
  export default AboutUs;
