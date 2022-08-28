import axios from "axios";
import { base_api_url } from "../config/config";

export default axios.create({ baseURL: base_api_url });
