import {createContext, ReactNode, useState} from "react";
import Backdrop from "@/src/components/common/backdrop";

export const BackdropContext = createContext<{
    isShownBackdrop: boolean;
    show: () => void,
    hide: () => void,
}>({
    isShownBackdrop: false,
    show: () => {
    },
    hide: () => {
    },
});

interface Props {
    children?: ReactNode;
}

const BackdropProvider = ({children}: Props) => {
    const [isShownBackdrop, setIsShown] = useState<boolean>(false);

    const show = () => setIsShown(true);
    const hide = () => setIsShown(false);


    return (<>
            {isShownBackdrop ? <Backdrop/> : null}
            <BackdropContext.Provider
                value={{
                    isShownBackdrop,
                    show,
                    hide
                }}>{children}</BackdropContext.Provider>
        </>
    )

}

export default BackdropProvider