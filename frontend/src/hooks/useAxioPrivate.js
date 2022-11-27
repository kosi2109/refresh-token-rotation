import { useEffect } from "react";
import { apiPrivateInstance } from "../api/api";
import { UserState } from "../context/store";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { user } = UserState();

    useEffect(() => {

        const requestIntercept = apiPrivateInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = apiPrivateInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiPrivateInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiPrivateInstance.interceptors.request.eject(requestIntercept);
            apiPrivateInstance.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh])

    return apiPrivateInstance;
}

export default useAxiosPrivate;