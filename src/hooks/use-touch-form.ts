import {useOutletContext} from "react-router-dom";
import {OutletCtx} from "@/src/types/ui/outlet-ctx.types.ts";
import {useRef} from "react";

export const useTouchForm = () => {
    const {touchForm} = useOutletContext<OutletCtx>();
    const touched = useRef(false);

    const handleChangeRange = (value: number, setter: (value: number) => void,) => {
        setter(value);

        if (!touched.current) touchForm();

        touched.current = true;
    }

    return {handleChangeRange}
}