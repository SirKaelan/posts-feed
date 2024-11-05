import { useState } from "react";

type NewPostFormProps = {
  handleCloseClick: () => void;
};

type FormValues = {
  title: string;
  body: string;
};

export const NewPostForm = ({ handleCloseClick }: NewPostFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    body: "",
  });

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted!", formValues);
  };

  return (
    <div
      onClick={handleCloseClick}
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div
        onClick={handleFormClick}
        className="bg-white p-6 rounded flex flex-col gap-4 items-center"
      >
        <h1 className="font-bold">Add New Post</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <label htmlFor="title-input">Title:</label>
          <input
            id="title-input"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleInputChange}
            className="border border-black rounded"
          />
          <label htmlFor="body-input">Body:</label>
          <input
            id="body-input"
            name="body"
            type="text"
            value={formValues.body}
            onChange={handleInputChange}
            className="border border-black rounded"
          />
          <button type="submit" className="border border-black rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
