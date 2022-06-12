import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import Loader from '../components/Loader';
import styles from '../styles/Payments.module.scss';
import { PaymentTxObject, StringMap } from '../utils/types';

function makeID(length: number) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

const createURI = (pa: string, pn: string, am: string, tn: string) => {
    let tr = makeID(10);
    let uri = `upi://pay?pa=${pa}&pn=${pn}&`;
    uri += `am=${am}&tn=${tn}&tr=${tr}&cu=INR`;
    return uri;
};
const Payments: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [paymentData, setPaymentData] = useState<Array<PaymentTxObject>>([]);
    const [userData, setUsersData] = useState({});
    useEffect(() => {
        async function getDetails() {
            setLoading(true);
            await fetch(`/api/payments?user=${localStorage.getItem('login')}`)
                .then((res) => res.json())
                .then((res) => {
                    setPaymentData(JSON.parse(res).payments);
                });

            await fetch('/api/users')
                .then((res) => res.json())
                .then((res) => {
                    const obj: StringMap = {};
                    res.forEach((el: any) => {
                        obj[el.name as string] = el.vpa || '';
                    });
                    return obj;
                })
                .then((obj) => {
                    setUsersData(obj);
                });
            setLoading(false);
        }
        getDetails();
    }, []);
    const ExpandableListItem = (props: any) => {
        const { activeItem, setActiveItem, itemKey, data, setData } = props;
        const pay_tn = data.title.split(' ').join('_') + '_' + data.date;

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
                    <button className={styles.payButton}>
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
    if (!loading) {
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
    } else {
        return <Loader />;
    }
};
export default Payments;
