import { useState } from "react";
import styled from "@emotion/styled";
import Event from "./Event";
import "./App.css";

const events = [
  { title: "Event 1", description: "Event description", year: "1983" },
  { title: "Event 2", description: "Event description", year: "1996" },
];

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.index / 2 === 0 ? "row-reverse" : "row")};
  text-align: ${(props) => (props.index / 2 === 0 ? "left" : "right")};
  width: 100%;
  justify-content: center;
  margin-left: ${(props) => (props.index / 2 === 0 ? "300px" : "auto")};
  margin-right: ${(props) => (props.index / 2 === 0 ? "auto" : "300px")};
`;

const Line = styled.div`
  width: 10px;
  height: 100%;
  left: 50%;
  position: absolute;
  background-color: black;
  left: calc(50% - 5px);
`;

function App() {
  return (
    <>
      <Line />

      {events.map(({ title, description, year }, index) => (
        <Row key={title} index={index}>
          <Event
            index={index}
            year={year}
            title={title}
            description={description}
          />
        </Row>
      ))}
    </>
  );
}

export default App;
