// import "./assessment-level.css";

import {getAssessmentLabelByLevel} from "@/src/helpers/assessment.helpers.ts";

interface Props {
    level: number;
    change: number;
}

const AssessmentLevel = ({ level, change }: Props) => {
    const levelPercentage = `${Math.ceil(level)}%`;
    const changePercentage = `${change}%`;
    const label = getAssessmentLabelByLevel(level);

    const percentageClass = 'text-center flex items-center justify-center text-white font-semibold';

    return (
        <div
            className='flex flex-row justify-between items-center sm:w-min bg-black bg-opacity-60 text-white rounded-[9px] sm:rounded-[16px] h-[24px] sm:h-7 text-[8px] sm:text-[14px] font-semibold space-x-0.5 sm:space-x-2 px-2 sm:px-3'>
            <span className={percentageClass}>
                {levelPercentage}
            </span>
            <div className="flex items-center h-full">
                <span
                    className="text-white flex-shrink-0 whitespace-nowrap border-l border-r border-[#485138] h-full w-[62px] sm:w-min justify-center flex items-center px-1 sm:px-2"
                >
                    {label}
                </span>
            </div>
            <span className={percentageClass}>
                {changePercentage}
            </span>
        </div>
    );
}

export default AssessmentLevel;