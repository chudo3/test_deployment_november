import {useContext} from "react";
import {BackdropContext} from "@/src/context/backdrop.context.tsx";

export const useBackdrop = () => {
    const {isShownBackdrop, show, hide} = useContext(BackdropContext)

    return {isShownBackdrop, showBackdrop: show, hideBackdrop: hide};
}