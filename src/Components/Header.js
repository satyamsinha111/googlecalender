import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginUser } from "../ServerModules/Server";

export default function Header({ setCopyMsg }) {
  //   alert("Click on the login button to start");
  let loginUser = () => {
    console.log("hello");
    LoginUser()
      .then((response) => {
        console.log(response);
        window.open(response.authUrl, "_blank");
        setCopyMsg(true);
        setTimeout(() => {
          setCopyMsg(false);
        }, 600000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon icon={faCode} style={{ fontSize: "40px" }} />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="#"
              style={{ fontSize: "20px", letterSpacing: "2px" }}
              onClick={() => {
                loginUser();
              }}
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
