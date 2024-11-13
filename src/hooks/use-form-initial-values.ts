import {useContext, useEffect} from "react";
import {APIGetLatestRequest} from "@/src/api";
import {Assessments} from "@/src/types/assesments/assesments.types.ts";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {AuthContext} from "@/src/context/auth.context.tsx";
import {useBackdrop} from "@/src/hooks/use-backdrop.ts";

export const useFormInitialValues = (assessment: Assessments, cb: (params: Record<string, number> | null,) => void) => {
    const {showBackdrop, hideBackdrop} = useBackdrop();
    const {signOutWithGoogle, user} = useContext(AuthContext);

    useEffect(() => {
        const handleFetchItems = async () => {
            if (!user) throw new Error('User must be logged in!');

            showBackdrop();
            try {
                const res = await APIGetLatestRequest({
                    accessToken: user.stsTokenManager.accessToken,
                    assessment
                });
                cb(res.params);
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
        handleFetchItems();
    }, []);
}