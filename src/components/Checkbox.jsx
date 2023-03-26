import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./styles.css";

function CustomCheckbox({ name, isChecked, onChange }) {
  const displayCamelCase = (text) => {
    var newText = text;
    if (text.match("_")) {
      newText = text.replace(/_/g, " /");
    }
    const result = newText.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={onChange}
            name={name}
            value={name}
          />
        }
        label={displayCamelCase(name)}
        className="checkboxLabel"
      />
      <br />
    </div>
  );
}

export default CustomCheckbox;
