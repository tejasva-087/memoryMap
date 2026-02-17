import { Link } from "react-router-dom";
import logo from "../../assets/MemoryMapLogo.svg";

type LogoProp = { className: string };

function Logo({ className }: LogoProp) {
  return (
    <Link to="/">
      <img src={logo} alt="Memory map logo" className={`${className}`} />
    </Link>
  );
}

export default Logo;
