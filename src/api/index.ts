import {API_URL} from "@/src/constants/api.const.ts";
import axios from "axios";
import {
    GetAverageModulesDTO,
    GetImprovementPlanParams,
    GetLatestRequestParams,
    PostUploadParams
} from "@/src/types/api/api.types.ts";

export const APIRegister = (idToken: string) => axios.post<void>(API_URL + "/register", {}, {headers: {'Authorization': `Bearer ${idToken}`}});

export const APIGetAverageModules = async ({accessToken}: {
    accessToken: string
}) => {
    const res = await axios.get<GetAverageModulesDTO>(API_URL + '/average_modules/', {headers: {'Authorization': `Bearer ${accessToken}`,}});

    if (res.statusText !== "OK") {
        throw new Error(res.statusText);
    }

    return res.data;
}

export const APIGetPlan = async ({
                                     assessment,
                                     params,
                                     accessToken,
                                     file
                                 }: GetImprovementPlanParams) => {

    const formData = new FormData();

    const json_data = JSON.stringify({
        [assessment]: {
            params,
        }
    })

    formData.append('json_data', json_data);
    if (file) formData.append('files', file)

    const res = await axios.postForm(API_URL + '/upload_data/', formData, {headers: {'Authorization': `Bearer ${accessToken}`,}})

    if (res.statusText !== "OK") {
        throw new Error(res.statusText);
    }

    return res.data;
}

export const APIUploadParams = async ({
                                          accessToken,
                                          assessment,
                                          params
                                      }: PostUploadParams) => {

    const formData = new FormData();

    const json_data = JSON.stringify({
        [assessment]: {
            params,
        }
    })
    formData.append('json_data', json_data);

    const res = await axios.postForm(API_URL + '/upload_params/', formData, {headers: {'Authorization': `Bearer ${accessToken}`,}})

    if (res.statusText !== "OK") {
        throw new Error(res.statusText);
    }

    return res.data;
}

export const APIGetLatestRequest = async ({
                                              accessToken,
                                              assessment,
                                          }: GetLatestRequestParams) => {
    const res = await axios.get(API_URL + '/latest/request?assessment=' + assessment, {headers: {'Authorization': `Bearer ${accessToken}`,}})

    if (res.statusText !== "OK") {
        throw new Error(res.statusText);
    }

    return res.data;
}


export const APISubscribe = async (email: string) => {
    const res = await axios.post(API_URL + '/email', {email})

    if (res.statusText !== "OK") {
        throw new Error(res.statusText);
    }

    return res.data;
}

