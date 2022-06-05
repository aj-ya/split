import { NextPage } from 'next';
import Head from 'next/head';
import { IconContext } from 'react-icons';
import { MdAccountCircle, MdAdd } from 'react-icons/md';
import styles from '../styles/Contacts.module.scss';
import theme from '../utils/themes';
import { connectToDatabase } from '../lib/connectToDB';
import { ObjectId } from 'mongodb';
const MapContacts = (props: any) => {
    const { data } = props;
    return (
        <ul className={styles.list}>
            {data.map((el: any) => {
                return (
                    <li className={styles.item} key={el.id}>
                        <div className={styles.iconContainer}>
                            <MdAccountCircle />
                        </div>
                        <h3 className={styles.name}>{el.name}</h3>
                    </li>
                );
            })}
        </ul>
    );
};
const Contacts: NextPage = ({ all_users }: any) => {
    return (
        <div className="container">
            <IconContext.Provider value={{ color: theme.head, size: '30px' }}>
                <h2 className={styles.title}>Contacts.</h2>
                <main className={styles.main}>
                    <MapContacts data={all_users} />
                    {/* <div className={styles.addContainer}>
                        <button className={styles.button}>
                             <MdAdd /> 
                        </button>
                    </div> */}
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
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
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
            id: doc.id,
        });
    });
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            all_users,
        },
    };
}
export default Contacts;
