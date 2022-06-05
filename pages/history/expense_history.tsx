import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdCheck,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdDeleteOutline,
} from 'react-icons/md';
import DivideByQuantity from '../../components/Expenses/DivideByQuantity';
import styles from '../../styles/ExpenseHistory.module.scss';
import theme from '../../utils/themes';

type ExpenseType = {
    expenseId: number;
    creator: string;
    title: string;
    cost: number;
    type: string;
    date: string;
    paid: string[];
    breakup: Array<{ name: string; payable: number }>;
    _id: string;
};
const ExpenseHistory: NextPage = () => {
    const [ExpenseData, setExpenseData] = useState<Array<ExpenseType>>([
        {
            _id: '2131231241241g',
            expenseId: 231,
            creator: 'ajeya',
            title: 'data_notLoaded',
            type: 'single',
            date: '2022-06-21',
            cost: 30,
            breakup: [
                { name: 'Shivgond', payable: 15 },
                { name: 'Ajeya', payable: 15 },
            ],
            paid: ['shivgond'],
        },
    ]);

    async function getDetails() {
        const resE = await fetch(
            `/api/expenses?user=${localStorage.getItem('login')}`
        ).then((res) => res.json());
        setExpenseData(resE);
    }
    async function markPaid(txid: string, name: string) {
        const resM = await fetch(
            `/api/markPaid?tx_id=${txid}&name=${name}`
        ).then((res) => res.json());
        if (resM.job == 'done.') {
            await getDetails();
        }
    }
    useEffect(() => {
        getDetails();
    }, []);
    const ComputeTotalPrice = (props: { data: any }) => {
        const { data } = props;
        if (data.type === 'single') {
            return <div className={styles.totalPrice}>&#8377; {data.cost}</div>;
        } else {
            let totalPrice = 0;
            data.breakup.forEach((el: { name: string; payable: number }) => {
                totalPrice += el.payable;
            });
            return (
                <div className={styles.totalPrice}>&#8377; {totalPrice}</div>
            );
        }
    };
    const ExpandableListItem = (props: any) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const active = activeItem === itemKey;
        // const handlePaid = (txId) => {
        //     console.log(txId);
        // };
        return (
            <li className={styles.listItem}>
                <div className={styles.toprow}>
                    <div className={styles.title}>{data.title}</div>
                    <ComputeTotalPrice data={data} />
                    <button
                        className={styles.dropdown}
                        onClick={() => {
                            setActiveItem(activeItem === itemKey ? 0 : itemKey);
                        }}
                    >
                        {activeItem !== itemKey ? (
                            <MdArrowDropDown size="15px" />
                        ) : (
                            <MdArrowDropUp size="15px" />
                        )}
                    </button>
                </div>
                <div className={styles.lidesc} data-isactive={active}>
                    <div className={styles.breakup}>
                        <IconContext.Provider
                            value={{ size: '15px', color: theme.icon }}
                        >
                            {data.breakup.map(
                                (el: { name: string; payable: number }) => (
                                    <span
                                        key={el.name}
                                        className={styles.breakupitem}
                                    >
                                        <span>{el.name}</span>:&nbsp;
                                        <span className={styles.payable}>
                                            &#x20B9;{el.payable}
                                        </span>
                                        <button
                                            onClick={() => {
                                                markPaid(data._id, el.name);
                                            }}
                                            className={`${styles.button} ${styles.checkboxbutton}`}
                                        >
                                            {data.paid.includes(el.name) ? (
                                                <MdCheckBox />
                                            ) : (
                                                <MdCheckBoxOutlineBlank />
                                            )}
                                        </button>
                                    </span>
                                )
                            )}
                        </IconContext.Provider>
                    </div>
                    <IconContext.Provider
                        value={{ size: '25px', color: theme.icon }}
                    >
                        <div className={styles.actionrow}>
                            <div className={styles.date}>{data.date}</div>
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.button}
                                    onClick={async () => {
                                        if (window.confirm('Are you sure?')) {
                                            const res = await fetch(
                                                '/api/expenses',
                                                {
                                                    method: 'DELETE',
                                                    body: data._id,
                                                }
                                            );
                                            if (res.status === 200) {
                                                await getDetails();
                                            }
                                        }
                                    }}
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>
                {/* <div>
                    {
                        <button
                            className={styles.checkboxSim}
                            onClick={() => {
                                handlePaid(data.expenseId);
                                data.paid = !data.paid;
                                setExpenseData();
                            }}
                        >
                            {data.paid ? (
                                <MdCheckBox />
                            ) : (
                                <MdCheckBoxOutlineBlank />
                            )}
                        </button>
                    }
                </div>*/}
            </li>
        );
    };

    const MapExpenses = (props: any) => {
        return (
            <ul className={styles.list}>
                {ExpenseData.map((element, index) => {
                    return (
                        <ExpandableListItem
                            {...props}
                            data={element}
                            key={index + 1}
                            itemKey={index + 1}
                        />
                    );
                })}
            </ul>
        );
    };

    const [activeItem, setActiveItem] = useState(0);
    return (
        <div className={styles.container}>
            <h2 className={styles.pagetitle}>Expense History</h2>
            {ExpenseData.length > 0 ? (
                <main className={styles.main}>
                    <MapExpenses
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    />
                </main>
            ) : (
                <h3>None</h3>
            )}
            {/* <div className={styles.modal}>
                <div className={styles.modalBox}>
                    <h3 className={styles.modalTitle}>Are you sure?</h3>
                </div>
            </div> */}
        </div>
    );
};
export default ExpenseHistory;
