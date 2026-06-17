import axios from "axios";
import { servicePath2 } from 'constants/defaultValues';
 
export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || servicePath2,
  headers: {
    "Content-type": "application/json"
  }
});
