import { useState } from "react";

import { FormInput } from "./FormInput";

import { useCreatePost } from "./hooks/useCreatePost";
import { useLoggedInUser } from "./hooks/useLoggedInUser";
import { InputChangeEvent, NewPost } from "../types";

type PostFormProps = {
  closeForm: () => void;
};

export const PostForm = ({ closeForm }: PostFormProps) => {
  const { createPost } = useCreatePost();
  const { loggedInUser } = useLoggedInUser();

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

  const handleInputChange = (e: InputChangeEvent) => {
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

    // Check for errors
    const errors: FormErrors = {
      title: validators["title"](formValues.title),
      body: validators["body"](formValues.body),
    };
    setFormErrors(errors);

    // Send post request only if there are not errors
    if (Object.values(errors).every((value) => value.length === 0)) {
      const newPost: NewPost = {
        userId: loggedInUser.id,
        title: formValues.title,
        body: formValues.body,
      };

      createPost(newPost);
      closeForm();
    }
  };

  return (
    // Form background
    <div
      onClick={closeForm}
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center z-10"
    >
      {/* Form container */}
      <div
        onClick={handleFormClick}
        className="bg-white py-16 px-20 rounded-lg flex flex-col gap-14 items-center relative"
      >
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 py-2 px-3 leading-none rounded-md text-gray-400 transition hover:text-white hover:bg-red-500"
        >
          &#10005;
        </button>
        <h1 className="font-bold text-xl text-gray-800 uppercase">
          Add New Post
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <FormInput
            name="title"
            labelContent="title"
            value={formValues.title}
            handleChange={handleInputChange}
            errMsg={formErrors.title}
            autoFocus
          />

          <FormInput
            name="body"
            labelContent="text"
            value={formValues.body}
            handleChange={handleInputChange}
            errMsg={formErrors.body}
          />

          <button
            type="submit"
            className="mt-4 py-1 px-2 text-gray-800 border border-gray-500 rounded transition hover:bg-blue-500 hover:text-white"
          >
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

type ValidatorsList = {
  [key: string]: Validator;
};

const validateTitle: Validator = (title) => {
  if (title.length === 0) return "Field cannot be empty";
  return "";
};

const validateBody: Validator = (body) => {
  if (body.length === 0) return "Field cannot be empty";
  return "";
};

const validators: ValidatorsList = {
  title: validateTitle,
  body: validateBody,
};
