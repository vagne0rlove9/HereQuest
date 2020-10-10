import React from "react";
import Carousel from "react-material-ui-carousel";
import Banner from "../Banner/Banner";
import autoBind from "auto-bind";
import "./Carousel.css";

const items = [
  {
    Name: "Стажировка",
    Caption: "Начни зарабатывать!",
    contentPosition: "left",
    Items: [
      {
        Name: "Начни зарабатывать!",
        Image: "https://www.equityrisksciences.com/wp-content/uploads/2019/01/Business-1200px.jpg",
      },
      {
        Name: "Опыт работы всегда в цене!",
        Image: "images/car1.jpg",
      }
    ],
  },
  {
    Name: "Опыт работы",
    Caption: "Опыт работы всегда в цене!",
    contentPosition: "middle",
    Items: [
      {
        Name: "Опыт работы всегда в цене!",
        Image: "images/car1.jpg",
      },
      {
        Name: "Найди компанию мечты!",
        Image: "https://static.tildacdn.com/tild3932-3136-4464-b566-346239303062/1qU55mOrCLzBJAx2TwoW.jpeg",
      }
    ],
  },
  {
    Name: "Компания",
    Caption: "Найди компанию мечты!",
    contentPosition: "right",
    Items: [
      {
        Name: "Найди компанию мечты!",
        Image: "https://static.tildacdn.com/tild3932-3136-4464-b566-346239303062/1qU55mOrCLzBJAx2TwoW.jpeg",
      },
      {
        Name: "Начни зарабатывать!",
        Image: "https://www.equityrisksciences.com/wp-content/uploads/2019/01/Business-1200px.jpg",
      },
    ],
  },
];

class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 10000,
      animation: "fade",
      indicators: true,
      timeout: 2000,
      navButtonsAlwaysVisible: true,
    };

    autoBind(this);
  }

  render() {
    return (
      <Carousel
        className="Example"
        autoPlay={this.state.autoPlay}
        timer={this.state.timer}
        animation={this.state.animation}
        indicators={this.state.indicators}
        timeout={this.state.timeout}
        navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
      >
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
              length={1}
            />
          );
        })}
      </Carousel>
    );
  }
}

export default CarouselWrapper;
