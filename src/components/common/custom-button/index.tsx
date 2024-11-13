// @ts-ignore
import React, {MouseEventHandler} from "react";

const CustomButton = ({label, onClick, className, form, type}: {
    onClick: MouseEventHandler,
    label: string,
    className?: string;
    form?: string;
    type?: 'button' | 'submit' | 'reset'
}) => {
    return (
        <button
            className={`custom-button bg-metrics-page-button text-app-font-color p-2 px-4 rounded ${className}`}
            form={form}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default CustomButton;