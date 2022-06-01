import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Expenses.module.scss';
import { useRef, useState, SyntheticEvent, useEffect } from 'react';
import { MdAdd, MdCancel } from 'react-icons/md';
import DivideEqually from '../components/Expenses/DivideEqually';
import DivideByQuantity from '../components/Expenses/DivideByQuantity';

const Expenses: NextPage = () => {
    const [subPage, setSubPage] = useState(true);
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
                {subPage ? <DivideEqually /> : <DivideByQuantity />}
            </main>
        </div>
    );
};
export default Expenses;
