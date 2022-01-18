import stylesheet from './Checkbox.module.css';

const Checkbox = ({label, value, onChange, ...rest}) => {
  return (
    <label className={stylesheet.root} {...rest}>
        <input type="checkbox" value={value} onChange={onChange}/> 
        {label}
    </label>
  );
}

export default Checkbox;
