import {ReactElement} from "react";
import {AverageItemDTO} from "@/src/types/api/api.types.ts";


export enum Assessments {
    Emotions = 'emotions',
    Freedom = 'freedom',
    Health = 'health',
    Intelligence = 'intelligence',
    Love = 'love',
    Occupation = 'occupation',
    Productivity = 'productivity',
    Relationships = 'relationships',
    Wealth = 'wealth'
}

export interface AssessmentListItem extends AverageItemDTO {
    assessment: Assessments;
    label: string;
    path: string;
    icon: ReactElement;
}

export enum AssessmentLevels {
    Emergency = 'Emergency',
    Pain = 'Pain',
    Growth = 'Growth Area',
    Ok = 'OK',
    Excellent = 'Excellent',
}

export interface AssessmentHintItem {
    label: string;
    hint: string;
}