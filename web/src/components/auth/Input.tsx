import { Dispatch, SetStateAction } from "react";
import { IValidationError } from "../../interfaces";

interface IInputProps {
  element: string;
  password: boolean;
  update: Dispatch<SetStateAction<string>>;
  errors: IValidationError | undefined;
}

export default function Input({
  element,
  password,
  update,
  errors,
}: IInputProps) {
  let el_caps = element.charAt(0).toUpperCase() + element.slice(1);

  let activateInput = () => {
    let label = document.getElementById(`${element}-label`);

    if (label) {
      let displayProp = label.style.display;
      label.style.display = displayProp == "block" ? "none" : "block";
    }
  };

  let errorMap = () => {
    if (errors) {
      return Object.values(errors.constraints).map((a, aIdx) => (
        <p className="error-text" key={aIdx}>
          {a.charAt(0).toUpperCase() + a.slice(1) + "."}
        </p>
      ));
    } else {
      return null;
    }
  };

  return (
    <div id={`${element}-group`} className="input-group">
      <label id={`${element}-label`} style={{ display: "none" }}>
        {el_caps}
      </label>
      {errorMap()}
      <input
        id={`${element}-input`}
        placeholder={el_caps}
        type={password ? "password" : ""}
        onChange={(e) => update(e.target.value)}
        onFocus={() => activateInput()}
        onBlur={() => activateInput()}
      />
    </div>
  );
}
