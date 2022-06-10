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
    _id: string;
    creator: string;
    title: string;
    date: string;
    payable: number;
    vpa: '';
};
const Payments: NextPage = () => {
    const handlePay = () => {};
    const [paymentData, setPaymentData] = useState<Array<PaymentTxType>>([]);
    const [userData, setUsersData] = useState({});
    useEffect(() => {
        async function getDetails() {
            const resP = await fetch(
                `/api/payments?user=${localStorage.getItem('login')}`
            ).then((res) => res.json());
            console.log(resP);
            setPaymentData(JSON.parse(resP).payments);
            const resU = await fetch('/api/users').then((res) => res.json());
            const obj = {};
            resU.forEach((el: any) => {
                //@ts-ignore
                obj[el.name as string] = el.vpa || '';
            });
            setUsersData(obj);
        }
        getDetails();
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
                            href={`upi://pay?pa=${
                                //@ts-ignore
                                userData[data.creator]
                            }&amp;pn=${data.creator}&amp;cu=INR&amp;am=${
                                data.payable
                            }&amp;tn=${
                                data.title + '_' + data.date
                            }&amp;tr=2331`}
                            className="upi-pay1"
                        >
                            Pay
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
            <h2 className={styles.pagetitle}>Outstanding Payments</h2>
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
export default Payments;
