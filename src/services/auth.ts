import {Config} from '../../config';

export interface RegisterRequest {
    email: string;
    password: string;
    userName: string;
    role: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}


export const registerUser = async (registerRequest: RegisterRequest) => {
    const rez = await fetch(`${Config.serverAdress}api/Authorize/Register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(registerRequest),
    });


    return rez;
}

export const loginUser = async (loginRequest: LoginRequest) => {
    const rez = await fetch(`${Config.serverAdress}api/Authorize/SignIn`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(loginRequest),
    });


    return rez;
}