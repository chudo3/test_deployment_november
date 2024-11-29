import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginView from "./views/login";
import AssessmentView from "@/src/views/assessment";
import HealthForm from "@/src/components/forms/health"
import {Toaster} from "react-hot-toast";
import AuthProvider from "@/src/context/auth.context.tsx";
import ModalContainer from 'react-modal-promise'
import BackdropProvider from "@/src/context/backdrop.context.tsx";
import UnsubView from "@/src/views/unsubscribe";
import MainView from "@/src/views/main";
import SubscribeView from "@/src/views/subscribe";
import ThankYou from "@/src/components/thankyou/ThankYou.tsx";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {path: '/', element: <MainView/>},
    {path: '/subscribe', element: <SubscribeView/>},
    {
        path: "/login",
        element: <LoginView/>,
    },
    {
        path: "assessment",
        element: <AssessmentView/>,
        children: [
            {path: 'health', element: <HealthForm/>},

        ]
    }, {path: 'unsubscribe',  element: <UnsubView/>},
    {path: '/thankyou', element: <ThankYou/>}
]);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BackdropProvider>
                <RouterProvider router={router}/>
                <Toaster position='top-center'
                         toastOptions={{
                             duration: 5000,
                             className: 'text-xl',
                             success: {
                                 className: 'text-lg border-2 border-green-500'
                             },
                             error: {
                                 className: 'text-lg border-2 border-red-500'
                             }
                         }}/>
                <ModalContainer/>
            </BackdropProvider>
        </AuthProvider>
    </React.StrictMode>
);
