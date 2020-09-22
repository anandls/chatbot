import React, { useState, useEffect, useRef, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StyledHeading from "../../../styles/StyledHeading";
import "./ClientArea.css";

import api from "../../../services/api";

const StyledClient = styled.div`
  width: 80%;
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
`;

const StyledBox = styled.div`
  margin: 1em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 2px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const StyledChatArea = styled.div`
  margin: 1em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 2px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const ClientArea = () => {
  const history = useHistory();
  let newState;
  const initialState = {
    text: "",
    author: "",
    authortype: "",
    sessionId: "",
  };
  const [state, setMessageState] = useState(initialState);
  const [clientInfo, setClientState] = useState("");

  const updateState = async (newState) => {
    setMessageState(newState);

    console.log(state);
  };

  useEffect(() => {
    let client = localStorage.getItem("client");
    let clientDetails = JSON.parse(client);

    let token = localStorage.getItem("access_token");
    token ? true : history.push("/sign-up");

    setClientState(clientDetails);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    newState = {
      ...state,
      text: value,
    };

    updateState(newState);
  };

  const appendMessage = (firstname, lastname, position, messageText) => {
    let msgerChat = document.getElementsByClassName("msger-chat");

    const msgHTML = `
        <div class="msg ${position}-msg">
            <div class="msg-img" ></div>
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">${firstname} ${lastname}</div>
              </div>
              <div class="msg-text">${messageText}</div>
            </div>
          </div>
      `;

    msgerChat[0].insertAdjacentHTML("beforeend", msgHTML);
    msgerChat[0].scrollTop += 500;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let session;
    let incoming;
    let responded;
    let response;

    if (!session) {
      console.log("_id:", clientInfo.id);
      newState = {
        ...state,
        text: state.text,
        author: clientInfo.id,
        authortype: "CLIENT",
      };

      await updateState(newState);
    } else {
      newState = {
        ...state,
        text: state.text,
        author: session,
        authortype: "BOT",
      };

      await updateState(newState);
    }

    response = await api.message.postMessage(state);

    session = response.newSessionId;
    incoming = response.incoming;
    responded = response.response;

    document.getElementById("messageInput").value = "";

    appendMessage(clientInfo.firstname, clientInfo.lastname, "right", incoming);
    appendMessage("Assistant", "", "left", responded);
  };

  return (
    <>
      <StyledClient>
        <StyledBox
          style={{
            backgroundColor: "#1c2237",
            height: "160px",
            width: "80%",
            color: "#ffffff",
          }}
        >
          <StyledHeading>CLIENT AREA</StyledHeading>
        </StyledBox>
      </StyledClient>

      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> MiBank
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>
        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-img"></div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Assistance</div>
              </div>
              <div className="msg-text">Welcome</div>
            </div>
          </div>
        </main>
        <form className="msger-inputarea" onSubmit={handleSubmit}>
          <input
            name="message"
            type="text"
            id="messageInput"
            className="msger-input"
            placeholder="Enter your message..."
            onChange={handleChange}
          />
          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default ClientArea;
