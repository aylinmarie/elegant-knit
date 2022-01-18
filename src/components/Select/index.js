import stylesheet from './Select.module.css';

// Setup for custom style select
const Select = ({children, ...rest}) => {
  return (
    <div className={stylesheet.root}>
        <select {...rest}>
            {children}
        </select>
    </div>
  );
}

export default Select;
