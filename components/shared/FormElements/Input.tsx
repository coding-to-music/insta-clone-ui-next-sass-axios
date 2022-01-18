import classes from "./Input.module.scss";

const Input: React.FC<{
  id?: string;
  label?: string;
  element?: "input";
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  rows?: number;
}> = (props) => {
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div className={`${classes.formControl}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
