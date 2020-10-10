import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import "./ReactstrapCarousel.css";
const items = [
  {
    src: "images/carousel4_.jpg",
    altText: "Если ты хочешь хорошо провести вермя и узнать новый город, то наш сайт создан для тебя",
    header: "Если ты хочешь хорошо провести вермя и узнать новый город, то наш сайт создан для тебя",
    key: "1",
  },
  {
    src: "images/carousel2_.jpg",
    altText: "MayDay поможет Вам выбраться из комнаты!",
    header: "MayDay поможет Вам выбраться из комнаты!",
    key: "2",
  },
  {
    src: "images/carousel3_.jpg",
    altText: "MayDay - отличная возможность для отдыха с семьёй и друзьями",
    header: "MayDay - отличная возможность для отдыха с семьёй и друзьями",
    key: "3",
  },
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;
