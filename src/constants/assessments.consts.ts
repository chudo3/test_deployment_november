import {Assessments} from "@/src/types/assesments/assesments.types.ts";

export const assessments = Object.values(Assessments);

export const assessmentPathsOrdered = [
    '/assessment/health',
    '/assessment/intelligence',
    '/assessment/productivity',
    '/assessment/emotions',
    '/assessment/relationships',
    '/assessment/freedom',
    '/assessment/love',
    '/assessment/occupation',
    '/assessment/wealth',
]

export const getAssessmentPathSiblings = (path: string) => {
    const index = assessmentPathsOrdered.indexOf(path);

    if (index > 0) return {
        prev: assessmentPathsOrdered[index - 1],
        next: assessmentPathsOrdered[index + 1],
        prevLabel: assessmentPathsOrdered[index - 1]?.split('/')?.[2] ?? null,
        nextLabel: assessmentPathsOrdered[index + 1]?.split('/')?.[2] ?? null,
    }

    if (index === 0) return {
        prev: null,
        next: assessmentPathsOrdered[index + 1],
        prevLabel: null,
        nextLabel: assessmentPathsOrdered[index + 1]?.split('/')?.[2] ?? null,
    }

    if (index === assessmentPathsOrdered.length - 1) {
        return {
            prev: assessmentPathsOrdered[index - 1],
            next: null,
            prevLabel: assessmentPathsOrdered[index - 1]?.split('/')?.[2] ?? null,
            nextLabel: null,
        };
    }

    return {prev: null, next: null, prevLabel: null, nextLabel: null};
}