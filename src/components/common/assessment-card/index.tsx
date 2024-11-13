import React, { ReactNode, useMemo } from "react";
import AssessmentLevel from "@/src/components/common/assessment-card/components/assessment-level";
import ArrowRight from "../../../assets/icons/white-chevron-right.svg?react";
import SmallArrowRight from "../../../assets/icons/sm-arrow-right.svg?react";

interface Props {
    label: string;
    children?: ReactNode;
    level: number;
    change: number;
    onClick?: () => void;
    hasTouched?: boolean;
}

const AssessmentCard = ({
    label,
    level = 0,
    children,
    change,
    onClick,
    hasTouched
}: Props) => {

    const cardBackground = useMemo(() => {
        if (!hasTouched) {
            return 'bg-assessment-default'
        }
        if (level >= 0 && level <= 20) {
            return 'bg-assessment-emergency';
        } else if (level >= 21 && level <= 40) {
            return 'bg-assessment-pain';
        } else if (level >= 41 && level <= 60) {
            return 'bg-assessment-growth';
        } else if (level >= 61 && level <= 80) {
            return 'bg-assessment-ok';
        } else if (level >= 81 && level <= 100) {
            return 'bg-assessment-excellent';
        }

        return '';
    
    }, [level, hasTouched]);

    const labelColor = hasTouched ? 'text-white' : 'text-app-default-font';

    return (
        <div
            className={`assessment-card flex flex-col items-center justify-center cursor-pointer ${cardBackground} w-28 h-28 sm:w-56 sm:h-56 rounded-[20px] sm:rounded-[40px] overflow-hidden`} 
            onClick={onClick}
        >
            <p className={`flex items-center justify-center assessment-card__label font-semibold text-center pt-3 text-[11px] sm:text-xl sm:pt-0 ${labelColor} truncate`}>
                {label} 
                {hasTouched && <ArrowRight className="w-3 h-3 sm:w-6 sm:h-6"/>}
            </p>
            {children && (
                <div className="mt-2 sm:mt-7 sm:mb-7 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-20 sm:h-20">
                        {React.cloneElement(children as React.ReactElement, {
                            className: "w-full h-full"
                        })}
                    </div>
                </div>
            )}
            {hasTouched ? (
                <div className="mt-auto sm:mt-0">
                    <AssessmentLevel 
                        level={level} 
                        change={change} 
                    />
                </div>
            ) : (
                <div className="flex justify-center w-24 sm:w-40 h-5 sm:h-8 m-2 sm:m-0 rounded-[20px] bg-[#f5f5f5]">
                    <p className="flex items-center gap-0.5 sm:gap-1 text-app-default-font text-[8px] sm:text-sm font-medium text-ellipsis">
                        Get your first plan <SmallArrowRight className="w-2 h-2 sm:w-3 sm:h-3"/>
                    </p>
                </div>
            )}
        </div>
    )
}

export default AssessmentCard;