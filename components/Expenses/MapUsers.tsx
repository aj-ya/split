import { MutableRefObject } from 'react';
import styles from '../../styles/Expenses.module.scss';
import { UserObject } from '../../utils/types';

const MapUsers = (props: {
    selectRef: MutableRefObject<HTMLSelectElement>;
    users: UserObject[];
    currentUserName: string;
}) => {
    const selectref: MutableRefObject<HTMLSelectElement> = props.selectRef;
    const users: Array<UserObject> = props.users;
    return (
        <select name="adds" ref={selectref} className={styles.select}>
            {users.map((el) => (
                <option key={el.id} value={el.name}>
                    {el.name === props.currentUserName ? 'me' : el.name}
                </option>
            ))}
        </select>
    );
};
export default MapUsers;
