import { NextPage } from 'next';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import styles from '../../styles/History.module.scss';
const History: NextPage = () => {
    return (
        <div className="container">
            <main className={styles.main}>
                <h2 className={styles.pagetitle}>History Of Operations</h2>
                <div className={styles.linklist}>
                    <Link href="/history/expense_history">
                        <div className={styles.linkbox}>
                            Expense History{' '}
                            <div className={styles.forwardicon}>
                                <MdArrowForward />
                            </div>
                        </div>
                    </Link>
                    <Link href="/history/payment_history">
                        <div className={styles.linkbox}>
                            Payment History{' '}
                            <div className={styles.forwardicon}>
                                <MdArrowForward />
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
};
export default History;
