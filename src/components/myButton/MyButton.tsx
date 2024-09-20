// import "./myButton.module.css";
import styles from './myButton.module.css' // ! импорт стилей через модуль


// ! перенос компонентов с jsx в tsx
interface IMyButtonProps {
  name?: string, //необязательный ибо есть значение по умолчанию
  type?: 'button' | 'submit' | 'reset', //ограниченный набор значений
  onClick?: () => void //необязательный ибо onClick может быть обернута, но это функция по этому параметр описывается как функция (не обязательно стрелочная)
}

export default function MyButton({ type='button', onClick, name='default_text' }:IMyButtonProps) {
  
  console.log(styles);

  return (
    <button type={type} onClick={onClick} className={styles.myButton}> {/* вызов стилей через класс модуля стилей<---/>*/}
      {name}
    </button>
  );
}
