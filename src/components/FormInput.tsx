import { InputChangeEvent } from "../types";
import { capitalizeFirstLetter } from "../utils/utils";

type FormInputProps = {
  errMsg: string;
  labelContent: string;
  name: string;
  handleChange: (e: InputChangeEvent) => void;
  value: string;
  autoFocus?: boolean;
};

export const FormInput = ({
  errMsg,
  labelContent,
  name,
  value,
  autoFocus = false,
  handleChange,
}: FormInputProps) => {
  const labelText = capitalizeFirstLetter(labelContent);

  return (
    <div className="flex flex-col">
      {errMsg && <span className="text-red-600 mb-2 text-sm">{errMsg}</span>}
      <label htmlFor={`${name}-input`} className="text-sm text-gray-800">
        {labelText}
      </label>
      <input
        id={`${name}-input`}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
        className="border border-gray-500 rounded px-4 py-2"
      />
    </div>
  );
};
