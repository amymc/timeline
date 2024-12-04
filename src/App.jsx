import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Event from "./Event";
import events from "./data/events.json";
import { colors } from "./constants";
import "./App.css";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.index % 2 === 0 ? "row-reverse" : "row")};
  text-align: ${(props) => (props.index % 2 === 0 ? "left" : "right")};
  width: 100%;
  justify-content: center;
  margin-left: ${(props) => (props.index % 2 === 0 ? "47%" : "auto")};
  margin-right: ${(props) => (props.index % 2 === 0 ? "auto" : "47%")};
  position: relative;
`;

const Line = styled.div`
  // display: ${(props) => (props.hide ? "none" : "block")};
  width: 10px;
  height: 100%;
  position: absolute;
  // background-color: white;
  height: calc(100% - 720px);
  // background-color: ${(props) => (props.hide ? "black" : "white")};
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
  padding: 150px 0;
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

const LegendTitle = styled.span`
  font-weight: bold;
`;
const Title = styled.h1`
  z-index: 1;
`;

const Year = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: white;
  position: absolute;
  left: ${(props) => (props.index % 2 === 0 ? "-100px" : "auto")};
  right: ${(props) => (props.index % 2 === 0 ? "auto" : "-100px")};
  top: calc(50% - 15px);
`;

const Conclusion = styled.div`
  font-weight: bold;

  background-color: white;
  padding: 30px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  text-align: justify;
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
  left: 15px;
  background: white;
`;

function App() {
  const [scrollPosition, setScrollPosition] = useState("62.5vh");
  const [hideScrollLine, setHideScrollLine] = useState(false);

  const endRef = useRef(null);
  const scrollRef = useRef(null);

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

  function checkIfHeaderIsOverlapping() {
    if (scrollRef.current && endRef.current) {
      const a = scrollRef.current.getBoundingClientRect();
      const b = endRef.current.getBoundingClientRect();

      console.log("scroll", scrollRef.current.offsetTop);
      console.log("end", endRef.current.offsetTop);

      console.log(window.scrollY);
      console.log("scroll", a, "end", b);
      if (b.bottom <= a.bottom) {
        console.log("hide");

        setHideScrollLine(true);
      } else {
        setHideScrollLine(false);
      }
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", checkIfHeaderIsOverlapping);
    }
    watchScroll();

    return () => {
      window.removeEventListener("scroll", checkIfHeaderIsOverlapping);
    };
  });

  // useEffect(() => {
  //   // let target = scrollRef.current;

  //   const observer = new IntersectionObserver((entries) => {
  //     let doesOverlap =
  //       entries[0].boundingClientRect.y >=
  //       scrollRef.current.getBoundingClientRect().y;

  //     console.log("end ref", endRef.current.getBoundingClientRect().y);
  //     console.log("scroll ref", entries[0].boundingClientRect.y);

  //     // console.log("doesOverlap", entries[0]);
  //     // console.log("doesOverlap", doesOverlap);
  //     console.log(scrollRef.current.getBoundingClientRect());
  //     console.log(entries[0].boundingClientRect);

  //     if (doesOverlap) {
  //       console.log("doesOverlap");
  //       setHideScrollLine(true);
  //     }
  //     if (entries[0].isIntersecting) {
  //       console.log("isIntersecting");
  //     }
  //   });

  //   if (endRef.current) {
  //     // observer.observe(endRef.current);
  //     observer.observe(endRef.current);
  //   }

  //   return () => {
  //     if (endRef.current) {
  //       observer.unobserve(endRef.current);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("consoleRef", consoleRef);
  //   console.log("current", consoleRef.current);
  //   console.log("scrollHeight", consoleRef.current.offsetHeight);
  // }, []);

  return (
    <>
      <Categories>
        <LegendTitle>Event categories</LegendTitle>
        {Object.keys(colors).map((key) => (
          <Category key={key}>
            {key} <Square color={colors[key]} />
          </Category>
        ))}
      </Categories>
      <Title> In memoriam </Title>
      {/* <RosaryContainer> */}
      <Rosary scrollPosition={scrollPosition}>
        <Line hide={hideScrollLine}>
          <ScrollLine
            scrollPosition={scrollPosition}
            ref={scrollRef}
            hide={hideScrollLine}
          />
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
              {(index === 0 || index === events.length - 1) && <Circle />}

              {index === events.length - 1 && <Circle ref={endRef} />}
            </Row>
          );
        })}
      </EventsContainer>
      <Conclusion>
        <h2>Where do we stand now? </h2>
        While the Church's influence in Ireland is not what it used to be,
        unfortunately we still don't have true separation of church and state
        and in some aspects of society we are still living with the legacy of
        Church control.
        <ul>
          <li>
            Seven of the largest public hospitals in Ireland are owned by
            private Catholic entities and receive more than €1 billion of State
            funding each year.
          </li>
          <li>
            Over 90 per cent of the primary schools are under Catholic patronage
            but are State-funded. Approximately 50 per cent of secondary schools
            operate under Catholic ethos.
          </li>
          <li>
            Some restrictons on abortion remain and an estimated 200 women still
            travel to the UK each year for the procedure.
          </li>
        </ul>
      </Conclusion>
    </>
  );
}

export default App;
