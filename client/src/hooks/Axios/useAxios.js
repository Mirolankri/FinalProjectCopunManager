import axios from "axios";
import { useEffect } from "react";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import { useUser } from "@/app/components/providers/UserProvider";

const useAxios = () => {
  const AlertInstance = useAlert();
  const { token } = useUser();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
    if (AlertInstance) {
      axios.interceptors.request.use((data) => {
        return Promise.resolve(data);
      }, null);

      axios.interceptors.response.use(null, (error) => {
        const expectedError = error.response && error.response.status >= 400;
        if (expectedError) AlertInstance("ERROR", error.response.data);
        return Promise.reject(error);
      });
    }
  }, [AlertInstance, token]);
};

export default useAxios;
