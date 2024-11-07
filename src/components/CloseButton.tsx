type CloseButtonProps = {
  handleClick: () => void;
};

export const CloseButton = ({ handleClick }: CloseButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 py-2 px-3 leading-none rounded-md text-gray-400 transition hover:text-white hover:bg-red-500"
    >
      &#10005;
    </button>
  );
};
