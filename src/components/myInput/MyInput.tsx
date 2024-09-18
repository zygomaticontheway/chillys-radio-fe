import styles from './myInput.module.css';

interface IMyInputProps{
  label?: string, 
  name: string, 
  type: string, 
  placeholder: string
}

export default function MyInput({label='default', name='default', type='text', placeholder='default'}:IMyInputProps) {

  return (
    <>
      <label className={styles.label}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} />
    </>
  );
}
