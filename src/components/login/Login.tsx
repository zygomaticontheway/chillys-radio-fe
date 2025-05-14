import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authActions';
import { useAppDispatch } from '../../redux/hooks';
import styles from './login.module.css'
import { useFormik } from "formik";


export interface ILoginFormValues {
    email: string,
    password: string
}

export default function Login() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        } as ILoginFormValues,
        onSubmit: (values: ILoginFormValues, { resetForm }) => {
            const preparedValues = {
                ...values,
                email: values.email.trim().toLowerCase(),
            }
            dispatch(loginUser(preparedValues))
                .then(() => {
                    navigate('/')
                    resetForm();
                })
        }
    })

    return (
        <div className={styles.loginForm}>
            <form onSubmit={formik.handleSubmit} className={styles.robotForm}>
                <label>Login</label>
                <input value={formik.values.email} name='email' onChange={formik.handleChange} type="text" placeholder='yourmail@yourmail.site' />
                <input value={formik.values.password} name='password' onChange={formik.handleChange} type="password" placeholder='password' />
                <button type="submit">login</button>
                <Link to="/register" className={styles.loginLink}>
                    <p>Don't have an account?</p>
                    <p>Register</p> 
                </Link>
            </form>
            <span className={styles.formErrors}>{formik.errors.email}</span>
            <span className={styles.formErrors}>{formik.errors.password}</span>

        </div>
    )
}