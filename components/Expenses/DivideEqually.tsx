import styles from '../../styles/Expenses.module.scss';
import { useRef, useState, SyntheticEvent, useEffect, useContext } from 'react';
import { MdAdd, MdArrowForward, MdCancel } from 'react-icons/md';
import { IconContext } from 'react-icons';
import theme from '../../utils/themes';
import MapUsers from './MapUsers';
import { useRouter } from 'next/router';
import {
    IndividualBreakup,
    NewExpenseObject,
    NewExpenseType,
    UserObject,
} from '../../utils/types';
import Loader from '../Loader';

const DivideEqually = (props: { users: Array<UserObject> }) => {
    const users = props.users;
    const router = useRouter();
    const [user, setUser] = useState<string>('');
    const [splits, addSplits] = useState<Array<string>>([]);
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const costRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    useEffect(() => {
        setUser(localStorage.getItem('login') as string);
    }, []);

    const processArray = () => {
        const newArr: Array<IndividualBreakup> = [];
        const share = parseFloat(
            (parseInt(costRef.current.value) / splits.length).toFixed(2)
        );
        splits.forEach((el) => {
            newArr.push({
                name: el,
                payable: share,
            });
        });
        return newArr;
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const expenseInfo: NewExpenseObject = {
            creator: user,
            title: titleRef.current.value,
            type: NewExpenseType.single,
            date: dateRef.current.value,
            cost: parseInt(costRef.current.value),
            breakup: processArray(),
            paid: [],
        };
        const res = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(expenseInfo),
        });

        if (res.status == 200) {
            router.push('/');
            // console.log(res, await res.body);
        }
        //to database
    };
    const SplitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        const potential = selectRef.current.value;
        if (!splits.includes(potential)) {
            addSplits([...splits, potential]);
        }
    };
    const MapSplits = () => {
        return (
            <div className={styles.addedContainer}>
                <h4 className={styles.formTitle}> Parties </h4>
                <div className={styles.divider}></div>
                {splits.map((el) => (
                    <div className={styles.indAdded} key={el} id={el}>
                        {el}
                        <div
                            className={styles.cancelButton}
                            onClick={(e: SyntheticEvent) => {
                                let curr = document.getElementById(el);
                                let txt = (curr as any).innerText;
                                const result = splits.filter(
                                    (el: any) => el !== txt
                                );
                                addSplits(result);
                            }}
                        >
                            <MdCancel />
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const date = new Date().toISOString().substring(0, 10);

    return (
        <IconContext.Provider value={{ size: '20px', color: theme.icon }}>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div className={styles.form}>
                    <div className={styles.dateContainer}>
                        <input
                            className={styles.date}
                            type="date"
                            defaultValue={date}
                            name="date"
                            ref={dateRef}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className={styles.row}>
                        <input
                            type="text"
                            name="title"
                            ref={titleRef}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="cost">Total Cost</label>
                    </div>
                    <div className={styles.row}>
                        <input
                            min="0"
                            defaultValue="0"
                            type="number"
                            step="0.01"
                            name="cost"
                            ref={costRef}
                            required
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="adds">Add New Party</label>
                    </div>

                    <div className={styles.row}>
                        <MapUsers selectref={selectRef} users={users} />
                        <button
                            onClick={SplitHandler}
                            className={styles.addButton}
                        >
                            <MdAdd />
                        </button>
                    </div>
                </div>
                <MapSplits />
                <div className={styles.newrow}>
                    <button className={styles.button} type="submit">
                        <MdArrowForward />
                    </button>
                </div>
            </form>
        </IconContext.Provider>
    );
};

export default DivideEqually;
