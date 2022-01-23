import Input from "../../components/shared/FormElements/Input";
import classes from "./NewPlace.module.scss";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../components/shared/Util/validators";
import Button from "../../components/shared/FormElements/Button";
import useForm from "../../components/shared/hooks/form-hook";

const NewPlace: React.FC = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form className={classes.placeForm} onSubmit={placeSubmitHandler}>
      <Input
        id='title'
        label='Title'
        type='text'
        validators={[VALIDATOR_REQUIRE()]}
        element='input'
        errorText='Please enter a valid entry'
        onInput={inputHandler}
      />
      <Input
        id='address'
        label='Address'
        type='text'
        validators={[VALIDATOR_REQUIRE()]}
        element='input'
        errorText='Please enter a valid address'
        onInput={inputHandler}
      />
      <Input
        id='description'
        label='Description'
        type='textarea'
        validators={[VALIDATOR_MINLENGTH(5)]}
        element='textarea'
        errorText='Please enter a valid description (5 characters)'
        onInput={inputHandler}
      />
      <Button type='submit' disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
