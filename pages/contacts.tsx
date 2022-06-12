import { NextPage } from 'next';
import { IconContext } from 'react-icons';
import { MdAccountCircle } from 'react-icons/md';
import styles from '../styles/Contacts.module.scss';
import theme from '../utils/themes';
import { connectToDatabase } from '../lib/connectToDB';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
const MapContacts = (props: any) => {
    const { data } = props;
    const [isGuest, setGuest] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem('login') == 'guest') setGuest(true);
    }, []);
    if (!isGuest)
        return (
            <ul className={styles.list}>
                {data.map((el: any) => {
                    return (
                        <li className={styles.item} key={el.id}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}>{el.name}</h3>
                            <div className={styles.vpa}>{el.vpa}</div>
                        </li>
                    );
                })}
            </ul>
        );
    else {
        const kk = [
            { name: 'lorem', vpa: 'lorem@oksbi' },
            { name: 'ipsum', vpa: 'ipsum@oksbi' },
        ];
        return (
            <ul className={styles.list}>
                {kk.map((el: any) => {
                    return (
                        <li className={styles.item} key={el.id}>
                            <div className={styles.iconContainer}>
                                <MdAccountCircle />
                            </div>
                            <h3 className={styles.name}>{el.name}</h3>
                            <div className={styles.vpa}>{el.vpa}</div>
                        </li>
                    );
                })}
            </ul>
        );
    }
};

const Contacts: NextPage = ({ all_users }: any) => {
    return (
        <div className="container">
            <IconContext.Provider value={{ color: theme.head, size: '30px' }}>
                <h2 className={styles.title}>Contacts.</h2>
                <main className={styles.main}>
                    <MapContacts data={all_users} />
                </main>
            </IconContext.Provider>
        </div>
    );
};
export async function getStaticProps() {
    type docType = {
        name: string;
        id: string;
        _id: ObjectId;
        vpa?: string;
        password?: string;
    };

    const { db } = await connectToDatabase();
    const users = db.collection('users');
    const all_users_res = users.find();
    let all_users: {
        name: string;
        id: string;
        _id: string;
        vpa?: string;
        password?: string;
    }[] = [];
    await all_users_res.forEach((doc: docType) => {
        all_users.push({
            _id: new ObjectId(doc._id).toString(),
            name: doc.name,
            vpa: doc.vpa,
            id: doc.id,
        });
    });

    return {
        props: {
            all_users,
        },
    };
}
export default Contacts;
