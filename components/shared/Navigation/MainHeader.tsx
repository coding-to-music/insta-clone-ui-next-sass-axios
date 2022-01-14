import classes from "./MainHeader.module.scss";

const MainHeader: React.FC = (props) => {
  return <header className={classes.mainheader}>{props.children}</header>;
};

export default MainHeader;
