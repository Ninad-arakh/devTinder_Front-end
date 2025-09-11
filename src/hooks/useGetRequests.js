
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addToRequests } from "../utils/requestsSlice";
import axios from "axios";

const useGetRequests = async () =>{
    const dispatch = useDispatch()
    try {
      const res = await axios.get(BASE_URL + "user/requests/reviewed/", {
        withCredentials: true,
      });
      if (res.status === 200) dispatch(addToRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
}

export default useGetRequests;