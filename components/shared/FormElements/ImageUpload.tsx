/* eslint-disable @next/next/no-img-element */
import classes from "./ImageUpload.module.scss";
import Button from "./Button";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const ImageUpload: React.FC<{
  id: any;
  errorText: string;
  center?: boolean | undefined;
  onInput: (id: string, file: File, isValid: boolean) => {};
}> = (props) => {
  const [file, setFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer>(
    "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
  );
  const [isValid, setIsValid] = useState(true);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const centerClass = props.center ? classes.center : "";

  const imageHandler = () => {
    //simulates mouseclick on invisible input
    filePickerRef.current!.click();
  };

  const pickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File;
    //protection against validity being out of date due to react slow to update
    let fileIsValid = isValid;
    console.log(e.target);
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      props.onInput(props.id, pickedFile, fileIsValid);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    //let API know what to do once file has been read
    fileReader.onload = () => {
      setPreviewURL(fileReader.result!);
    };
    //fire off reading of file
    fileReader.readAsDataURL(file);
  }, [file]);

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
          {previewURL && (
            <Image
              onClick={imageHandler}
              layout='fill'
              src={previewURL as string}
              alt='Preview'
              objectFit='cover'
            />
          )}
          {!previewURL && <p>Choose a profile pic!</p>}
        </div>
        {/* <Button type='button' onClick={imageHandler}>
          Set Profile Pic
        </Button> */}
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
