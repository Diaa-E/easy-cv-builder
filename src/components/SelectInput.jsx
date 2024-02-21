import "../styles/SelectInput.css";

export default function SelectInput({options, optionNameKey, optionValueKey, selected, labelText, id, onChange = () => {}})
{
    return (
        <div data-testid="select-input" className="select-input-container">
            <label className="select-input-label" htmlFor={id}>{labelText}</label>
            <select role="listbox" value={selected} onChange={onChange} className="select-input" name={id} id={id}>
            {
                options.map(item => <option key={item[optionNameKey]} value={item[optionValueKey]}>{item[optionNameKey]}</option>)
            }
            </select>
        </div>   
    )
}