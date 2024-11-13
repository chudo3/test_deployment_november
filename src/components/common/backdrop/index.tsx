import {ReactNode} from "react";
import LoadingIcon from "../../../assets/icons/loading.svg?react"

interface Props {
    children?: ReactNode;
}

export default function Backdrop({children}: Props) {
    return <div
        className="backdrop flex flex-col items-center justify-center h-screen w-screen z-max backdrop-blur overflow-hidden gap-6 fixed top-0 left-0 backdrop-brightness-50">
        <LoadingIcon className='animate-spin'/>
        {children}
    </div>;
}