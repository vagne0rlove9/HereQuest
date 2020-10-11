import React from "react";
import {Link, withRouter} from "react-router-dom";
import "../../custom.css";
import "./AboutQuest.css";
import {useHistory} from "react-router-dom";
import {NavLink} from "reactstrap";

const AboutQuest = props => {
    const history = useHistory();
    window.scrollTo(0, 0);
    return (
        <div className="div">
            <div className="header-how">Что такое геоквест?</div>
            <p>Геоквест — это увлекательная игра — путешествие, состоящая из нескольких этапов,
                на каждом из которых Вам понадобится посетить контрольные пункты, найти
                ответы на вопросы (памятники, таблички, архитектурные объекты и т.п.).
            </p>
            <p>Геоквест позволит Вам познакомиться с новым городом в игровой форме.
            </p>
        </div>
    );
};
export default withRouter(AboutQuest);
