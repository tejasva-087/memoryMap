import logo from "../../assets/MemoryMapLogo.svg";

function Logo({ className }) {
  return <img src={logo} className={`w-36 ${className}`}></img>;
}

export default Logo;
