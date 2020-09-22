import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../../../formik/TextInput";
import StyledHeading from "../../../styles/StyledHeading";
import RoundedButton from "../../../styles/RoundedButton";
import { tapAnimation, hoverAnimation } from "../../../framer";

import HeroSection from "../../HeroSection";
import { homeObjOne } from "./Data";

import api from "../../../services/api";

const StyledUserSignup = styled.div`
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

  button.user-signup {
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

const SignUp = () => {
  const history = useHistory();
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    account: Math.floor(100000000000 + Math.random() * 100000000000),
    balance: "",
  };

  const [state, setState] = useState(initialState);
  return (
    <>
      <HeroSection {...homeObjOne} />

      <Fragment>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            mobile: "",
            balance: "",
          }}
          validationSchema={Yup.object({
            firstname: Yup.string().required(),
            lastname: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).max(10).required(),
            password2: Yup.string()
              .min(6)
              .max(10)
              .required()
              .oneOf([Yup.ref("password"), null], "Passwords don't match!")
              .required("Required"),

            mobile: Yup.string().required(),
            balance: Yup.string().required(),
          })}
          onSubmit={(values) => {
            const doSignUp = async (e) => {
              try {
                let account = state.account;
                const newState = { account, ...values };
                //setState({ ...state, values });

                let response = await api.user.signUp(newState);

                if (response) {
                  localStorage.setItem(
                    "client",
                    JSON.stringify(response.client)
                  );
                  localStorage.setItem(
                    "access_token",
                    JSON.stringify(response.token)
                  );

                  history.push("/client-area");
                }
              } catch (error) {
                console.log(error);
              }
            };

            doSignUp();
          }}
        >
          {(values) => {
            return (
              <StyledUserSignup>
                <StyledHeading>
                  <span>Sign Up</span>
                </StyledHeading>
                <h3>STEP ONE - CLIENT DETAILS</h3>
                <Form autoComplete="off">
                  <TextInput type="text" name="firstname" placeholder="John" />
                  <br />
                  <TextInput type="text" name="lastname" placeholder=" Joe" />
                  <br />
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
                    placeholder=" password"
                  />
                  <br />
                  <TextInput
                    autoComplete="off"
                    type="password"
                    name="password2"
                    placeholder=" password again"
                  />
                  <br />
                  <TextInput
                    type="number"
                    name="mobile"
                    placeholder=" Your mobile number"
                  />
                  <br />
                  <h3>STEP TWO - ACCOUNT INFORMATION</h3>
                  <div style={{ paddingTop: "20px", fontSize: "20px" }}>
                    Your new account number
                  </div>
                  <div style={{ paddingTop: "6px", fontSize: "19px" }}>
                    {state.account}
                  </div>{" "}
                  <br />
                  <TextInput
                    type="number"
                    name="balance"
                    placeholder=" Your initial deposit e.g. 2000"
                  />
                  <br />
                  <RoundedButton
                    whileHover={hoverAnimation}
                    whileTap={tapAnimation}
                    className="user-signup"
                    type="submit"
                  >
                    Sign Up
                  </RoundedButton>
                </Form>
                <p>
                  Already have an Account?{" "}
                  <Link to="/login">
                    <span>Sign In Here</span>
                  </Link>
                </p>
              </StyledUserSignup>
            );
          }}
        </Formik>
      </Fragment>
    </>
  );
};

export default SignUp;
