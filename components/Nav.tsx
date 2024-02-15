import styles from '../styles/Nav.module.scss';
import {
    MdPayment,
    MdHome,
    MdRequestPage,
    MdAccountCircle,
    MdHistoryEdu,
} from 'react-icons/md';
import { IconContext } from 'react-icons';
import theme from '../utils/themes';
import Link from 'next/link';
const Nav = () => {
    return (
        <nav className={styles.nav_ctnr}>
            <IconContext.Provider
                value={{ color: theme.prim_text, size: '35' }}
            >
                <div className={styles.greeting}>
                    <MdAccountCircle />
                    <span className="greetingTitle"> Hello, Ajeya </span>
                </div>
                <div className={styles.pages}>
                    <div>
                        <Link href="/">
                            <MdHome />
                        </Link>
                    </div>
                    <div>
                        <Link href="/requests">
                            <MdRequestPage />
                        </Link>
                    </div>
                    <div>
                        <Link href="/payments">
                            <MdPayment />
                        </Link>
                    </div>
                    <div>
                        <Link href="/expense">
                            <MdHistoryEdu />
                        </Link>
                    </div>
                </div>
            </IconContext.Provider>
        </nav>
    );
};
export default Nav;
