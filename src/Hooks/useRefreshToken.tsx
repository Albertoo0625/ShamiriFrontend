import { axiosPrivate } from '../Api/axios';
import { useAuth } from './useAuth';


const useRefreshToken = () => {
    const { auth,setAuth } = useAuth();

    const refresh = async () => {
        console.log("loading")
        const response = await axiosPrivate.get('/refresh', {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth?.accessToken}`
              },
            withCredentials: true,
        });
        setAuth((prev:any)=> {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
