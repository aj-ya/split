import { NextPage } from 'next';
import Head from 'next/head';
import { IconContext } from 'react-icons';
import { MdAccountCircle, MdAdd } from 'react-icons/md';
import styles from '../styles/Contacts.module.scss';
import theme from '../utils/themes';
const Contacts: NextPage = () => {
    return (
        <div className="container">
            <IconContext.Provider value={{ color: theme.head, size: '30px' }}>
                <h2 className={styles.title}>Contacts.</h2>
                <main className={styles.main}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}>Lorem Ipsum</h3>
                        </li>
                        <li className={styles.item}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}>Dolor Sit </h3>
                        </li>
                        <li className={styles.item}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}>Amet Consectetur</h3>
                        </li>
                        <li className={styles.item}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}> adipisicing elit</h3>
                        </li>
                    </ul>
                    <div className={styles.addContainer}>
                        <button className={styles.button}>
                            <MdAdd />
                        </button>
                    </div>
                </main>
            </IconContext.Provider>
        </div>
    );
};
export default Contacts;
