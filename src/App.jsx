import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useScroll } from "@react-spring/web";
import Event from "./Event";
import { useScrollHandler } from "./useScrollHandler";
import events from "./data/events.json";
import { colors } from "./constants";
import "./App.css";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.index % 2 === 0 ? "row-reverse" : "row")};
  text-align: ${(props) => (props.index % 2 === 0 ? "left" : "right")};
  width: 100%;
  justify-content: center;
  margin-left: ${(props) => (props.index % 2 === 0 ? "395px" : "auto")};
  margin-right: ${(props) => (props.index % 2 === 0 ? "auto" : "395px")};
  position: relative;
`;

const Line = styled.div`
  width: 10px;
  height: 100%;
  position: absolute;
  background-color: white;
  left: calc(50% - 5px);
  // opacity: ${(props) => props.opacity};
  // animation-name: rotateAnimation;
  // animation-duration: 1ms; /* Firefox requires this to apply the animation */
  // animation-direction: alternate;
  // animation-timeline: scroll(block nearest);

  // @keyframes rotateAnimation {
  //   from {
  //     height: ;
  //   }
  //   to {
  //     color: orange;
  //   }
  // }
`;

const ScrollLine = styled.div`
  width: 10px;
  // margin-top: 50vh;
  height: ${(props) => props.scrollPosition};
  // height: ${(props) =>
    props.scrollPosition > `50vh` ? `${props.scrollPosition}px` : `50vh`};
  background-color: black;
  // position: absolute;
  // left: calc(50% - 5px);
`;

const EventsContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  // align-items: center;
  // justify-content: center;
  flex-wrap: wrap;
  position: relative;
  padding-top: 150px;
`;

const Rosary = styled.div`
  // padding-top: 100px;
  width: 10px;
  height: 100%;
  position: absolute;
  // background-color: grey;
  // left: calc(50% - 5px);
  height: calc(100% - 100px);
  position: absolute;
  background-color: transparent;
  // margin-top: 100px;
  // margin-top: 50vh;
  // height: 100%;
  // margin-top: ${(props) =>
    props.scrollPosition > `50vh` ? `${props.scrollPosition}px` : `50vh`};
`;

const Beads = styled.div`
  position: absolute;
  left: calc(50% - 15px);
`;

const Bead = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(5px);
  width: 30px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  position: relative;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  // font-weight: bold;
  // font-size: 16px;
  padding: 16px;
  position: fixed;
  left: 20px;
  top: 60px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0;
  justify-content: space-between;
  padding-right: 12px;
`;

const Square = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
`;

const Title = styled.span`
  font-weight: bold;
`;

const Year = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: white;
  position: absolute;
  left: ${(props) => (props.index % 2 === 0 ? "-90px" : "auto")};
  right: ${(props) => (props.index % 2 === 0 ? "auto" : "-90px")};
  top: calc(50% - 16px);
`;

const Conclusion = styled.div`
  font-weight: bold;
`;

const RosaryContainer = styled.div`
  position: relative;
`;

const Circle = styled.div`
  height: 30px;
  width: 30px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  background-color: white;
  position: absolute;
  top: calc(50% - 15px);
  left: 18px;
  border-radius: 1px solid red;
  background: white;
`;

function App() {
  console.log({ events });
  const { scrollYProgress } = useScroll();
  console.log({ scrollYProgress });

  // const endOfPage = useRef();

  const scroll = useScrollHandler();
  console.log({ scroll });

  const [scrollPosition, setScrollPosition] = useState("62.5vh");
  const handleScroll = () => {
    // const position = window.scrollY + window.innerHeight / 2.2;

    const position =
      window.scrollY < window.innerHeight / 5
        ? "62.5vh"
        : `${window.scrollY + window.innerHeight / 2.5}px`;

    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    console.log({ scrollPosition });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log({ colors });
  return (
    <>
      <Categories>
        <Title>Event categories</Title>
        {Object.keys(colors).map((key) => (
          <Category key={key}>
            {key} <Square color={colors[key]} />
          </Category>
        ))}
      </Categories>
      <h1> In memoriam </h1>
      {/* <RosaryContainer> */}
      <Rosary scrollPosition={scrollPosition}>
        <Line>
          <ScrollLine scrollPosition={scrollPosition} />
        </Line>
        {/* <Beads>
          {[...Array(200)].map((e, i) => (
            <Bead key={i} />
          ))}
        </Beads> */}
      </Rosary>
      {/* </RosaryContainer> */}
      <EventsContainer>
        {events.map(({ title, description, year, category }, index) => {
          return (
            <Row key={title} index={index}>
              <Year index={index}>{year}</Year>

              <Event
                index={index}
                title={title}
                description={description}
                category={category}
              />
              {index === 0 && <Circle />}
            </Row>
          );
        })}
      </EventsContainer>
      <Conclusion>
        While the Church's influence in Ireland is not what it used to be,
        unfortunately we still don't true seperation of church and state. Seven
        of the largest public hospitals in Ireland are owned by private Catholic
        entities and receive more than €1 billion of State funding each year.
        Over 90 per cent of the primary schools are under Catholic patronage but
        are State-funded. Approximately 50 per cent of secondary schools operate
        under Catholic ethos.
      </Conclusion>
    </>
  );
}

export default App;
