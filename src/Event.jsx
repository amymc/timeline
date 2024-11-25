import styled from "@emotion/styled";

const Card = styled.article`
  background-color: hotpink;
  padding: 10px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  min-width: 250px;
  position: relative;
  &:after {
    position: absolute;
    top: 50%;
    right: ${(props) => (props.index / 2 === 0 ? "auto" : "-13px")};
    left: ${(props) => (props.index / 2 === 0 ? "-13px" : "auto")};

    display: inline;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    // border-left: 13px solid #eee;
    transform: translateY(-50%);
    content: "";
    border-right: ${(props) =>
      props.index / 2 === 0 ? "13px solid hotpink" : "none"};
    border-left: ${(props) =>
      props.index / 2 === 0 ? "none" : "13px solid hotpink"};
    border-color: hotpink
    top: 50%;
    transform: translateY(-50%);
    transition: border-color 0.2s ease-in-out;
  }
`;

function Event({ title, description, year, index }) {
  return (
    <Card index={index}>
      <h2>{title}</h2>
      <p>{year}</p>
      <p>{description}</p>
    </Card>
  );
}

export default Event;
