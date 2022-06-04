import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import {
    MdArrowBack,
    MdArrowForward,
    MdCheck,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdForward,
} from 'react-icons/md';
import styles from '../styles/Payments.module.scss';

type PaymentTxType = {
    expenseId: number;
    creater: string;
    title: string;
    date: string;
    account: string;
    payable: number;
};
const Payments: NextPage = () => {
    const handlePay = () => {};
    const [user, setUser] = useState<string>('');
    const [ExpenseData, setExpenseData] = useState<Array<PaymentTxType>>([
        {
            expenseId: 231,
            creater: 'ajeya',
            title: 'asd',
            account: '',
            date: '2022-06-21',
            payable: 30,
        },
        {
            expenseId: 232,
            creater: 'ajeya',
            title: 'Summers',
            date: '2022-06-14',
            payable: 300,
            account: '',
        },
        {
            expenseId: 231,
            creater: 'ajeya',
            title: 'Goa Trip',
            account: '',
            date: '2022-02-15',
            payable: 12000,
        },
        {
            expenseId: 231,
            creater: 'ajeya',
            title: 'Smoodh',
            payable: 12,
            date: '2022-05-11',
            account: '',
        },
    ]);
    useEffect(() => {
        setUser(localStorage.getItem('login') as string);
    }, []);
    const ExpandableListItem = (props: any) => {
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
                    <div className={styles.totalPrice}>
                        &#8377; {data.payable}
                    </div>
                </div>
                <div className={styles.lidesc} data-isactive={active}>
                    <div className={styles.date}>{data.date}</div>
                    <button className={styles.payButton} onClick={handlePay}>
                        {/* <div>Pay</div> */}
                        <a
                            href="upi://pay?pa=ajeybhat82@oksbi&amp;pn=Ajeya Bhat&amp;cu=INR&amp;am=10&amp;tr=1234ABCD"
                            className="upi-pay1"
                        >
                            Pay Now !
                        </a>
                        <MdArrowForward size="15px" />
                    </button>
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

    return (
        <div className={styles.container}>
            <h2 className={styles.pagetitle}>Outstanding Payments</h2>
            <main className={styles.main}>
                <MapExpenses
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            </main>
        </div>
    );
};
export default Payments;
