import { Environment } from "@/core/models/Environment";

export const env: Environment = {
  apiUrl: process.env.VUE_APP_API_URL
};

export default env;
