import CardTitle from "@/src/components/CardTitle";
import Card from "antd/es/card/Card";
import Button from "antd/es/button/button";

interface Props {
    posts: Post[],
    handleDelete: (id: string) => void;
    handleOpen: (book: Post) => void;
}

const Posts = ({posts, handleDelete, handleOpen}: Props) => {
    return (
        <div className={"cards"}>
            {posts.map((post : Post) => (
                <Card
                    key={post.id}
                    title={<CardTitle title={post.title} price={post.price}/>}
                    bordered={true}
                    hoverable={true}
                >
                    <p>{post.description}</p>
                    <div className={"card__buttons"}>
                        <Button onClick={() => handleOpen(post)} style={{flex: 1}}>
                            Өзгерту
                        </Button>
                        <Button onClick={() => handleDelete(post.id)}
                                danger
                                style={{flex: 1}}>
                            Жою
                        </Button>
                    </div>
                </Card>
                ))}
        </div>
    );
};

export default Posts;