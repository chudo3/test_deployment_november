import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletCtx } from "../types/ui/outlet-ctx.types";
import { AssessmentHintItem } from "../types/assesments/assesments.types";


export const useHints = (hintInfo: AssessmentHintItem[]) => {
    const {setHints} = useOutletContext<OutletCtx>();

    useEffect(() => {
        setHints(hintInfo);
    }, [])
}