import {AssessmentLevels} from "@/src/types/assesments/assesments.types.ts";

export const getAssessmentLabelByLevel = (level: number): string => {
    if (level >= 0 && level <= 20) return AssessmentLevels.Emergency;
    if (level >= 21 && level <= 40) return AssessmentLevels.Pain;
    if (level >= 41 && level <= 60) return AssessmentLevels.Growth;
    if (level >= 61 && level <= 80) return AssessmentLevels.Ok;
    if (level >= 81 && level <= 100) return AssessmentLevels.Excellent;

    return '';
}