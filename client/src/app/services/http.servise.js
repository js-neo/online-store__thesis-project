import axios from "axios";
import configFile from "../config.json";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjFkNTdmNmY4OGY4ZjcwNmI1ZmQ5ZTMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDY1MjQ1ODAsImV4cCI6MTY0NjUyODE4MH0.AVC_G6lyAVko6xFC8lLniEDGYkMIhe92Wrr2xmQwZ8c";

export const publicRequest = axios.create({
  baseURL: configFile.apiEndpoint,
});

export const userRequest = axios.create({
  baseURL: configFile.apiEndpoint,
  header: { token: `Bearer ${TOKEN}` },
});
