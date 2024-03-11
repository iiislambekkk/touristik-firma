import styles from "./CardTitle.module.css"

interface Props {
    title: string;
    price: number;
}

const CardTitle = ({title, price} : Props) => {
    return (
        <div className={styles.cardTitle}>
            <p className="card__title">{title}</p>
            <p className="card__price">{price}</p>
        </div>
    );
};

export default CardTitle;