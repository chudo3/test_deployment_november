import {createContext, ReactNode, useEffect, useState} from "react";
import {auth} from "@/src/firebase/firebase.ts";
import {GoogleAuthProvider, signInWithPopup, signOut,} from "firebase/auth";
import {User} from "@/src/types/user/user.types.ts";
import toast from "react-hot-toast";
import {APIRegister} from "@/src/api";

const provider = new GoogleAuthProvider();


export const AuthContext = createContext<{
    user: User | null,
    loading: boolean,
    signInWithGoogle: () => Promise<void>,
    signOutWithGoogle: () => Promise<void>,
}>({
    user: null,
    loading: false,
    signInWithGoogle: async () => {
    }, signOutWithGoogle: async () => {
    },
});

interface Props {
    children?: ReactNode;
}

const AuthProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const checkAuth = async () => {
        setLoading(true);
        try {
            await auth.authStateReady();
            if (auth.currentUser) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUser(auth.currentUser as User);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false)
        }
    }


    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            // Вход или регистрация через Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Проверяем, является ли пользователь новым
            // eslint-disable-next-line
            const isNewUser = (result as any)._tokenResponse.isNewUser;
            if (isNewUser) {
                // Получаем ID-токен пользователя
                const idToken = await user.getIdToken();
                // Отправляем запрос на бекэнд для регистрации нового пользователя
                const response = await APIRegister(idToken);
                if (response.statusText !== "OK") {
                    throw new Error("Failed to register user on backend");
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUser(user);

            } else {
                // Логика для существующего пользователя
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUser(user);
            }
            toast.success('You successfully logged in!');
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.error("Google Sign-In Error:", error.message);
            toast.error((error as Error).message as string);
            // Обработка ошибок
        } finally {
            setLoading(false);
        }
    };

    const signOutWithGoogle = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('You successfully logged out!');
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.error("Google Sign-Out Error:", error.message);
            // Обработка ошибок
        }
    }

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOutWithGoogle,
    }

    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;