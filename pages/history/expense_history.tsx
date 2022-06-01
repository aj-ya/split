import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MdCheck, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from '../../styles/ExpenseHistory.module.scss';

const ExpenseHistory: NextPage = () => {
    const [user, setUser] = useState<string>('');
    const [ExpenseData, setExpenseData] = useState([
        {
            expenseId: 232,
            creater: 'ajeya',
            title: 'hello',
            type: 'bulk',
            cost: 10,
            date: '2022-06-14',
            breakup: [
                { name: 'Shivgond', payable: 10 },
                { name: 'Karthik', payable: 20 },
            ],
            paid: false,
        },
        {
            expenseId: 231,
            creater: 'ajeya',
            title: 'asd',
            type: 'single',
            date: '2022-06-21',
            cost: 30,
            breakup: [
                { name: 'Shivgond', payable: 15 },
                { name: 'Ajeya', payable: 15 },
            ],
            paid: true,
        },
        {
            creater: 'ajeya',
            title: 'Goa Trip',
            type: 'single',
            date: '2022-02-15',
            cost: 12000,
            breakup: [
                { name: 'Shivgond', payable: 3000 },
                { name: 'Sushant', payable: 3000 },
                { name: 'Karthik', payable: 3000 },
                { name: 'Kempya', payable: 3000 },
            ],
        },
        {
            creater: 'ajeya',
            title: 'Smoodh',
            type: 'bulk',
            cost: 12,
            date: '2022-05-11',
            breakup: [
                { name: 'Ajeya', payable: 24 },
                { name: 'Sushant', payable: 24 },
                { name: 'Shivgond', payable: 12 },
            ],
        },
    ]);
    useEffect(() => {
        setUser(localStorage.getItem('login') as string);
    }, []);
    const ComputeTotalPrice = (props) => {
        const { data } = props;
        if (data.type === 'single') {
            return <div className={styles.totalPrice}>&#8377; {data.cost}</div>;
        } else {
            let totalPrice = 0;
            data.breakup.forEach((el) => {
                totalPrice += el.payable;
            });
            return (
                <div className={styles.totalPrice}>&#8377; {totalPrice}</div>
            );
        }
    };
    const ExpandableListItem = (props) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const active = activeItem === itemKey;
        // const handlePaid = (txId) => {
        //     console.log(txId);
        // };
        return (
            <li
                onClick={() => {
                    setActiveItem(activeItem === itemKey ? 0 : itemKey);
                }}
                className={styles.listItem}
            >
                <div className={styles.toprow}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.date}>{data.date}</div>
                    <ComputeTotalPrice data={data} />
                </div>
                <div className={styles.lidesc} data-isactive={active}>
                    {data.breakup.map((el) => (
                        <span key={el.name} className={styles.breakupitem}>
                            <span>{el.name}</span>:&nbsp;
                            <span className={styles.payable}>
                                &#x20B9;{el.payable}
                            </span>
                        </span>
                    ))}
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

    const MapExpenses = (props) => {
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
            <main className={styles.main}>
                <MapExpenses
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            </main>
        </div>
    );
};
export default ExpenseHistory;
