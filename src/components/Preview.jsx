import Layout_01 from "../layouts/Layout_01";
import Layout_02 from "../layouts/Layout_02";
import styles from "../styles/App.module.css";

export default function Preview({ layout, data }) {
    return (
        <div className={styles["preview"]}>
        {
            layout === "layout-01" &&
            <Layout_01
                data={data}
            />
        }
        {
            layout === "layout-02" &&
            <Layout_02
                data={data}
            />
        }
        </div>
    )
}