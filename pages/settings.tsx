import { NextPage } from 'next';
import logo from '../public/favicon.png';
import Image from 'next/image';
const Settings: NextPage = () => {
    return (
        <div className="container">
            <div className="imageContainer">
                <Image src={logo} alt="logo"></Image>
            </div>
        </div>
    );
};
export default Settings;
