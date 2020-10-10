import React, {useRef} from "react";
import axios from "axios";
import RsCarousel from "../../components/Carousel/ReactsrapCarousel";
import QuestCard from "../../components/QuestCard/QuestCard";
import Grid from "@material-ui/core/Grid";
import "../../custom.css";
import "./HomePage.css";
import StudentCard from "../../components/StudentCard/StudentCard";
import Loader from "../../components/Loader/Loader";
import {connect} from "react-redux";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.state = {
            error: null,
            questsTourism: [],
            loadingQuestsTourism: true,
            quests: []
        };
    }

    componentDidMount() {
        this.getQuestsTourism();
    }

    getQuestsTourism() {
        var temp = []
        axios
            .get("https://js-here.firebaseio.com/quests/tourism.json")
            .then((response) => response.data)
            .then(
                (data) => {
                    //temp.push(data)
                    Object.keys(data).forEach((key, index) => {
                        temp.push({
                            id: key,
                            index
                        })
                    })
                    //console.log(temp);
                    this.props.onQuestsTourism(temp);
                    this.setState({
                        loadingQuestsTourism: false
                    })
                },
                (error) =>
                    this.setState({
                        error: error,
                    })
            );
        this.setState({
            quests: temp,
            loadingQuestsTourism: false
        })
    }
    
    render() {
        window.scrollTo(0, 0);
        const {
            error,
            quests,
            questsTourism
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
                        { this.props.questsTourism.length > 1 
                            ?
                            this.props.questsTourism
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
                                        
                                    </Grid>
                                );
                            })
                            :
                            this.props.questsTourism
                                .slice(0, cardsCount)
                                .map((quest, index = 100) => {
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
                                            <QuestCard quest={quest}></QuestCard>
                                        </Grid>
                                    );
                                })
                        }
                    </Grid>

                    <div className="text-container">
                        <h1 className="caption-text">Знакомство с городом</h1>
                    </div>
                    {this.state.loadingQuestsTourism ? <Loader/> : null}
                    <Grid container justify="center">
                        {this.props.questsTourism
                            //.filter( quest => quest.city == "")
                            .slice(0, cardsCount)
                            .map((quest, index = 100) => {
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
                                        <QuestCard quest={quest} index={index}></QuestCard>
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <div className="text-container">
                        <h1 className="caption-text">Командные квесты</h1>
                    </div>
                    {this.state.loadingQuests ? <Loader/> : null}
                    <Grid container justify="center">
                        {this.props.questsTourism
                            //.filter( quest => quest.city == "")
                            .slice(0, cardsCount)
                            .map((quest, index = 100) => {
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
                                        <QuestCard quest={quest}></QuestCard>
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <div className="text-container">
                        <h1 className="caption-text">Загадки</h1>
                    </div>
                    {this.state.loadingQuests ? <Loader/> : null}
                    <Grid container justify="center">
                        {this.props.questsTourism
                            //.filter( quest => quest.city == "")
                            .slice(0, cardsCount)
                            .map((quest, index = 100) => {
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
                                        <QuestCard quest={quest}></QuestCard>
                                    </Grid>
                                );
                            })}
                    </Grid>
                </div>
            </div>
        );
    }
}


const mapDispachToProps = dispatch => {
    return {
        onQuestsTourism: value => dispatch({type: "questsTourism", value: value})
    };
};

const mapStateToProps = state => {
    return {
        questsTourism: state.questsTourism
    };
};

export default connect(mapStateToProps, mapDispachToProps)(HomePage);
