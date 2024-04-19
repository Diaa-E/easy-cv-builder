import { meta } from "../data/meta";
import styles from "../styles/App.module.css";

export default function About({})
{
    return (
        <div role="region" className={styles["items-container"]}>
            <h2 className={styles["app-title"]}>{meta.title} v{meta.version}</h2>
            <p>©️ {(new Date).getFullYear()} {meta.author}</p>
            <a target="_blank" href={meta.changeLogUrl}>Change log</a>
            <a target="_blank" href={meta.sourceUrl}>Easy CV Builder source code</a>
            <a target="_blank" href={meta.authorGithubUrl}>Diaa E. on github</a>
        </div>
    )
}