import InfoBlock from "@/src/components/common/info-block";
import {getAssessmentLabelByLevel} from "@/src/helpers/assessment.helpers.ts";
import {useMemo} from "react";
import {format} from "date-fns";

interface Props {
    lastMonthScore: number;
    monthlyChangeScore: number;
}

export default function TotalMetrics({
                                         lastMonthScore,
                                         monthlyChangeScore
                                     }: Props) {
    const level = getAssessmentLabelByLevel(lastMonthScore);
    const lastMonthScoreLabel = useMemo<string>(() => {
        const date = new Date();
        return `${format(date, "LLL")} '${format(date, "yy")} Score, %`
    }, [])
    return <div
        className='main-average-info flex flex-col w-[342px] gap-2 sm:w-auto sm:flex-row justify-between'>
        <InfoBlock label={lastMonthScoreLabel} value={`${lastMonthScore}%`}/>
        <InfoBlock label='Qualitative Score' value={level}/>
        <InfoBlock label='Monthly change, %' value={`${monthlyChangeScore}%`}/>
    </div>
}