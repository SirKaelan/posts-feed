import { useState } from "react";

type NewPostFormProps = {
  handleCloseClick: () => void;
};

export const NewPostForm = ({ handleCloseClick }: NewPostFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    body: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    body: "",
  });

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: validators[name](e.target.value),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: FormErrors = {
      title: validators["title"](formValues.title),
      body: validators["body"](formValues.body),
    };

    setFormErrors(errors);

    if (Object.values(errors).every((value) => value.length === 0)) {
      console.log("Form submitted!", formValues);
    }
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
          <div className="flex flex-col">
            {formErrors.title && (
              <p className="text-red-600 mb-2">{formErrors.title}</p>
            )}
            <label htmlFor="title-input">Title:</label>
            <input
              id="title-input"
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleInputChange}
              className="border border-black rounded"
            />
          </div>

          <div className="flex flex-col">
            {formErrors.body && (
              <p className="text-red-600 mb-2">{formErrors.body}</p>
            )}
            <label htmlFor="body-input">Body:</label>
            <input
              id="body-input"
              name="body"
              type="text"
              value={formValues.body}
              onChange={handleInputChange}
              className="border border-black rounded"
            />
          </div>

          <button type="submit" className="border border-black rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

type FormValues = {
  title: string;
  body: string;
};

type FormErrors = {
  title: string;
  body: string;
};

// Form field value validators
type Validator = (value: string) => string;

const validateTitle: Validator = (title) => {
  if (title.length === 0) return "Field cannot be empty";
  return "";
};

const validateBody: Validator = (body) => {
  if (body.length === 0) return "Field cannot be empty";
  return "";
};

type ValidatorsList = {
  [key: string]: Validator;
};

const validators: ValidatorsList = {
  title: validateTitle,
  body: validateBody,
};
