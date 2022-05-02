import React, { useState } from "react";

import Card from "../Components/UiElements/Card";
import Input from "../Components/FormElements/Input";
import Button from "@mui/material/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_URL,
  VALIDATOR_REQUIRE,
} from "../Utils/validators";
import { useForm } from "../Hooks/form-hook";
import "./Form.css";
import { apiCall } from "../Apis/ApiCall";
import { baseUrl } from "./../Apis/BaseUrl";
import { Spinner } from "./../Components/Spinner/Spinner";
const Form = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      resumeUrl: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      id: Math.random().toString(36).substr(2, 2),
      createdAt: new Date(),
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      resumeUrl: formState.inputs.resumeUrl.value,
    };

    apiCall("post", "", data, baseUrl)
      .then((res) => {
        setLoading(false);
        setMessage("Details Sent Successfully");
      })
      .catch((err) => {
        setLoading(false);

        setMessage(err.message || "something went wrong, please try again");
      });
  };

  return (
    <>
      {loading && <Spinner />}

      <Card className="authentication">
        <h2>{"Application Form"}</h2>
        <hr />
        <form onSubmit={submitHandler}>
          <Input
            element="input"
            id="name"
            type="name"
            label="UserName"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="resumeUrl"
            type="url"
            label="Resume URL"
            validators={[VALIDATOR_URL()]}
            errorText="Please enter a valid resume url."
            onInput={inputHandler}
          />

          <Button
            variant="contained"
            disabled={!formState.isValid}
            color="success"
            className="sButton"
            style={{
              color: !formState.isValid ? "#aaa" : "black",
              border: !formState.isValid && "2px solid white",
            }}
          >
            Submit
          </Button>
          <p>{message}</p>
        </form>
      </Card>
    </>
  );
};

export default Form;
