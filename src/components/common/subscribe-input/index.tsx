import {ChangeEvent, ChangeEventHandler, useState} from "react";
import Button from "@/src/components/common/button";

interface Props {
    onClick?: () => void;
    loading?: boolean;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SubscribeInput({
                                           onClick,
                                           onChange,
                                           value,
                                           loading
                                       }: Props) {
    const [showError, setShowError] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        setShowError(!EMAIL_REGEX.test(event.target.value));
    }

    const handleClick = () => {
        onClick?.();
    }

    return (
        <div className="flex flex-col space-y-1">
            <div
                className="flex items-center border border-app-grey-100 rounded-lg focus:ring-2 focus:ring-blue-500">
                <input type="email" placeholder="Enter your email"
                       value={value}
                       onChange={handleChange}
                       className="flex-grow px-4 py-2 text-sm rounded-l-lg focus:outline-none text-black"
                />
                <Button onClick={handleClick} label='Submit' loading={loading}
                        variant='secondary'
                        disabled={!value || showError}
                        className='md:text-base text-sm'
                />
            </div>
            {showError ?
                <span className="text-xs text-red-500 mt-1">Please enter a valid email address.</span> : null}
        </div>
    )
}