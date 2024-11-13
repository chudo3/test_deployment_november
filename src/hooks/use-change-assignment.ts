import {Assessments} from "@/src/types/assesments/assesments.types.ts";
import {useNavigate, useOutletContext} from "react-router-dom";
import {OutletCtx} from "@/src/types/ui/outlet-ctx.types.ts";
import {useEffect} from "react";
import {useBackdrop} from "@/src/hooks/use-backdrop.ts";

interface Props {
    assessment: Assessments,
    params: Record<string, number>,
}

export const useChangeAssignment = (data: Props) => {
    const {
        uploadParams,
        prevButtonRef,
        nextButtonRef,
        backButtonRef,
    } = useOutletContext<OutletCtx>();

    const {showBackdrop, hideBackdrop} = useBackdrop();
    const navigate = useNavigate();


    useEffect(() => {
        const evt = 'click'
        const handleClick = () => {
            uploadParams(data);
        }
        const handleClickBack = async () => {
            showBackdrop();
            try {
                await uploadParams(data);
                navigate('/');
            } finally {
                hideBackdrop();
            }
        }

        const backButton = backButtonRef.current.getBackButton();
        const prevButton = prevButtonRef.current;
        const nextButton = nextButtonRef.current;


        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        backButton && backButton.addEventListener(evt, handleClickBack);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        prevButton && prevButton.addEventListener(evt, handleClick);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        nextButton && nextButton.addEventListener(evt, handleClick);


        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            prevButton && prevButton.removeEventListener(evt, handleClick);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            nextButton && nextButton.removeEventListener(evt, handleClick);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            backButton && backButton.removeEventListener(evt, handleClickBack);
        }


    }, [uploadParams, nextButtonRef, prevButtonRef, backButtonRef, data]);
}