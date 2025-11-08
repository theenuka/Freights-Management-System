import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

// Returns { ok: boolean, data?: any, status?: number, message?: string }
export const login = async (dispatch, credentials) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", credentials);
    dispatch(loginSuccess(res.data));
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Login failed";
    dispatch(loginFailure());
    return { ok: false, status, message };
  }
};