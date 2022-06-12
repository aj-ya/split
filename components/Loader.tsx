import Image from 'next/image';
import styles from '../styles/Loader.module.scss';

const Loader = () => {
    return (
        <div className="container">
            <div className={styles.loader}>
                <Image
                    src="/spinner.png"
                    alt="spinner"
                    height="64px"
                    width="64px"
                />
            </div>
        </div>
    );
};
export default Loader;
