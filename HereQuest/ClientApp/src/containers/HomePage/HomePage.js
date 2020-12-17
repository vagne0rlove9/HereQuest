import React, {useRef} from "react";
import axios from "axios";
import RsCarousel from "../../components/Carousel/ReactsrapCarousel";
import QuestCard from "../../components/QuestCard/QuestCard";
import Grid from "@material-ui/core/Grid";
import "../../custom.css";
import "./HomePage.css";
import QuestAreaCard from "../../components/QuestAreaCard/QuestAreaCard";
import Loader from "../../components/Loader/Loader";
import {connect} from "react-redux";

axios.defaults.baseURL = 'http://localhost:3333/';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.state = {
            error: null,
            questsTourism: [],
            questsPopular: [],
            questsRiddle: [],
            questsTeam: [],
            loadingQuestsTourism: true,
            loadingQuestsPopular: true,
            loadingQuestsRiddle: true,
            loadingQuestsTeam: true,
        };
    }

    componentDidMount() {
        this.getQuestsTourism();
        //this.getQuestsPopular();
        //this.getQuestsRiddle();
        //this.getQuestsTeam();
    }

    

    getQuestsTourism() {
        var temp = []
        axios
            .get("quests")
            .then((response) => response.data)
            .then(
                (data) => {
                    //temp.push(data)
                    //Object.keys(data).forEach((key, index) => {
                    //    temp.push({
                    //        id: key,
                    //        index
                    //    })
                    //})
                    this.setState({
                        loadingQuestsTourism: false,
                        questsTourism: data
                    })
                    //this.props.onQuestsTourism(temp);
                    console.log(data)
                   
                },
                (error) => {
                    console.log("error")
                    console.log(error)
                    this.setState({
                        error: error,
                    })
                }
            );
    }

    getQuestsPopular() {
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
                    //this.props.onQuestsTourism(temp);
                    temp.map(t => {
                        this.props.questsPopular.push(t)
                    })
                    this.setPop()
                },
                (error) =>
                    this.setState({
                        error: error,
                    })
            );
    }

    setPop(){
        var temp = []
        this.props.questsPopular.map(q => {
            axios
                .get(`https://js-here.firebaseio.com/quests/tourism/${q.id}.json`)
                .then((response) => response.data)
                .then(
                    (data) => {
                        temp.push(data)
                        this.setState({questsPopular: temp})
                    }
                );
        })
        
    }
    
    getQuestsRiddle() {
        var temp = []
        axios
            .get("https://js-here.firebaseio.com/quests/riddle.json")
            .then((response) => response.data)
            .then(
                (data) => {
                    //temp.push(data)
                    //console.log(data)
                    Object.keys(data).forEach((key, index) => {
                        temp.push({
                            id: key,
                            index
                        })
                    })
                    //console.log(temp)
                    this.props.onQuestsRiddle(temp);
                    this.setState({
                        loadingQuestsRiddle: false
                    })
                    
                    this.setState({loadingQuestsPopular: false})
                    //console.log(this.props.questsPopular)
                },
                (error) =>
                    this.setState({
                        error: error,
                    })
            );
    }

    getQuestsTeam() {
        // var temp = []
        // axios
        //     .get("https://js-here.firebaseio.com/quests/tourism.json")
        //     .then((response) => response.data)
        //     .then(
        //         (data) => {
        //             //temp.push(data)
        //             Object.keys(data).forEach((key, index) => {
        //                 temp.push({
        //                     id: key,
        //                     index
        //                 })
        //             })
        //             //console.log(temp);
        //             this.props.onQuestsTourism(temp);
        //             this.setState({
        //                 loadingQuestsTourism: false
        //             })
        //         },
        //         (error) =>
        //             this.setState({
        //                 error: error,
        //             })
        //     );
        // this.setState({
        //     quests: temp,
        //     loadingQuestsTourism: false
        // })
    }
    
    render() {
        window.scrollTo(0, 0);
        const {error} = this.state;
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
                    {//<div className="text-container">
                        //    <h1 className="caption-text">Популярные квесты</h1>
                        //</div>
                        //{this.state.loadingQuestsTourism ? <Loader/> : null}
                        //<Grid container justify="center" className="margin-bottom">
                        //    {
                        //        this.props.questsTourism
                        //        .sort(
                        //            (v1, v2) =>
                        //                (v1.rating) - (v2.rating)
                        //                //new Date(v1.dateOfCreation) - new Date(v2.dateOfCreation)
                        //        )
                        //        .slice(0, cardsCount)
                        //        .map((quest, index) => {
                        //            let zIndex = Math.round((1 / (index + 1)) * 100);
                        //            return (
                        //                <Grid
                        //                    key={index}
                        //                    item
                        //                    style={{
                        //                        width: window.screen.availWidth > 320 ? "311px" : "250px",
                        //                        marginRight: "40px",
                        //                        marginLeft: "0px",
                        //                        // zIndex: zIndex,
                        //                    }}
                        //                >
                        //                    <QuestCard quest={quest}></QuestCard>
                        //                </Grid>
                        //            );
                        //        })

                        //    }
                        //</Grid>
                    }
                    <div className="text-container">
                        <h1 className="caption-text">Знакомство с городом</h1>
                    </div>
                    {this.state.loadingQuestsTourism ? <Loader/> : null}
                    <Grid container justify="center" className="margin-bottom">
                        {this.state.questsTourism
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
                    {
                    //    <div className="text-container">
                    //    <h1 className="caption-text">Загадки</h1>
                    //</div>
                    //{this.state.loadingQuestsRiddle ? <Loader/> : null}
                    //<Grid container justify="center" className="margin-bottom">
                    //    {this.props.questsRiddle
                    //        //.filter( quest => quest.city == "")
                    //        .slice(0, cardsCount)
                    //        .map((quest, index = 100) => {
                    //            let zIndex = Math.round((1 / (index + 1)) * 100);
                    //            return (
                    //                <Grid
                    //                    key={index}
                    //                    item
                    //                    style={{
                    //                        width: window.screen.availWidth > 320 ? "311px" : "250px",
                    //                        marginRight: "40px",
                    //                        marginLeft: "0px",
                    //                        zIndex: zIndex,
                    //                    }}
                    //                >
                    //                    <QuestAreaCard quest={quest}></QuestAreaCard>
                    //                </Grid>
                    //            );
                    //        })}
                    //</Grid>
                    //<div className="text-container">
                    //    <h1 className="caption-text">Командные квесты</h1>
                    //</div>
                    //{this.state.loadingQuestsTeam ? <Loader/> : null}
                    //<Grid container justify="center" className="margin-bottom">
                    //    {this.state.questsTeam
                    //        //.filter( quest => quest.city == "")
                    //        .slice(0, cardsCount)
                    //        .map((quest, index = 100) => {
                    //            let zIndex = Math.round((1 / (index + 1)) * 100);
                    //            return (
                    //                <Grid
                    //                    key={index}
                    //                    item
                    //                    style={{
                    //                        width: window.screen.availWidth > 320 ? "311px" : "250px",
                    //                        marginRight: "40px",
                    //                        marginLeft: "0px",
                    //                        zIndex: zIndex,
                    //                    }}
                    //                >
                    //                    <QuestCard quest={quest}></QuestCard>
                    //                </Grid>
                    //            );
                    //        })}
                    //</Grid>
                    }
                </div>
            </div>
        );
    }
}


const mapDispachToProps = dispatch => {
    return {
        onQuestsTourism: value => dispatch({type: "questsTourism", value: value}),
        onQuestsRiddle: value => dispatch({type: "questsRiddle", value: value}),
        onQuestsPopular: value => dispatch({type: "questsPopular", value: value}),
        onQuestsTeam: value => dispatch({type: "questsTeam", value: value}),
    };
};

const mapStateToProps = state => {
    return {
        questsTourism: state.questsTourism,
        questsRiddle: state.questsRiddle,
        questsPopular: state.questsPopular,
        questsTeam: state.questsTeam,
    };
};

export default connect(mapStateToProps, mapDispachToProps)(HomePage);
