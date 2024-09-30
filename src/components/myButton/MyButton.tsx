// import "./myButton.module.css";
import styles from './myButton.module.css' // ! импорт стилей через модуль


// ! перенос компонентов с jsx в tsx
interface IMyButtonProps {
  name?: string, //необязательный ибо есть значение по умолчанию
  type?: 'button' | 'submit' | 'reset', //ограниченный набор значений
  onClick?: () => void //необязательный ибо onClick может быть обернута, но это функция по этому параметр описывается как функция (не обязательно стрелочная)
  className?: string;
}

export default function MyButton({ type = 'button', onClick, name = 'default_text', className }: IMyButtonProps) {
  
  console.log(styles);

  return (
    <button 
    type={type} 
    onClick={onClick} 
    className={`${styles.myButton} ${className || ''}`}> {/* объединяем стили модуля с кастомным классом */}
      {name}
    </button>
  );
}
