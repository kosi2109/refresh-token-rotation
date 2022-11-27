import { apiPrivateInstance } from "../api/api";
import { UserState } from "../context/store"

function useRefreshToken() {
    const {setUser} = UserState();

    const refresh = async ()=> {
        const response = await apiPrivateInstance.get('/refresh', {
            withCredentials : true
        });

        setUser((pre) => {
            return {...pre,accessToken :response.data.accessToken}
        });

        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken