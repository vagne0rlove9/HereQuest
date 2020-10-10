import React, {useRef} from "react";
import axios from "axios";
import RsCarousel from "../../components/Carousel/ReactsrapCarousel";
import QuestCard from "../../components/QuestCard/QuestCard";
import Grid from "@material-ui/core/Grid";
import "../../custom.css";
import "./HomePage.css";
import StudentCard from "../../components/StudentCard/StudentCard";
import Loader from "../../components/Loader/Loader";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.state = {
            error: null,
            quests: [],
            loadingQuests: true,
        };
    }

    componentDidMount() {
        this.getQuests();
    }

    getQuests() {
        var temp = []
        temp[0] = {
            name: "Зеленоград"
        }
        temp[1] = {
            name: "Зеленоград"
        }
        temp[2] = {
            name: "Зеленоград"
        }
        temp[3] = {
            name: "Зеленоград"
        }
        temp[4] = {
            name: "Зеленоград"
        }
        temp[5] = {
            name: "Зеленоград"
        }
        temp[6] = {
            name: "Зеленоград"
        }
        temp[7] = {
            name: "Зеленоград"
        }
        this.setState({loadingQuests: false, quests: temp});
    }
    
    render() {
        window.scrollTo(0, 0);
        const {
            error,
            quests
        } = this.state;
        const cardsCount = window.screen.availWidth >= 2560 ? 7 : 8;
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="page-container">
                {
                    window.screen.availWidth <= 768
                        ? <div
                            className="image-mobile"
                            id="image-mob"
                        >
                            Если ты хочешь хорошо провести вермя и узнать новый город, то наш сайт создан для тебя
                        </div>
                        : <div className="hide-0-to-768">
                            <RsCarousel/>
                        </div>
                }
                <div className="gradient-background">
                    <div className="text-container">
                        <h1 className="caption-text">Популярные квесты</h1>
                    </div>
                    {this.state.loadingQuests ? <Loader/> : null}
                    <Grid container justify="center" className="margin-bottom">
                        {quests
                            .sort(
                                (v1, v2) =>
                                    new Date(v1.dateOfCreation) - new Date(v2.dateOfCreation)
                            )
                            .slice(0, cardsCount)
                            .map((vacancy, index) => {
                                let zIndex = Math.round((1 / (index + 1)) * 100);
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        style={{
                                            width: window.screen.availWidth > 320 ? "311px" : "250px",
                                            marginRight: "40px",
                                            marginLeft: "0px",
                                            // zIndex: zIndex,
                                        }}
                                    >
                                        <QuestCard vacancy={vacancy}></QuestCard>
                                    </Grid>
                                );
                            })}
                    </Grid>

                    <div className="text-container">
                        <h1 className="caption-text">Квесты в вашем городе</h1>
                    </div>
                    {this.state.loadingStudents ? <Loader/> : null}
                    <Grid container justify="center">
                        {quests
                            .filter(
                                (s) =>
                                    s.sphere !== null &&
                                    s.name !== null &&
                                    s.secondName !== null &&
                                    s.thirdName !== null &&
                                    s.age !== null &&
                                    s.typeOfEmployment !== null &&
                                    s.address !== null &&
                                    s.university !== null
                            )
                            .slice(0, cardsCount)
                            .map((student, index = 100) => {
                                let zIndex = Math.round((1 / (index + 1)) * 100);
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        style={{
                                            width: window.screen.availWidth > 320 ? "311px" : "250px",
                                            marginRight: "40px",
                                            marginLeft: "0px",
                                            zIndex: zIndex,
                                        }}
                                    >
                                        <StudentCard student={student}></StudentCard>
                                    </Grid>
                                );
                            })}
                    </Grid>

                </div>
            </div>
        );
    }
}


export default (HomePage);
