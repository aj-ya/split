import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import {
    MdPayment,
    MdRequestPage,
    MdContacts,
    MdHistoryEdu,
} from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import theme from '../utils/themes';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <div className="container">
            <IconContext.Provider value={{ color: theme.icon, size: '30' }}>
                <header className={styles.header}>
                    <Link href="/">
                        <a
                            className={styles.settings}
                            onClick={() => {
                                localStorage.removeItem('login');
                                router.push('/login');
                            }}
                        >
                            <AiOutlineLogout size="25px" />
                        </a>
                    </Link>
                </header>
                <main className={styles.main}>
                    <h1 className={styles.title}>Sp/it</h1>

                    <p className={styles.description}>
                        <span> everything&apos;s better when</span>{' '}
                        <strong>shared.</strong>
                    </p>
                    <div className={styles.grid}>
                        <div
                            className={styles.gridBox}
                            onClick={() => {
                                router.push('/expense');
                            }}
                        >
                            <div className={styles.boxTitle}>Add Expense</div>
                            <div className={styles.icon}>
                                <MdRequestPage />
                            </div>
                            <p className={styles.boxdescription}>
                                Create new expenses.
                            </p>
                        </div>
                        <div
                            className={styles.gridBox}
                            onClick={() => {
                                router.push('/payments');
                            }}
                        >
                            <div className={styles.boxTitle}>Payments</div>
                            <div className={styles.icon}>
                                <MdPayment />
                            </div>
                            <p className={styles.boxdescription}>
                                Check and pay your share of expenses
                            </p>
                        </div>
                        <div
                            className={styles.gridBox}
                            onClick={() => {
                                router.push('/history');
                            }}
                        >
                            <div className={styles.boxTitle}>History</div>
                            <div className={styles.icon}>
                                <MdHistoryEdu />
                            </div>
                            <p className={styles.boxdescription}>
                                Explore and track your expenses.
                            </p>
                        </div>
                        <div
                            className={styles.gridBox}
                            onClick={() => {
                                router.push('/contacts');
                            }}
                        >
                            <div className={styles.boxTitle}>Contacts</div>
                            <div className={styles.icon}>
                                <MdContacts />
                            </div>
                            <p className={styles.boxdescription}>
                                Manage contacts.
                            </p>
                        </div>
                        {/* <div className={styles.gridBox}>
                            <div className={styles.boxTitle}>Settings</div>
                            <div className={styles.icon}>
                                <MdSettings />
                            </div>
                            <p className={styles.boxdescription}>
                                System and user Settings.
                            </p>
                        </div> */}
                    </div>
                </main>
            </IconContext.Provider>
        </div>
    );
};

export default Home;
