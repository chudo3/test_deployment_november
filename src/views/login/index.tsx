// @ts-ignore
import React, {useContext, useEffect} from "react";
import { useViewportHeight } from "@/src/hooks/use-viewport-height";
import Button from "../../components/common/button";
import GoogleLogo from "../../assets/icons/google.svg?react"
import AppLogo from "../../assets/icons/logo.svg?react"
import {AuthContext} from "@/src/context/auth.context.tsx";
import {useNavigate} from "react-router-dom";

import HealthIcon from '../../assets/login-bar-icons/health.svg?react';

const LoginView = () => {
    const {
        loading,
        user,
        signInWithGoogle,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    useViewportHeight();

    const signIn = async () => {
        await signInWithGoogle()
        navigate("/")
    }

    const icons = [
        { Icon: HealthIcon, name: 'health' },

    ];

    useEffect(() => {
        if (user) navigate("/")
    }, [user]);

    return (
        <div className="flex flex-col min-h-full-viewport pb-8">
            <div
                className='login flex flex-col gap-6 items-center justify-center flex-grow'>
            <div
                className='login-title flex flex-col items-center mt-[10vh]'>
                <AppLogo/>
                <p className='login-title mt-3 font-medium text-center text-app-font-color'>
                    Health Spectrum Project / CS6440
                </p>

            </div>
            <Button prefix={<GoogleLogo/>} label={'Continue with Google'}
                    loading={loading}
                    onClick={signIn}/>
            </div>
            <div className="bg-white shadow-md rounded-full w-[75%] p-6 flex flex-wrap justify-center items-center gap-4 sm:w-[464px] mx-auto">
                {icons.map(({ Icon, name }) => (
                    <Icon key={name}/>
                ))}
            </div>
        </div>
    )
}

export default LoginView;