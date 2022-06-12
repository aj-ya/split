import { MutableRefObject, useEffect, useState } from 'react';
import styles from '../../styles/Expenses.module.scss';
import { UserObject } from '../../utils/types';

const MapUsers = (props: any) => {
    const selectref: MutableRefObject<HTMLSelectElement> = props.selectref;
    const setLoading = props.setloading;
    const [users, setUsers] = useState<Array<UserObject>>([]);
    async function getUsers() {
        // setLoading(true);
        await fetch('/api/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res);
            })
            .catch(() => {
                setUsers([]);
            });
        setLoading(false);
    }
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
