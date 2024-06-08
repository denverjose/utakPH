import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import DarkMode from "../DarkMode/DarkMode";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logoLink}>
        <div className={classes.logo}>utakPH</div>
      </Link>
      <nav>
        <DarkMode />
      </nav>
    </header>
  );
};

export default MainNavigation;
