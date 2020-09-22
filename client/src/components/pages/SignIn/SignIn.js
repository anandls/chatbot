import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../../../formik/TextInput";
import StyledHeading from "../../../styles/StyledHeading";
import RoundedButton from "../../../styles/RoundedButton";
import { tapAnimation, hoverAnimation } from "../../../framer";

import HeroSection from "../../HeroSection";
import { homeObjOne, homeObjThree, homeObjFive } from "./Data";
import Pricing from "../../Pricing";

const StyledUserLogin = styled.div`
  width: 20%;
  margin: 2em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 6px;

  @media (max-width: 500px) {
    width: 90%;
  }

  input {
    border: 1px solid ${(props) => props.theme.violet};
  }

  button.user-login {
    background-color: ${(props) => props.theme.primaryBtn};
    color: ${(props) => props.theme.white};
    box-shadow: ${(props) => props.theme.bs2};
  }

  p {
    letter-spacing: 0.1em;
  }

  p span {
    border-bottom: 2px solid ${(props) => props.theme.violet};
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const SignIn = () => {
  return (
    <>
      <HeroSection {...homeObjOne} />

      <Fragment>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).max(6).required(),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(values) => {
            return (
              <StyledUserLogin>
                <StyledHeading>
                  <span>Login to your Account</span>
                </StyledHeading>
                <Form autoComplete="off">
                  <TextInput
                    autoComplete="off"
                    type="email"
                    name="email"
                    placeholder="johnjoe@gmail.com"
                  />
                  <br />

                  <TextInput
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <br />

                  <RoundedButton
                    whileHover={hoverAnimation}
                    whileTap={tapAnimation}
                    className="user-login"
                    type="submit"
                  >
                    Login
                  </RoundedButton>
                </Form>
                <p>
                  Don't have an Account?{" "}
                  <Link to="./sign-up">
                    <span>Sign Up Here</span>
                  </Link>
                </p>
              </StyledUserLogin>
            );
          }}
        </Formik>
      </Fragment>
    </>
  );
};

export default SignIn;
