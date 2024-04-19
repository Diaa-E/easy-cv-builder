import styles from "../styles/ProgressBar.module.css";

export default function ProgressBar({level, disabled})
{
    return (
        <div
            role="progressbar"
            aria-label="proficiency level"
            aria-valuenow={`${level} percent`}
            className={[styles["progress-bar-outer"], disabled ? styles["disabled"] : ""].join(" ")}
        >
            <span aria-hidden className={styles["progress-bar-inner"]} style={{width: `${level}%`}}></span>
        </div>
    )
}