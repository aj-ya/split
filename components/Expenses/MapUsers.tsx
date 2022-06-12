import { MutableRefObject, useEffect, useState } from 'react';
import styles from '../../styles/Expenses.module.scss';
import { UserObject } from '../../utils/types';

const MapUsers = (props: any) => {
    const selectref: MutableRefObject<HTMLSelectElement> = props.selectref;
    const users: Array<UserObject> = props.users;
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
