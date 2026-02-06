import { CaretLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function FormHeader() {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center
           justify-between"
    >
      <button
        className="text-3xl cursor-pointer focus:outline-0 focus:ring focus:ring-primary transition-all duration-300 rounded-sm"
        onClick={() => {
          navigate("/");
        }}
      >
        <CaretLeftIcon className="text-3xl" />
      </button>
      <h3 className="text-xl text-center basis-full">Add new memory</h3>
    </header>
  );
}

export default FormHeader;
