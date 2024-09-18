import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authActions';
import { useAppDispatch } from '../../redux/hooks';
import styles from './login.module.css'
import { useFormik } from "formik";

export interface ILoginFormValues {
    username: string,
    password: string
}

export default function Login() {

    const dispatch = useAppDispatch()

    //хук для перенаправления маршрутизации
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: 'emilys',
            password: 'emilyspass'
        } as ILoginFormValues,
        onSubmit: (values: ILoginFormValues, { resetForm }) => {

            //в values лежат данные из формы
            dispatch(loginUser(values))
            .then(() => {
                navigate('/')
            //   resetForm();
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles.robotForm}>
                <label>Login 🏵</label>
                <input value={formik.values.username} name='username' onChange={formik.handleChange} type="text" placeholder='username' />
                <input value={formik.values.password} name='password' onChange={formik.handleChange} type="text" placeholder='password' />
                <button type="submit">send form</button>
            </form>
            <span className={styles.formErrors}>{formik.errors.username}</span>
            <span className={styles.formErrors}>{formik.errors.password}</span>

        </div>
    )
}