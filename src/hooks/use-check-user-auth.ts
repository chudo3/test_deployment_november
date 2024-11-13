import {useContext, useEffect} from "react";
import {AuthContext} from "@/src/context/auth.context.tsx";
import {useNavigate} from "react-router-dom";

export const useCheckUserAuth = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
}