"use client";

import Button from "antd/es/button/button";
import {useEffect, useState} from "react";
import {PostRequest, createBook, deleteBook, getAllBooks, updateBook} from "@/src/services/posts";
import Posts from "@/src/components/Posts";
import Title from "antd/es/typography/Title";
import CreateUpdateBook, {Mode} from "@/src/components/CreateUpdateBook";
import Loader from "@/src/components/Loader/Loader";

const BooksPage = () => {
    const defaultValues = {
        title: "",
        description: "",
        price: 1,
    } as Post;

    const [values, setValues] = useState<Post>(defaultValues);

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [role, setRole] = useState('')

    const handleCreateBook = async (request: PostRequest) => {
        await createBook(request);
        closeModal();

        const posts = await getAllBooks();
        setPosts(posts);
    }

    const handleUpdateBook = async (id: string, request: PostRequest) => {
        await updateBook(id, request);
        closeModal();

        const posts = await getAllBooks();
        setPosts(posts);
    }

    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);

        const posts = await getAllBooks();
        setPosts(posts);
    }

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setValues(defaultValues);
    }

    const openEditModal = (post: Post) => {
        setMode(Mode.Edit);
        setValues(post);
        setIsModalOpen(true);
    }

    useEffect(() => {
        const getBooks = async () => {
            const posts = await getAllBooks();
            setPosts(posts);
            setLoading(false);
        }

        getBooks();

        let a = "";

        if (localStorage.getItem("role") == "Admin") {
            setRole("Admin")
        }


    }, [])

    return (
        <div>
            { role === "Admin" ? <Button
                    style={{marginTop: "20px"}}
                    onClick={openModal}
                >
                    Пост қосу
                </Button> : <></>}


            <CreateUpdateBook
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleUpdate={handleUpdateBook}
                handleCreate={handleCreateBook}
                handleCancel={closeModal}
            />

            {loading ?<Loader imgUrl={"https://i.postimg.cc/mrWt1Tvf/scale-1200-1-1.jpg"} message={"Don't сасқалақтау. Загружаю"}/> : <Posts posts={posts}
                                                          handleOpen={openEditModal} handleDelete={handleDeleteBook}

            />}
        </div>
    );
};

export default BooksPage;