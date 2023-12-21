import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const request = async (route, method = "GET", data ) => {
  console.log(route,method,data)
    try{
      const response = await axios.request({
          url: route,
          method: method,
          data: data,
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response;  
    } catch(e){
      if(e.response){
        console.log("Error in API Request", e.response.data);
      }
    }
};

export {request}