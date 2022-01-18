import Input from "../../components/shared/FormElements/Input";
import classes from "./NewPlace.module.scss";

const NewPlace: React.FC = () => {
  return (
    <form className={classes.placeForm}>
      <Input label='Input Form' element='input' />
    </form>
  );
};

export default NewPlace;
