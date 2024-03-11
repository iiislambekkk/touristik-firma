export interface PostRequest {
    title: string;
    description: string;
    price: number;
}

export const getAllBooks = async () => {
    const response = await fetch("https://turistikfirma.azurewebsites.net/posts");

    return response.json();
}

export const createBook = async (postRequest: PostRequest) => {
    await fetch("https://turistikfirma.azurewebsites.net/posts", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postRequest),
    });

}

export const updateBook = async (id: string, postRequest: PostRequest) => {
    await fetch(`https://turistikfirma.azurewebsites.net/posts/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postRequest),
    });
}

export const deleteBook = async (id: string) => {
    await fetch(`https://turistikfirma.azurewebsites.net/posts/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
    });
}

