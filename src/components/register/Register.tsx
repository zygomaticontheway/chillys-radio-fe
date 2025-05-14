import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import styles from '../login/login.module.css'
import { useFormik } from "formik";
import { registerUser } from '../../features/auth/registerActions';

export interface IRegisterFormValues {
    name: string,
    email: string,
    password: string
}

export default function Register() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        } as IRegisterFormValues,
        onSubmit: (values: IRegisterFormValues, { resetForm }) => {
            const preparedValues = {
                ...values,
                name: values.name.trim().toLowerCase(),
                email: values.email.trim().toLowerCase(),
            }
            console.log(preparedValues);

            dispatch(registerUser(preparedValues))
                .then(() => {
                    navigate('/')
                    resetForm();
                })
        }
    })

    return (
        <div className={styles.loginForm}>
            <form onSubmit={formik.handleSubmit} className={styles.robotForm}>
                <label>Registration</label>
                <input value={formik.values.name} name='name' onChange={formik.handleChange} type="text" placeholder='Your name' />
                <input value={formik.values.email} name='email' onChange={formik.handleChange} type="email" placeholder='* yourmail@yourmail.site' />
                <input value={formik.values.password} name='password' onChange={formik.handleChange} type="password" placeholder='* Password' />
                <button type="submit">Register</button>
            </form>
            <Link to="/login" className={styles.loginLink}>
                <p>Have an account?</p>
                <p>Login</p>
            </Link>
            <span className={styles.formErrors}>{formik.errors.name}</span>
            <span className={styles.formErrors}>{formik.errors.password}</span>
        </div>
    )
}