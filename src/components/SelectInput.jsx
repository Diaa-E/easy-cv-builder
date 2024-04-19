import styles from "../styles/SelectInput.module.css";

export default function SelectInput({options, selected, labelText, id, onChange = () => {}})
{
    return (
        <div className={styles["select-input-container"]}>
            <label
                id={id + "-label"}
                className={styles["select-input-label"]}
                htmlFor={id}
            >{labelText}</label>
            <select
                aria-labelledby={id + "-label"}
                role="select"
                value={selected}
                onChange={onChange}
                className={styles["select-input"]}
                name={id}
                id={id}
            >
            {
                options.map(item => <option key={item["name"]} value={item["value"]}>{item["name"]}</option>)
            }
            </select>
        </div>   
    )
}