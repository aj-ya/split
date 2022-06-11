import { randomInt } from 'crypto';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import styles from '../styles/Payments.module.scss';

type PaymentTxType = {
    _id: string;
    creator: string;
    title: string;
    date: string;
    payable: number;
    vpa: '';
};
function makeid(length: number) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

const createURI = (pa: string, pn: string, am: string, tn: string) => {
    let tr = makeid(12);
    let uri = `upi://pay?pa=${pa}&pn=${pn}&`;
    uri += `am=${am}&tn=${tn}&tr=${tr}&cu=INR`;
    return uri;
};
const Payments: NextPage = () => {
    interface StringMap {
        [key: string]: string;
    }
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
            const obj: StringMap = {};
            resU.forEach((el: any) => {
                obj[el.name as string] = el.vpa || '';
            });
            setUsersData(obj);
        }
        getDetails();
    }, []);
    const ExpandableListItem = (props: any) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const pay_tn = data.title.split(' ').join('_') + '_' + data.date;

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
                            href={createURI(
                                (userData as any)[data.creator],
                                data.creator,
                                data.payable,
                                pay_tn
                            )}
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
