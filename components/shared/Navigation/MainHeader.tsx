import classes from "./MainHeader.module.scss";

const MainHeader: React.FC = (props) => {
  return (
    <header className={classes.mainheader}>
      <div className={classes.wrapper}>{props.children}</div>
    </header>
  );
};

export default MainHeader;
