import CardTitle from "@/src/components/CardTitle";
import Card from "antd/es/card/Card";
import Button from "antd/es/button/button";
import { Typography } from 'antd';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Config} from "@/config";

const { Text, Paragraph } = Typography;

interface Props {
    tours: Tour[],
    handleDelete: (id: string) => void;
    handleOpen: (book: Tour) => void;
    lang: string;
}

const Tours = ({tours, handleDelete, handleOpen, lang}: Props) => {

    const router = useRouter()
    let [role, setRole] = useState("");

    useEffect(() => {
        if (localStorage.getItem("role") == "Admin") {
            setRole("Admin")
        }
    })

    if (lang === "en") return (
        <div className={"cards"}>
            {tours.map((tour : Tour) => (
                <Card
                    key={tour.id}
                    title={<CardTitle title={tour.titleEn} price={tour.price}/>}
                    bordered={true}
                    hoverable={true}
                    className={"card"}
                >
                    <img src={`${Config.serverAdress}${tour.previewPhotoPath}`}alt="" className="card__image"/>
                    <Paragraph  style={{zIndex:1}}>{tour.descriptionEn.slice(0, 80)}</Paragraph >
                    <Paragraph >Country: {tour.country}</Paragraph >
                    {role === "Admin" ? <div className={"card__buttons"}>

                        <Button onClick={() => handleOpen(tour)} style={{flex: 1}}>
                            Change
                        </Button>
                        <Button onClick={() => handleDelete(tour.id)}
                                danger
                                style={{flex: 1}}>
                            Delete
                        </Button>
                        <Button style={{flex: 1}} onClick={() => router.push("/en/tour?id=" + tour.id)}>More</Button>
                    </div> : <div className={"card__buttons"}>
                        <Button style={{flex: 1}} onClick={() => router.push("/en/tour?id=" + tour.id)}>More</Button>
                    </div>}


                </Card>
                ))}
        </div>
    );

    else if (lang === "kz") return (
        <div className={"cards"}>
            {tours.map((tour : Tour) => (
                <Card
                    key={tour.id}
                    title={<CardTitle title={tour.titleKz} price={tour.price}/>}
                    bordered={true}
                    hoverable={true}
                    className={"card"}
                >
                    <img src={`${Config.serverAdress}${tour.previewPhotoPath}`} alt="" className="card__image"/>
                    <Paragraph >{tour.descriptionKz.slice(0, 80)}</Paragraph >
                    <Paragraph >Country: {tour.country}</Paragraph >
                    {role === "Admin" ? <div className={"card__buttons"}>

                        <Button onClick={() => handleOpen(tour)} style={{flex: 1}}>
                            Өзгерту
                        </Button>
                        <Button onClick={() => handleDelete(tour.id)}
                                danger
                                style={{flex: 1}}>
                            Өшіру
                        </Button>
                        <Button onClick={() => router.push("/kz/tour?id=" + tour.id)}>Толығырақ</Button>
                    </div> : <div className={"card__buttons"}>
                        <Button onClick={() => router.push("/kz/tour?id=" + tour.id)}>Толығырақ</Button>
                    </div>}

                </Card>
            ))}
        </div>
    );

    else if (lang === "ru") return (
        <div className={"cards"}>
            {tours.map((tour : Tour) => (
                <Card
                    key={tour.id}
                    title={<CardTitle title={tour.titleRu} price={tour.price}/>}
                    bordered={true}
                    hoverable={true}
                    className={"card"}
                >
                    <img src={`${Config.serverAdress}${tour.previewPhotoPath}`} alt="" className="card__image"/>
                    <Paragraph >{tour.descriptionRu.slice(0, 80)}</Paragraph >
                    <Paragraph >Country: {tour.country}</Paragraph >
                    {role === "Admin" ? <div className={"card__buttons"}>

                        <Button onClick={() => handleOpen(tour)} style={{flex: 1}}>
                            Изменить
                        </Button>
                        <Button onClick={() => handleDelete(tour.id)}
                                danger
                                style={{flex: 1}}>
                            Удалить
                        </Button>

                        <Button onClick={() => router.push("/ru/tour?id=" + tour.id)}>Подробнее</Button>
                    </div> : <div className={"card__buttons"}>
                        <Button onClick={() => router.push("/ru/tour?id=" + tour.id)}>Подробнее</Button>
                    </div> }




                </Card>
            ))}
        </div>
    );
    else return <></>
};

export default Tours;