/*
import {Config} from "@/config";

export const getAvatar = async ({Formdata}: {Formdata: FormData}) => {

    const rez = await fetch(`${Config.serverAdress}Authorize/SignIn`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: Formdata,
    });

    var data = new FormData()
    data.append('file', input.files[0])
    return rez;
}*/
