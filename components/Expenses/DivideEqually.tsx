import styles from '../../styles/Expenses.module.scss';
import { useRef, useState, SyntheticEvent, useEffect } from 'react';
import { MdAdd, MdArrowForward, MdCancel } from 'react-icons/md';
import { format } from 'path';
import { IconContext } from 'react-icons';
import theme from '../../utils/themes';
const Users = ['Shivgond', 'Sushant', 'Ajeya', 'Karthik', 'Kempya'];
const MapUsers = (props: any) => {
    const selectref: React.MutableRefObject<HTMLSelectElement> =
        props.selectref;
    return (
        <select name="adds" ref={selectref} className={styles.select}>
            {Users.map((el) => (
                <option key={el} value={el}>
                    {el}
                </option>
            ))}
        </select>
    );
};

const DivideEqually = () => {
    const [user, setUser] = useState<string>('');
    const [splits, addSplits] = useState<Array<string>>([]);
    useEffect(() => {
        setUser(localStorage.getItem('login') as string);
    }, []);
    console.log(splits);
    const processArray = (a: Array<string>) => {
        const newArr = [];
        const share = parseInt(costRef.current.value) / splits.length;
        splits.forEach((el) => {
            newArr.push({
                name: el,
                payable: share,
            });
        });
        return newArr;
    };
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const costRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        const expenseInfo = {
            creater: user,
            title: titleRef.current.value,
            type: 'single',
            date: dateRef.current.value,
            cost: parseInt(costRef.current.value),
            breakup: processArray(splits),
        };
        console.log(JSON.stringify(expenseInfo));
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
    // console.log(date);
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
                        <MapUsers selectref={selectRef} />
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
