import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { MdArrowForward, MdArrowRight } from 'react-icons/md';
import Loader from '../components/Loader';
import styles from '../styles/Login.module.scss';
const Login: NextPage = () => {
    const [isAuth, setAuth] = useState(false);
    const router = useRouter();
    const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        const userInfo = {
            name: usernameRef.current.value,
            pass: passwordRef.current.value,
        };
        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(userInfo),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.present) {
                    localStorage.setItem('login', userInfo.name);
                    setAuth(true);
                }
            });
        setLoading(false);
    };
    useEffect(() => {
        if (isAuth) {
            router.push('/');
        }
    }, [isAuth]);
    if (!loading) {
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
                        <input
                            type="password"
                            name="password"
                            ref={passwordRef}
                        />
                    </div>
                    <button className={styles.button} type="submit">
                        <MdArrowForward />
                    </button>
                </form>
            </main>
        );
    } else {
        return <Loader />;
    }
};
export default Login;
