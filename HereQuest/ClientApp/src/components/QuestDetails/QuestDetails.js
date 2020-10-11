import React, {Component} from "react";
import axios from "axios";
import "./QuestDetails.css";
import Loader from "../Loader/Loader";
import {connect} from "react-redux";


class QuestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
            loading: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getQuest()
    }

    
    
    getQuest() {
        const id = this.props.match.params.id;
        //const url = `${APP_URL_DEV}/api/vacancies/${id}`;
        console.log(id)
        axios
            .get(`https://js-here.firebaseio.com/quests/tourism/${id}.json`)
            .then((response) => response.data)
            .then(
                (data) => {
                    this.props.onTitle(data.title)
                    this.setState({quest: data, loading: false})
                }
            );
        
    }

    handleStartQuest = () => {
        this.props.onAnswer(null)
        this.props.history.push(`/quests/${this.props.match.params.id}/questions`)
    };

    render() {
        console.log("questDetails")
        const {vacancy, error} = this.state;
        window.scrollTo(0, 0);
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                {this.state.loading ? <Loader/>
                    : <>
                        <h3 className="header-h">{this.state.quest.title}</h3>
                        <h5 className="city">{this.state.quest.city}</h5>
                        <div className="item-vacancy">
                            <img src={this.state.quest.img2} className="quest-img" alt=""/>
                        </div>
                        <div className="item-vacancy">
                            <b> Описание квеста:</b>
                            <br/> {this.state.quest.description}
                        </div>
                        <div className="item-vacancy">
                            <b>Время прохождения:</b> {this.state.quest.time}
                        </div>
                        <div className="row div-row" style={{marginLeft: "0"}}>
                            <button
                                type="button"
                                className="button-start-quest"
                                onClick={this.handleStartQuest}
                            >
                                Начать квест
                            </button>
                        </div>
                    </>
                }
            </div>

        );
    }
}

const mapDispachToProps = dispatch => {
    return {
        onAnswer: value => dispatch({type: "answer", value: value}),
        onTitle: value => dispatch({type: "questName", value: value})
    };
};

export default connect(null, mapDispachToProps)(QuestDetails);
