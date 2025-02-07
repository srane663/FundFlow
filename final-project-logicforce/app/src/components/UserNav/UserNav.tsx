import Link from "next/link";
import { useRouter } from "next/router";
import style from "../../styles/allStyles.module.scss";

// Exporting default UserNav component
const Nav: React.FC = () => {
  const router = useRouter();

  // Handles user logout
  const handleUserLogout = () => {
    let authCookie = document.cookie;
    authCookie += ";max-age=0";
    document.cookie = authCookie;
    localStorage.removeItem("loggedInUserId");
    router.push("/");
  };

  // All the links to pages and user logout are given
  return (
    <nav className={style.navCover}>
      <div className={style.navContainer}>
        <ul className={style.navItems}>

          <li className={style.eachNav}>
            <a href="/home">Expense Manager</a>
          </li>
          <li className={style.eachNav}>
            <Link className="nav-link" href="/budget">
              Budget
            </Link>
          </li>
          <li className={style.eachNav}>
            <Link className="nav-link" href="/charts">
              Track Expenses
            </Link>
          </li>
          <li className={style.eachNav}>
            <Link className="nav-link" href="/shoppinglist">
              Shopping List
            </Link>
          </li>
          <li className={style.eachNav}>
            <Link className="nav-link" href="/bot">
              AI Assistant
            </Link>
          </li>
        </ul>
        <button className={style.logout} onClick={handleUserLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;