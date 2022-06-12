import { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader';
import styles from '../../styles/ExpenseHistory.module.scss';
import { PaymentHistoryObject } from '../../utils/types';

const PaymentHistory: NextPage = () => {
    const [paymentData, setPaymentData] = useState<Array<PaymentHistoryObject>>(
        []
    );
    const [loading, setLoading] = useState(true);
    async function getDetails() {
        setLoading(true);
        await fetch(`/api/paymentHistory?user=${localStorage.getItem('login')}`)
            .then((res) => res.json())
            .then((res) => {
                setPaymentData(JSON.parse(res).payments);
            })
            .catch(() => {
                setPaymentData([]);
            });
        setLoading(false);
    }
    useEffect(() => {
        getDetails();
    }, []);
    const ExpandableListItem = (props: any) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const active = activeItem === itemKey;

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
    if (!loading) {
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
    } else {
        return <Loader />;
    }
};
export default PaymentHistory;
