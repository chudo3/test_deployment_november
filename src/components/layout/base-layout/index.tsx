import React from "react";
import "./style.css";

interface Props {
    children?: React.ReactNode;
    footer?: React.ReactNode;
    headerLeftContent?: React.ReactNode;
    headerRightContent?: React.ReactNode;
}

const BaseLayout = ({
                        children,
                        footer,
                        headerLeftContent,
                        headerRightContent
                    }: Props) => {

    return <section
        className='base-layout flex flex-col min-h-full-viewport min-w-screen'>
        <header
            className='app-header app-header_mobile w-full h-[60px] sm:h-[76px]'
        >
            <div
                className='app-header__right flex items-center p-3 h-16'>{headerLeftContent}</div>
            <div
                className='app-header__logo flex flex-row grow order-first md:order-none justify-center items-center gap-2 md:gap-4 border-b md:border-none font-bold h-16'
            >
                <h1 className='app-header-logo text-xl md:text-4xl'>Health Spectrum</h1>
            </div>
            <div
                className='app-header__right flex items-center justify-end p-3 md:p-0 h-16'>{headerRightContent}</div>
        </header>
        {children}
        <footer>{footer}</footer>
    </section>
}

export default BaseLayout;
