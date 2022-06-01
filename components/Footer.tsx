import { MdHome, MdPayment, MdRequestPage } from 'react-icons/md';
import Link from 'next/link';
import styles from '../styles/Footer.module.scss';
import { IconContext } from 'react-icons';
import theme from '../utils/themes';
import { useRouter } from 'next/router';
const Footer = () => {
    return (
        <footer className={styles.ft_ctnr}>
            <IconContext.Provider value={{ color: theme.icon, size: '35px' }}>
                <div className={styles.pages}>
                    <div data-isactive="false">
                        <Link href="/expenses">
                            <MdRequestPage />
                        </Link>
                    </div>
                    <div data-isactive="false">
                        <Link href="/">
                            <MdHome />
                        </Link>
                    </div>
                    <div data-isactive="false">
                        <Link href="/payments">
                            <MdPayment />
                        </Link>
                    </div>
                </div>
            </IconContext.Provider>
        </footer>
    );
};
export default Footer;
