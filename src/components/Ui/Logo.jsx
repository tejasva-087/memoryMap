import { Link } from "react-router-dom";

import logo from "../../assets/MemoryMapLogo.svg";

function Logo({ className }) {
  return (
    <Link to="/">
      <img src={logo} className={`w-36 ${className}`}></img>
    </Link>
  );
}

export default Logo;
