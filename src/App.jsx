import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Event from "./Event";
import events from "./data/events.json";
import { colors } from "./constants";
import "./App.css";

// 324 is height of first row
const startPostion = 286 / 2;
const endPosition = 552 / 2;

const Line = styled.div`
  width: 10px;
  height: 100%;
  position: absolute;
  background-color: #f5f7f8;
`;

const ScrollLine = styled.div`
  width: 10px;
  height: ${(props) => `${props.scrollPosition}px`};
  background-color: black;
`;

const EventsContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 100px 0;
`;

const Rosary = styled.div`
  width: 10px;
  height: calc(100% - ${endPosition}px);
  position: absolute;
  background-color: transparent;
  left: calc(50% - 5px);
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f7f8;
  // rgba(255, 255, 255, 0.8);
  padding: 20px;
  position: fixed;
  left: 20px;
  top: 60px;
  border-radius: 4px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0;
  justify-content: space-between;
  // padding-right: 12px;
`;

const LegendCircle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid grey;
  margin-left: 16px;
`;

const LegendTitle = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  z-index: 1;
  margin-bottom: 15px;
  font-weight: normal;
`;

const Subtitle = styled.h3`
  font-weight: normal;
  margin: 0;
`;

const MainContent = styled.div`
  width: 998px;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const Intro = styled.div`
  color: #f5f7f8;
  text-align: center;
`;

function App() {
  const [scrollPosition, setScrollPosition] = useState(startPostion);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    const position =
      window.scrollY < window.innerHeight / 8
        ? startPostion
        : `${window.scrollY + window.innerHeight / 8}`;

    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Categories>
        <LegendTitle>Event categories</LegendTitle>
        {Object.keys(colors).map((key) => (
          <Category key={key}>
            {key} <LegendCircle color={colors[key]} />
          </Category>
        ))}
      </Categories>
      <Intro>
        <Title> Fall from grace </Title>
        <Subtitle>
          A look at the dramatic demise of the Catholic Church in Ireland
        </Subtitle>
      </Intro>

      <MainContent>
        <EventsContainer>
          {events.map(({ title, description, year, category }, index) => {
            return (
              <>
                <Event
                  index={index}
                  title={title}
                  description={description}
                  category={category}
                  isLast={index === events.length - 1}
                  year={year}
                />
              </>
            );
          })}

          <Rosary scrollPosition={scrollPosition}>
            <Line>
              <ScrollLine scrollPosition={scrollPosition} ref={scrollRef} />
            </Line>
          </Rosary>
        </EventsContainer>
      </MainContent>
    </>
  );
}

export default App;
