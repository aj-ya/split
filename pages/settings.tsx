import { NextPage } from 'next';
import Image from 'next/image';
import { FormEvent, FormEventHandler } from 'react';
const Settings: NextPage = () => {
    const handleSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="vpa">Virtual Payment Address.</label>
                <input type="text" name="vpa" />
                <label htmlFor="pass">Password</label>
                <input type="text" name="pass" />
            </form>
        </div>
    );
};
export default Settings;
