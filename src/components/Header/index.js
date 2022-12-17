import { Link } from "react-router-dom";
import { Button, Spin } from "antd";
import { useState } from "react";
import { auth } from "../../config/localStorage";

function Navbar() {
  const [loader, setLoader] = useState(false);

  const logout = () => {
    setTimeout(() => {
      setLoader(true);
    }, 100);
    localStorage.clear();
  };
  return (
    <div>
      <img src="/assets/TT Logo.png" className="logo" alt="logo" />
      <ul className="navigation-links align-right">
        <li>
          {!!auth && (
            <Link to="/sign-in">
              {loader ? (
                <Spin tip="Loading" size="small"></Spin>
              ) : (
                <Button type="primary" onClick={logout}>
                  Log out
                </Button>
              )}
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
