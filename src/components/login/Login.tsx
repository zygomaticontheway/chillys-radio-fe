import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authActions';
import { useAppDispatch } from '../../redux/hooks';
import styles from './login.module.css'
import { useFormik } from "formik";


export interface ILoginFormValues {
    name: string,
    password: string
}

export default function Login() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        } as ILoginFormValues,
        onSubmit: (values: ILoginFormValues, { resetForm }) => {
            dispatch(loginUser(values))
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
                <input value={formik.values.name} name='name' onChange={formik.handleChange} type="text" placeholder='login' />
                <input value={formik.values.password} name='password' onChange={formik.handleChange} type="password" placeholder='password' />
                <button type="submit">login</button>
                <Link to="/register" className={styles.loginLink}>
                    <p>Don't have an account?</p>
                    <p>Register</p> 
                </Link>
            </form>
            <span className={styles.formErrors}>{formik.errors.name}</span>
            <span className={styles.formErrors}>{formik.errors.password}</span>

        </div>
    )
}