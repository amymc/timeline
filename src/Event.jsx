import styled from "@emotion/styled";

const Card = styled.article`
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  width: 350px;
  margin-right: ${(props) => (props.index % 2 === 0 ? "auto" : "70px")};
  margin-left: ${(props) => (props.index % 2 === 0 ? "70px" : "auto")};
  &:after {
    position: absolute;
    top: 50%;
    right: ${(props) => (props.index % 2 === 0 ? "auto" : "-13px")};
    left: ${(props) => (props.index % 2 === 0 ? "-13px" : "auto")};

    display: inline;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    // border-left: 13px solid #eee;
    transform: translateY(-50%);
    content: "";
    border-right: ${(props) =>
      props.index % 2 === 0 ? "13px solid white" : "none"};
    border-left: ${(props) =>
      props.index % 2 === 0 ? "none" : "13px solid white"};
    border-color: white
    top: 50%;
    transform: translateY(-50%);
    transition: border-color 0.2s ease-in-out;
  }
`;

const CardInner = styled.div`
  padding: 20px;
  border: ${(props) => `4px solid ${props.color}`};

  border-radius: 6px;
  margin: 10px;
`;

const colors = {
  lgbtq: "purple",
  legal: "blue",
  cultural: "green",
  political: "",
  womensRights: "",
  social: "",
};

function Event({ category, title, description, index }) {
  console.log(colors[category], category);
  return (
    <Card index={index}>
      <CardInner color={colors[category]}>
        <h2>{title}</h2>
        <p>{description}</p>
      </CardInner>
    </Card>
  );
}

export default Event;
