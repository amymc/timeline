import styled from "@emotion/styled";
import { colors } from "./constants";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.index % 2 === 0 ? "row-reverse" : "row")};
  text-align: ${(props) => (props.index % 2 === 0 ? "left" : "right")};
  width: 100%;
  justify-content: center;
  margin-left: ${(props) => (props.index % 2 === 0 ? "44%" : "auto")};
  margin-right: ${(props) => (props.index % 2 === 0 ? "auto" : "44%")};
  position: relative;
`;

const Year = styled.div`
  font-size: 22px;
  color: #f5f7f8;
  position: absolute;
  left: ${(props) => (props.index % 2 === 0 ? "-75px" : "auto")};
  right: ${(props) => (props.index % 2 === 0 ? "auto" : "-75px")};
  top: calc(50% - 15px);
`;

const Circle = styled.div`
  height: 30px;
  width: 30px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  background-color: #f5f7f8;
  position: absolute;
  top: calc(50% - 15px);
  left: ${(props) => (props.index % 2 === 0 ? "45px" : "auto")};
  right: ${(props) => (props.index % 2 === 0 ? "auto" : "45px")};
  z-index: 1;
`;

const CircleInner = styled.div`
  width: 20px;
  height: 20px;

  background-color: ${(props) => props.color};
  border-radius: 50%;
  top: calc(50% - 10px);
  position: absolute;
  left: calc(50% - 10px);
`;

const Card = styled.article`
  // background-color: white;
    background-color: #f5f7f8;

  padding: 10px;
  border-radius: 4px;
  color: black;
  font-size: 16px;
  position: relative;
  width: 350px;
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
    transform: translateY(-50%);
    content: "";
    border-right: ${(props) =>
      props.index % 2 === 0 ? "13px solid #f5f7f8" : "none"};
    border-left: ${(props) =>
      props.index % 2 === 0 ? "none" : "13px solid #f5f7f8"};
    border-color: #f5f7f8
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

const CardTitle = styled.h2`
  font-weight: normal;
  // // margin: 10px 0;
  margin: 0;
  // margin: 0 0 20px 0;
`;

const Description = styled.p`
  // text-align: justify;
  margin: 20px 0 0 0;
`;

const List = styled.ul`
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 16px;
`;

function Event({ category, title, description, index, isLast, year }) {
  return (
    <>
      <Row key={title} index={index}>
        <Year index={index}>{year}</Year>
        <Card index={index}>
          <CardInner color={colors[category]}>
            <CardTitle>{title}</CardTitle>
            {description && <Description>{description}</Description>}
          </CardInner>
        </Card>
        <Circle index={index}>
          <CircleInner color={colors[category]} />
        </Circle>
      </Row>
      {isLast && (
        <Row key={title} index={index + 1}>
          <Year style={{ left: "-30px" }} index={index + 1}>
            Now
          </Year>
          <Card index={index + 1}>
            <CardInner color="black">
              <CardTitle>The remaining legacy</CardTitle>
              {description && (
                <Description>
                  <List>
                    <ListItem>
                      Seven of the largest public hospitals in Ireland are owned
                      by private Catholic entities and receive more than €1
                      billion of State funding each year.
                    </ListItem>
                    <ListItem>
                      Over 90 per cent of the primary schools are under Catholic
                      patronage but are State-funded. Approximately 50 per cent
                      of secondary schools operate under Catholic ethos.
                    </ListItem>
                    <ListItem>
                      Some restrictons on abortion remain and an estimated 200
                      women still travel to the UK each year for the procedure.
                    </ListItem>
                  </List>
                </Description>
              )}
            </CardInner>
          </Card>
          <Circle index={index + 1}>
            <CircleInner color="black" />
          </Circle>
        </Row>
      )}
      )
    </>
  );
}

export default Event;
