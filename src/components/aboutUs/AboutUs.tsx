import React from 'react';
import styles from './aboutUs.module.css';

const developers = [
  { name: "Oleksii Ilchenko", specialization: "Fullstack Developer, teamlead", git: "https://github.com/zygomaticontheway/", linkedin: "https://www.linkedin.com/in/ilchenko-o/" },
  { name: "Liubov Korchashkina", specialization: "Fullstack Developer", git: "https://github.com/FannyWolf", linkedin: "https://www.linkedin.com/in/lyubov-korchashkina/" },
  { name: "Valerii Kuchynskyi", specialization: "Fullstack Developer", git: "https://github.com/Valery2400", linkedin: "" },
  { name: "Vladyslav Velykyy", specialization: "Fullstack Developer", git: "https://github.com/VladVel24", linkedin: "" },
  { name: "Natalia Boiko", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Kateryna Ushenko", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Koryun Azaryan", specialization: "Fullstack Developer", git: "", linkedin: "" },
];

const testers = [
   { name: "Serhii Shvets", specialization: "QA Manual and Automation Tester", git: "https://github.com/Sewer95", linkedin: "" },
  { name: "Anna Schaedlich", specialization: "QA Manual and Automation Tester", git: "", linkedin: "" }
  ];

  const AboutUs: React.FC = () => {
    return (
      <div className={styles.profileContainer}>
        <h2>About Us</h2>
  
        <div className={styles.teamColumns}>
        <section className={styles.teamSection}>
          <h3>Development Team</h3>
          {developers.map((developer, index) => (
            <div key={index} className={styles.profileField}>
              <label className={styles.name}>{developer.name}</label>
              <span className={styles.profileValue}>{developer.specialization}</span>
              <div className={styles.links}>
                {developer.git && (
                  <>
                    <a href={developer.git} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span> | </span>
                  </>
                )}
                {developer.linkedin && <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
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
                {tester.git && (
                  <>
                    <a href={tester.git} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span> | </span>
                  </>
                )}
                {tester.linkedin && <a href={tester.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

  
  export default AboutUs;
