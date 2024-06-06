import { useEffect, useState } from "react";
import "./navbar.css";
import { changeTheme } from "../redux/UserSlice";
import { Navbar, Container, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, logoutUser } from "../redux/UserSlice";

function Topbar() {
  const userData = useSelector((state) => state.info);
  const dispatch = useDispatch();
  const sendTheme = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/query=${search}`);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const toggleTheme = () => {
    sendTheme(changeTheme());
  };

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Navbar sticky="top" className="py-3 total_back" expand="lg">
      <Container>
        <Navbar.Brand>
          <i className="fa-brands fa-youtube nav_brandlogo"></i>
          <Link to="/">
            {" "}
            <span className="w_color">myTube</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <div className="border border-dark rounded-5 px-3 navbar_inputDiv faint_back">
              <form onSubmit={searchSubmit}>
                <input
                  className="faint_back w_color"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass w_color"></i>
                </button>
              </form>
            </div>
            <div className="navbar_loginDiv">
              {userData.theme === "themeDark" ? (
                <button className="mx-2 nav_lightMode" onClick={toggleTheme}>
                  <i className="fa-solid fa-sun fa-lg text-light"></i>
                </button>
              ) : (
                <button className="mx-2 nav_lightMode" onClick={toggleTheme}>
                  <i className="fa-solid fa-moon fa-lg text-dark"></i>
                </button>
              )}
              {userData.isLogin ? (
                <>
                  <Link className="mx-3" to="/videosec">
                    <i className="fa-solid fa-video fa-xl w_color"></i>
                  </Link>
                  <Dropdown className="mx-2">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="rounded-circle btn-danger"
                    >
                      <i className="fa-solid fa-user"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="pb-2">
                        <Link to="/account">Account</Link>
                      </div>
                      <div className="pb-2">
                        <Link to="channel">Channels</Link>
                      </div>
                      <div className="pb-2">
                        <Link to="subscription">Subscription</Link>
                      </div>
                      <div onClick={logout} style={{ cursor: "pointer" }}>
                        LogOut
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="border border-primary rounded-5 text-primary py-2 px-4 mx-2"
                >
                  <i className="fa-solid fa-user nav_userlogo"></i> login
                </Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
