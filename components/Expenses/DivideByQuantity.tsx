import {
    useState,
    useEffect,
    useRef,
    SyntheticEvent,
    ChangeEvent,
} from 'react';
import styles from '../../styles/Expenses.module.scss';
import { MdAdd, MdArrowForward, MdClear } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import theme from '../../utils/themes';
import MapUsers from './MapUsers';
import { useRouter } from 'next/router';

const DivideByQuantity = () => {
    const router = useRouter();
    const [user, setUser] = useState<string>('');
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const costRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const selectRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [splits, addSplits] = useState<Array<string>>([]);
    const [quantity, setQuantity] = useState({});
    const SplitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        const potential = selectRef.current.value;
        if (!splits.includes(potential)) {
            addSplits([...splits, potential]);
        }
        // @ts-ignore
        quantity[potential] = 1;
        setQuantity(quantity);
        // console.log(quantity);
    };
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        const finalArray = [];
        Object.keys(quantity).forEach((el) => {
            finalArray.push({
                name: el,
                // @ts-ignore
                payable: parseFloat(
                    // @ts-ignore
                    (quantity[el] * parseInt(costRef.current.value)).toFixed(2)
                ),
            });
        });
        const finalData = {
            creator: user,
            title: titleRef.current.value,
            type: 'bulk',
            cost: parseInt(costRef.current.value),
            date: dateRef.current.value,
            // @ts-ignore
            breakup: finalArray,
            paid: [],
        };
        const res = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(finalData),
        });
        if (res.status == 200) {
            router.push('/');
        }
    };
    const QuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let prop = e.target.getAttribute('data-correspondsto') || 'ajeya';
        // @ts-ignore
        quantity[prop] = e.target.value || 0;
        setQuantity(quantity);
        // console.log(quantity);
    };
    const MapSplits = () => {
        return (
            <div className={styles.addedFormContainer}>
                <h4 className={styles.formTitle}> Parties </h4>
                <div className={styles.divider}></div>
                {splits.map((el) => (
                    <div className={styles.indSplit} key={el} id={el}>
                        <div className={styles.splitName}>{el}</div>
                        <input
                            className={styles.splitQuantity}
                            onChange={QuantityHandler}
                            onBlur={QuantityHandler}
                            type="number"
                            defaultValue={
                                // @ts-ignore
                                `${quantity[el] ? quantity[el] : '1'}` || '1'
                            }
                            step="0.1"
                            data-correspondsto={el}
                            min="0"
                        />
                        <button
                            className={styles.splitCancelButton}
                            onClick={(e: SyntheticEvent) => {
                                let curr = document.getElementById(el);
                                let txt = (curr as any).innerText;
                                // @ts-ignore
                                delete quantity[txt];
                                setQuantity(quantity);
                                const result = splits.filter(
                                    (el: any) => el !== txt
                                );
                                addSplits(result);
                            }}
                        >
                            <MdClear color={theme.icon} />
                        </button>
                    </div>
                ))}
            </div>
        );
    };
    useEffect(() => {
        setUser(localStorage.getItem('login') as string);
    }, []);
    const date = new Date().toISOString().substring(0, 10);
    return (
        <IconContext.Provider value={{ size: '20px', color: theme.icon }}>
            <form
                className={styles.formContainer}
                autoComplete="none"
                onSubmit={handleSubmit}
            >
                <div className={styles.form}>
                    <div className={styles.dateContainer}>
                        <input
                            type="date"
                            defaultValue={date}
                            name="date"
                            ref={dateRef}
                            required
                            className={styles.date}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className={styles.row}>
                        <input
                            type="text"
                            name="title"
                            required
                            ref={titleRef}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="cost">Individual Cost</label>
                    </div>
                    <div className={styles.row}>
                        <input
                            required
                            type="number"
                            min="0"
                            defaultValue="0"
                            name="cost"
                            ref={costRef}
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="">Add New Party</label>
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

export default DivideByQuantity;
