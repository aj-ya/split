import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import styles from '../styles/Login.module.scss';
interface LoginData {
    username: string;
    password: string;
}
const Login: NextPage = () => {
    const router = useRouter();
    const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [userInfo, setUserInfo] = useState<LoginData>({
        username: '',
        password: '',
    });
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setUserInfo({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        if (
            usernameRef.current.value === 'ajeya' &&
            passwordRef.current.value === 'ajeya'
        ) {
            localStorage.setItem('login', userInfo.username);
            router.push('/');
        }
    };
    return (
        <main className={styles.main}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
                autoComplete="none"
            >
                <div className="row">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" ref={usernameRef} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" ref={passwordRef} />
                </div>
                <button className={styles.button} type="submit">
                    &rarr;
                </button>
            </form>
        </main>
    );
};
export default Login;
