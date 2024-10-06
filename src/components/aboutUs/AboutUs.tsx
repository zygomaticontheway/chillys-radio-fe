import React from 'react';
import styles from './aboutUs.module.css';

const developers = [
  { name: "Oleksii Ilchenko", specialization: "Fullstack Developer, teamlead", git: "https://github.com/zygomaticontheway/", linkedin: "https://www.linkedin.com/in/aleksey-ilchenko/" },
  { name: "Valerii Kuchynskyi", specialization: "Fullstack Developer", git: "", linkedin: "" },
  { name: "Liubov Korchashkina", specialization: "Fullstack Developer", git: "https://github.com/svetlana-svetlova", linkedin: "https://www.linkedin.com/in/svetlana-svetlova" },
  { name: "Алексей Алексеев", specialization: "Fullstack Developer", git: "https://github.com/aleksey-alekseev", linkedin: "https://www.linkedin.com/in/aleksey-alekseev" },
  { name: "Мария Мариева", specialization: "Fullstack Developer", git: "https://github.com/maria-marieva", linkedin: "https://www.linkedin.com/in/maria-marieva" },
  { name: "Николай Николаев", specialization: "Fullstack Developer", git: "https://github.com/nikolay-nikolayev", linkedin: "https://www.linkedin.com/in/nikolay-nikolayev" },
  { name: "Ольга Ольгова", specialization: "Fullstack Developer", git: "https://github.com/olga-olgova", linkedin: "https://www.linkedin.com/in/olga-olgova" },
];

const testers = [
   { name: "Анастасия Анастасиева", specialization: "QA Manual and Automation Tester", git: "", linkedin: "" },
  { name: "Дмитрий Дмитриев", specialization: "QA Manual and Automation Tester", git: "", linkedin: "" }
  ];

const AboutUs: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <h2>About Us:</h2>
      {developers.map((developer, index) => (
        <div key={index} className={styles.profileField}>
          <label>{developer.name}</label>
          <span className={styles.profileValue}>{developer.specialization}</span>
          <div className={styles.links}>
            <a href={developer.git} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span> | </span>
            <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
