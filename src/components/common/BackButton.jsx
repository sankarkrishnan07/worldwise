import { useNavigate } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";

export default function BackButton({ children }) {
  const navigate = useNavigate();

  return (
    <Button
      type={"secondary"}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; {children}
    </Button>
  );
}

BackButton.propTypes = {
  children: PropTypes.any,
};
