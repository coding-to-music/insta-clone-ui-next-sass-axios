import classes from "./Avatar.module.scss";
import Image from "next/image";

const Avatar: React.FC<{
  className?: string;
  style?: any;
  width?: number;
  height?: number;
  alt: string;
  image: string;
}> = (props) => {
  return (
    <div className={`${classes.avatar} ${props.className}`} style={props.style}>
      <Image
        alt={props.alt}
        src={props.image}
        width={props.width || "100"}
        height={props.height || "100"}
      />
    </div>
  );
};

export default Avatar;
