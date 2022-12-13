import { ChangeEventHandler } from "react";

interface SwitchProps {
    id: string, 
    onChange: ChangeEventHandler<HTMLInputElement>,
    label: string,
    checked: boolean
}

const Switch = ({id, label, checked, onChange}:SwitchProps) => {
    return ( 
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" onChange={onChange} checked={checked} id={id}></input>
            <label className="form-check-label" htmlFor={id}>{label}</label>
        </div>
     );
}
 
export default Switch;