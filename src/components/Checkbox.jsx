import { FormControlLabel, Checkbox } from "@mui/material";
import "./styles.css";

function CustomCheckbox({ name, isChecked, onChange }) {
  const displayCamelCase = (text) => {
    var newText = text;
    if (text.match("_")) {
      newText = text.replace(/_/g, " /");
    }
    if (text.match("openWithDialogue")) {
      return "'Open With' Dialogue";
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
