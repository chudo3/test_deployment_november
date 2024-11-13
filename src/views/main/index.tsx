import HealthIcon from '../../assets/icons/health.svg?react'
import AssessmentCard from "@/src/components/common/assessment-card";
import {Link} from "react-router-dom";
import {
    AssessmentListItem,
    Assessments
} from "@/src/types/assesments/assesments.types.ts";
import Button from "@/src/components/common/button";
import {useCheckUserAuth} from "@/src/hooks/use-check-user-auth.ts";
import { useViewportHeight } from "@/src/hooks/use-viewport-height"; 
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/src/context/auth.context.tsx";
import {APIGetAverageModules} from "@/src/api";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {onAnalytics} from "@/src/firebase/analytics.ts";
import {useBackdrop} from "@/src/hooks/use-backdrop.ts";
import BaseLayout from "@/src/components/layout/base-layout";
import {TotalMetricsDTO} from "@/src/types/api/api.types.ts";
import TotalMetrics from "@/src/components/TotalMetrics";

const ASSESSMENTS: AssessmentListItem[] = [
    {
        assessment: Assessments.Health,
        label: 'Health',
        path: '/assessment/health',
        icon: <HealthIcon/>,
        average: 0,
        change: 0,
        is_exist: false,
    },

];

const MainView = () => {
    const {signOutWithGoogle, user} = useContext(AuthContext);
    const [assessments, setAssessments] = useState<AssessmentListItem[]>(ASSESSMENTS);
    const [totalMetrics, setTotalMetrics] = useState<TotalMetricsDTO>({
        total_change: 0,
        total_average: 0
    });
    const {showBackdrop, hideBackdrop} = useBackdrop();

    useViewportHeight();

    useCheckUserAuth();

    const fetchData = async () => {
        if (!user) throw new Error('User must be logged in!');

        showBackdrop();

        try {
            const response = await APIGetAverageModules({accessToken: user.stsTokenManager.accessToken});
            setAssessments(ASSESSMENTS.map(assessment => ({
                ...assessment,
                average: response.module_averages_and_changes?.[assessment.assessment]?.average ?? 0,
                change: response.module_averages_and_changes?.[assessment.assessment]?.change ?? 0,
                is_exist: response.module_averages_and_changes?.[assessment.assessment]?.is_exist ?? false,
            })))
            setTotalMetrics(response.total_metrics);
        } catch (error) {
            const err = error as AxiosError;

            if (err.status === 401) {
                void signOutWithGoogle();
                toast.success('You have logged out, because your token has expired. Please log in again.');
                return
            }
            toast.error(err.message);
        } finally {
            hideBackdrop();
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchData();
    }, []);

    const handleClickCard = (assessment: AssessmentListItem) => {
        onAnalytics('module_click_' + assessment.assessment);
        onAnalytics('module_click', {
            action: 'Module click',
            value: assessment.assessment
        })

    }

    return (
        <BaseLayout
            headerLeftContent={<div className='hidden md:block min-w-14'/>}
            headerRightContent={
                <Link to='login'
                      className='hidden md:block'
                >
                    <Button label='Log Out'
                            className='md:p-2 md:px-4 md:text-base text-xs'
                            onClick={signOutWithGoogle}/>
                </Link>
            }
            footer={
                <div
                    className='flex flex-row gap-2 justify-end p-4 md:hidden'>
                    <Link to='login'
                    >
                        <Button label='Log Out'
                                className='md:p-2 md:px-4 md:text-base text-sm'
                                onClick={signOutWithGoogle}/>
                    </Link>
                </div>}
        >
            <div
                className='flex flex-col flex-grow items-center gap-4 p-5 sm:p-0 sm:gap-9'>
                <TotalMetrics lastMonthScore={totalMetrics.total_average}
                              monthlyChangeScore={totalMetrics.total_change}/>
                <div className='assessments gap-1.5 sm:gap-3'>
                    {assessments.map((assessment) => (
                        <Link key={assessment.assessment}
                              to={assessment.path}>
                            <AssessmentCard
                                level={assessment.average}
                                label={assessment.label}
                                change={assessment.change}
                                onClick={() => handleClickCard(assessment)}
                                hasTouched={assessment.is_exist}
                            >
                                {assessment.icon}
                            </AssessmentCard>
                        </Link>
                    ))}
                </div>
            </div>
        </BaseLayout>
    )
}

export default MainView;