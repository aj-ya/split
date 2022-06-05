import { copyFileSync } from 'fs';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { MdArrowForward } from 'react-icons/md';
import styles from '../../styles/ExpenseHistory.module.scss';
import theme from '../../utils/themes';

type PaymentTxType = {
    _id: string;
    creator: string;
    title: string;
    date: string;
    payable: number;
};
const PaymentHistory: NextPage = () => {
    const [paymentData, setPaymentData] = useState<Array<PaymentTxType>>([]);

    async function getDetails() {
        const resE = await fetch(
            `/api/paymentHistory?user=${localStorage.getItem('login')}`
        ).then((res) => res.json());
        console.log(resE);
        setPaymentData(JSON.parse(resE).payments);
    }
    useEffect(() => {
        getDetails();
        console.log(paymentData);
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
                    <div className={styles.creator}>{data.creator}</div>
                </div>
            </li>
        );
    };

    const MapExpenses = (props: any) => {
        return (
            <ul className={styles.list}>
                {paymentData.map((element, index) => {
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
            <h2 className={styles.pagetitle}>Payment History</h2>
            {paymentData.length > 0 ? (
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
};
export default PaymentHistory;
