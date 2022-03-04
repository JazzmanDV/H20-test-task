import styles from "./CircleHint.module.css";

const CircleHint = (props) => {
    return (
        <div className={styles.circleHint}>
            <div className={styles.circleHintNumber}>{props.children}</div>
        </div>
    );
};

export default CircleHint;
