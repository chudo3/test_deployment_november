import React, {forwardRef, useMemo} from 'react';
import {ButtonVariant} from "../../../types/ui/button.types.ts";

interface Props {
    label: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    variant?: ButtonVariant;
    className?: string;
    form?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef(({
    label,
    prefix,
    suffix,
    disabled,
    loading,
    onClick,
    className,
    variant = 'primary',
    form,
    type,
    id
}: Props, ref) => {

    const cl = useMemo(() => {
        const baseClasses = `button flex flex-row justify-center items-center gap-1 rounded-lg font-semibold py-2 px-4 border border-app-border-button hover:bg-app-grey-10`;
        if (disabled) {
            return `${baseClasses} text-app-grey-10 hover:bg-[#fafafa] ${className}`;
        }
        if (variant === 'outlined') {
            return `${baseClasses} border border-app-gray-10 text-app-grey-10 ${className}`;
        }
        if (variant === 'primary') {
            return `${baseClasses} bg-white color text-app-grey-100 ${className}`;
        }
        if (variant === 'secondary') {
            return `${baseClasses} bg-app-grey-100 text-white border border-app-grey-100 hover:bg-black ${className}`;
        }

        return baseClasses;
    }, [variant, disabled, className])

    return (
        <button
            className={cl}
            onClick={onClick}
            disabled={disabled || loading}
            form={form}
            type={type}
            id={id}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={ref}
        >
            {loading ? 'Loading...' :
                <>
                    {prefix}
                    {label}
                    {suffix}
                </>
            }
        </button>
    )
})

Button.displayName = 'Button';

export default Button;

