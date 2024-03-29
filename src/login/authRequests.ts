import { ApiResponse } from "./apiResponse";
import { apiUrl } from "../config.ts";

export async function authenticateLogin(
  username: string,
  password: string,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const responseData: ApiResponse = {
        success: false,
        message: null,
        data: await response.json(),
      };
      if (response.status === 401) {
        responseData.message = "Wrong username or password";
        return responseData;
      } else if (response.status === 400) {
        responseData.message = JSON.stringify(await response.json());
        return responseData;
      } else if (response.status === 500) {
        responseData.message = "Internal server error";
        return responseData;
      }
    }

    const data = await response.json();

    return {
      success: true,
      message: "Successfully logged in",
      data: data,
    };
  } catch (e) {
    return {
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
}

export async function registerRequest(
  username: string,
  password: string,
  email: string,
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();
  
    if (!response.ok) {
      const responseData: ApiResponse = {
        success: false,
        message: null,
        data: data,
      };
      if (response.status === 400) {
        responseData.message = JSON.stringify(data);
        return responseData;
      } else if (response.status === 500) {
        responseData.message = "Internal server error";
        return responseData;
      }
    }

    return {
      success: true,
      message: "Successfully created the account",
      data: data,
    };
  } catch (e) {
    return {
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
}
