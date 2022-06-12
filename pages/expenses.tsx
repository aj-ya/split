import { NextPage } from 'next';
import styles from '../styles/Expenses.module.scss';
import { useState, useEffect } from 'react';
import DivideEqually from '../components/Expenses/DivideEqually';
import DivideByQuantity from '../components/Expenses/DivideByQuantity';
import { UserObject } from '../utils/types';
import Loader from '../components/Loader';

const Expenses: NextPage = () => {
    const [subPage, setSubPage] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<Array<UserObject>>([]);
    async function getUsers() {
        setLoading(true);
        await fetch('/api/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res);
            })
            .catch(() => {
                setUsers([]);
            });
        setLoading(false);
    }
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!loading) {
        return (
            <div className="container">
                <main>
                    <div
                        className={styles.extoggle}
                        data-current={subPage ? 'Single' : 'Bulk'}
                    >
                        <span
                            className={styles.exoptionSingle}
                            onClick={() => {
                                setSubPage(true);
                            }}
                        >
                            <span>Single</span>
                        </span>
                        <span
                            className={styles.exoptionBulk}
                            onClick={() => {
                                setSubPage(false);
                            }}
                        >
                            <span>Bulk</span>
                        </span>
                    </div>
                    {subPage ? (
                        <DivideEqually users={users} />
                    ) : (
                        <DivideByQuantity users={users} />
                    )}
                </main>
            </div>
        );
    } else {
        return <Loader />;
    }
};
export default Expenses;
