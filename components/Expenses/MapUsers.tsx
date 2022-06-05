import { MutableRefObject, useEffect, useState } from 'react';
import styles from '../../styles/Expenses.module.scss';
type usersType = {
    name: string;
    id: string;
    _id: string;
    vpa?: string;
    password?: string;
}[];
const MapUsers = (props: any) => {
    const selectref: MutableRefObject<HTMLSelectElement> = props.selectref;
    const [users, setUsers] = useState<usersType>([]);
    useEffect(() => {
        async function getUsers() {
            const res = await fetch('/api/users').then((res) => res.json());
            console.log(res);
            setUsers(res);
        }
        getUsers();
    }, []);
    return (
        <select name="adds" ref={selectref} className={styles.select}>
            {users.map((el) => (
                <option key={el.id} value={el.name}>
                    {el.name}
                </option>
            ))}
        </select>
    );
};
export default MapUsers;
