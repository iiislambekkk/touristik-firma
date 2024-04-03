import styles from "./CardTitle.module.css"
import { Typography } from 'antd';

const { Text} = Typography;

interface Props {
    title: string;
    price: number;
}

const CardTitle = ({title, price} : Props) => {
    return (
        <div className={styles.cardTitle}>
            <Text className="card__title">{title}</Text>
            <Text className="card__price">{price} ₸</Text>
        </div>
    );
};

export default CardTitle;