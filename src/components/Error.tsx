import { capitalizeFirstLetter } from "../utils/utils";

type ErrorProps = {
  text: string;
};

export const Error = ({ text }: ErrorProps) => {
  const updatedText = capitalizeFirstLetter(text);
  return <div>{updatedText}</div>;
};
