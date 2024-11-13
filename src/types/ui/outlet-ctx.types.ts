import {FormEvent, MutableRefObject} from "react";
import {AssessmentHintItem, Assessments} from "@/src/types/assesments/assesments.types.ts";

export interface OutletCtx {
    onSubmit: (e: FormEvent, data: {
        assessment: Assessments,
        params: Record<string, number>,
    }) => Promise<void>;
    onSubmitStart: () => void;
    onSubmitFinish: () => void;
    uploadParams: (data: {
        assessment: Assessments,
        params: Record<string, number>,
    }) => Promise<void>;
    nextButtonRef: MutableRefObject<HTMLButtonElement>,
    prevButtonRef: MutableRefObject<HTMLButtonElement>,
    backButtonRef: MutableRefObject<{ getBackButton: () => HTMLButtonElement }>,
    touchForm: () => void,
    setHints: (hints: AssessmentHintItem[]) => void,
}
