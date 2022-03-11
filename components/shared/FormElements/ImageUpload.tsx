/* eslint-disable @next/next/no-img-element */
import classes from "./ImageUpload.module.scss";
import Button from "./Button";
import Image from "next/image";
import { useRef } from "react";

const ImageUpload: React.FC<{ id: any; center?: boolean | undefined }> = (
  props
) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const centerClass = props.center ? classes.center : "";

  const imageHandler = () => {
    filePickerRef.current!.click();
  };

  const pickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div className={classes.formControl}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickHandler}
      ></input>
      <div className={`${classes.imageUpload} ${centerClass}`}>
        <div className={classes.imageUploadPreview}>
          <img src='nan.png' alt='Preview' />
        </div>

        <Button type='button' onClick={imageHandler}>
          Set Profile Pic
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
