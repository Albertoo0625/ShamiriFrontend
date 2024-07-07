import { useContext } from "react"
import { AppContext } from "../Context/context"

export const useAppContext=()=>{
return useContext(AppContext);
}