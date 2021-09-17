import { useHistory } from "react-router-dom";
import "./GoBack.css";

export default function GoBack() {
  const { goBack } = useHistory();
  return (
    <button className="GoBack" onClick={goBack}>
      🔙
    </button>
  );
}
