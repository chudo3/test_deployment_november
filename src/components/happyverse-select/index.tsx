import { SelectProps } from "@/src/types/ui/select.types.ts";
import "./happyverse-select.css";
import AppSlider from "@/src/components/common/app-slider";

interface Props extends SelectProps {
    label: string;
    hint?: string;
}

const modifiers = {
    excellent: "bg-assessment-excellent",
    ok: "bg-assessment-ok",
    growth: "bg-assessment-growth",
    pain: "bg-assessment-pain",
    emergency: "bg-assessment-emergency",
    default: "bg-assessment-default"
};

const getWrapperClassName = (value: number) => {
    let className = modifiers.growth;

    if (value >= 0 && value <= 20) {
        className = modifiers.emergency;
    }
    if (value >= 21 && value <= 40) {
        className = modifiers.pain;
    }
    if (value >= 41 && value <= 60) {
        className = modifiers.growth;
    }
    if (value >= 61 && value <= 80) {
        className = modifiers.ok;
    }
    if (value >= 81 && value <= 100) {
        className = modifiers.excellent;
    }
    return `happyverse-select flex flex-col items-center justify-center h-[136px] sm:h-[160px] relative rounded-[24px] p-4 sm:p-6 ${className}`;
};

const HappyverseSelect = ({ value, onChange, label, hint }: Props) => {
    const wrapperClass = getWrapperClassName(value as number);

    return (
        <div className={wrapperClass}>
            <h4 className="happyverse-slider__label w-full text-center text-white text-[14px] sm:text-lg font-semibold absolute top-[20px] left-1/2 transform -translate-x-1/2 cursor-default"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={hint}>
                {label}
            </h4>
            <div className="w-full flex items-center justify-center">
                <AppSlider value={value} onChange={onChange} className="w-full h-2 md:h-2.5" />
            </div>
        </div>
    );
};

export default HappyverseSelect;