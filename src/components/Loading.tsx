import { capitalizeFirstLetter } from "../utils/utils";

type LoadingProps = {
  text: string;
};

export const Loading = ({ text }: LoadingProps) => {
  const updatedText = capitalizeFirstLetter(text);
  return <div>{updatedText}...</div>;
};
