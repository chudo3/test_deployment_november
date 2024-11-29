import {FormEvent, useContext, useEffect, useRef, useState} from 'react';
import AssessmentPageLayout
    from "@/src/components/layout/assessment-page-layout";
import {FORM_ID} from "@/src/constants/forms.consts.ts";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    assessments,
    getAssessmentPathSiblings
} from "@/src/constants/assessments.consts.ts";
import toast from "react-hot-toast";
import Button from "@/src/components/common/button";
import {useCheckUserAuth} from "@/src/hooks/use-check-user-auth.ts";
import {
    AssessmentHintItem,
    Assessments
} from "@/src/types/assesments/assesments.types.ts";
import {APIGetPlan, APIUploadParams} from "@/src/api";
import {AuthContext} from "@/src/context/auth.context.tsx";
import {AxiosError} from "axios";
import openConfirmationModal from "@/src/components/modals/confirm-modal";
import {useBackdrop} from "@/src/hooks/use-backdrop.ts";
import openInfoModal from '@/src/components/modals/info-modal';
import ThankYou from "@/src/components/thankyou/ThankYou.tsx";

import "./style.css";

const AssessmentView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const nextRef = useRef();
    const prevRef = useRef();
    const assessmentLayoutRef = useRef();
    const {showBackdrop, hideBackdrop} = useBackdrop();
    const auth = useContext(AuthContext);
    const [links, setLinks] = useState<{
        next: string | null,
        prev: string | null,
        nextLabel: string | null,
        prevLabel: string | null,
    }>(getAssessmentPathSiblings(location.pathname));
    const [formTouched, setFormTouched] = useState(false)
    const [hints, setHints] = useState<AssessmentHintItem[]>([]);

    useEffect(() => {
        setLinks(getAssessmentPathSiblings(location.pathname))
        setFormTouched(false);
    }, [location]);

    const touchForm = () => setFormTouched(true);

    const title = assessments.find(assessment => location.pathname.includes(assessment))?.toUpperCase() ?? "";

    const uploadParams = async (data: {
        assessment: Assessments,
        params: Record<string, number>,
    }) => {
        if (!auth.user) throw new Error('User must be logged in!');

        if (!formTouched) return;

        await APIUploadParams({
            ...data,
            accessToken: auth.user?.stsTokenManager.accessToken
        });
    }

    const onSubmit = async (e: FormEvent, data: {
        assessment: Assessments,
        params: Record<string, number>,
    }) => {
        e.preventDefault();

        try {
            if (!auth.user) throw new Error('User must be logged in!!');

            await openConfirmationModal({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                title: "Your improvement plan is ready",
                label: links.next ? "Click «Send to email» to receive it via your email and proceed to the next category" : "Click «Send to email» to receive it via your email",
                confirmButtonText: 'Send to email',
                cancelButtonText: 'Cancel'
            })

            showBackdrop();
            await APIGetPlan({
                assessment: data.assessment,
                params: data.params,
                accessToken: auth.user.stsTokenManager.accessToken
            });

            //if (links.next) navigate(links.next)
            if (links.next) navigate("/thankyou");


        } catch (e) {
            const err = e as AxiosError
            if (!err.message) return;
            if (err.status === 401) {
                void auth.signOutWithGoogle();
                toast.success('You have logged out, because your token has expired. Please log in again.');
                return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(err.response?.data?.detail ?? err.message);
        } finally {
            hideBackdrop();
        }
    }

    const onSubmitStart = () => {

    }

    const onSubmitFinish = () => {

    }

    const handleClickBack = () => {

    }

    const handleInfoClick = async () => {
        await openInfoModal({title, hints});
    }

    useCheckUserAuth();

    return (
        <AssessmentPageLayout
            title={title}
            ref={assessmentLayoutRef}
            onClickHint={handleInfoClick}
            children={
                <Outlet context={{
                    onSubmitStart,
                    onSubmitFinish,
                    onSubmit,
                    uploadParams,
                    prevButtonRef: prevRef,
                    nextButtonRef: nextRef,
                    backButtonRef: assessmentLayoutRef,
                    touchForm,
                    setHints,
                }}/>
            }

            controls={<div
                className="assessment-controls_mobile assessment-controls">

                <Button label='Get Improvement Plan'
                        form={FORM_ID}
                        variant='secondary'
                        type="submit"
                        className='assessment-controls__submit md:p-2 md:px-4 min-w-[42%] md:min-w md:text-base md:grow lg:grow-0 order-first md:order-none lg:min-w-[600px] text-sm'
                />

            </div>}
            onClickBack={handleClickBack}
        >
        </AssessmentPageLayout>
    )
}

export default AssessmentView;