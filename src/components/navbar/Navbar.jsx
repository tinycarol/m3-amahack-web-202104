import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../logo/Logo";
import "./Navbar.scss";

// TODO: show link to user profile or login
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="Navbar">
      <div className="Navbar__content">
        <Logo />
        <ul>
          <li>
            <NavLink
              to="/"
              className="Navbar__content__link"
              activeClassName="Navbar__content__link--active"
              exact
            >
              🏠 <span className="Navbar__content__link__name">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="Navbar__content__link"
              activeClassName="Navbar__content__link--active"
            >
              ❔ <span className="Navbar__content__link__name">About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="Navbar__content__link"
              activeClassName="Navbar__content__link--active"
              exact
            >
              🛍️ <span className="Navbar__content__link__name">Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="Navbar__content__link"
              activeClassName="Navbar__content__link--active"
            >
              ✉️ <span className="Navbar__content__link__name">Contact</span>
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className="Navbar__content__link"
                  activeClassName="Navbar__content__link--active"
                  exact
                >
                  <img
                    src={user.image}
                    className="Navbar__content__link__avatar"
                    alt=""
                  />
                  <span className="Navbar__content__link__name">
                    {user.name}
                  </span>
                </NavLink>
              </li>
              <li>
                <button
                  className="Navbar__content__button"
                  onClick={logout}
                  title="Log out"
                >
                  ❌
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="Navbar__content__link"
                activeClassName="Navbar__content__link--active"
                exact
              >
                ➡️ <span className="Navbar__content__link__name">Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
