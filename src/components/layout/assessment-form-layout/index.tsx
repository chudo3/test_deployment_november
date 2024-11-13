// @ts-ignore
import React, {FormEvent, ReactNode} from "react";

interface Props {
    children?: ReactNode;
    formId?: string;
    onSubmit?: (e: FormEvent) => void;
}

const AssessmentFormLayout = ({children, formId, onSubmit}: Props) => {
    return (
        <form
            className="assessment-form-layout flex flex-col gap-4 min-w-[320px] p-4 sm:p-6 pt-0 sm:pt-0"
            id={formId}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}

export default AssessmentFormLayout;