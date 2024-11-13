import {Assessments} from "@/src/types/assesments/assesments.types.ts";

export type ResponseStatus = "success" | "error";

export interface AverageItemDTO {
    average: number;
    change: number;
    is_exist: boolean;
}

export interface TotalMetricsDTO {
    "total_average": number;
    "total_change": number;
}

export interface GetAverageModulesDTO {
    "status": "success",
    "module_averages_and_changes": {
        "health": AverageItemDTO;
        "intelligence": AverageItemDTO;
        "productivity": AverageItemDTO;
        "emotions": AverageItemDTO;
        "relationships": AverageItemDTO;
        "freedom": AverageItemDTO;
        "love": AverageItemDTO;
        "occupation": AverageItemDTO;
        "wealth": AverageItemDTO;
    }
    "total_metrics": TotalMetricsDTO;
}

interface CommonRequestParams {
    accessToken: string;
}

export interface PostUploadParams extends CommonRequestParams {
    assessment: Assessments,
    params: Record<string, number>,
}

export interface GetImprovementPlanParams extends PostUploadParams {
    file?: File | null,
}

export interface GetLatestRequestParams extends CommonRequestParams {
    assessment: Assessments,
}

export interface GetLatestRequestResponse {
    status: ResponseStatus,
    params: Record<string, number> | null,
}