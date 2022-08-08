import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import {
    MdArrowDropDown,
    MdArrowDropUp,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdDeleteOutline,
} from 'react-icons/md';
import Loader from '../../components/Loader';
import styles from '../../styles/ExpenseHistory.module.scss';
import theme from '../../utils/themes';
import { ExpenseHistoryObject } from '../../utils/types';

const ExpenseHistory: NextPage = () => {
    const [ExpenseData, setExpenseData] = useState<Array<ExpenseHistoryObject>>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);
    async function getDetails() {
        setLoading(true);
        await fetch(`/api/expenses?user=${localStorage.getItem('login')}`)
            .then((res) => res.json())
            .then((res) => {
                setExpenseData(res);
            })
            .catch(() => {
                setExpenseData([]);
            });
        setLoading(false);
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
        let totalPrice = 0;
        if (data.type === 'single') {
            totalPrice = data.cost;
        } else {
            data.breakup.forEach((el: { name: string; payable: number }) => {
                // console.log(el.payable);
                totalPrice += el.payable;
            });
        }
        console.log(totalPrice);
        return (
            <div className={styles.totalPrice}>
                &#8377; {totalPrice.toFixed(2)}
            </div>
        );
    };

    const ExpandableListItem = (props: any) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const active = activeItem === itemKey;
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
                                            &#x20B9;{el.payable.toFixed(2)}
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
    if (!loading) {
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
            </div>
        );
    } else {
        return <Loader />;
    }
};
export default ExpenseHistory;
