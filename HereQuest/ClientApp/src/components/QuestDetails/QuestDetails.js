import React, {Component} from "react";
import axios from "axios";
import "./QuestDetails.css";


class QuestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
        };
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.getVacancy();
    }

    getVacancy() {
        const id = this.props.match.params.id;
        //const url = `${APP_URL_DEV}/api/vacancies/${id}`;

        // axios
        //     .get(url)
        //     .then((response) => response.data)
        //     .then(
        //         (data) =>
        //             this.setState({
        //                 vacancy: data,
        //             }),
        //         (error) =>
        //             this.setState({
        //                 error: error,
        //             })
        //     );
    }
    
    handleStartQuest = () => {
        this.props.history.push(`/quests/${this.props.match.params.id}/questions`)
    };

    render() {
        const {vacancy, error} = this.state;
        window.scrollTo(0, 0);
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <h3 className="header-h">Узнай свой город</h3>
                <h5 className="city">Зеленоград</h5>
                    
                <div className="description">
                    <b> Описание квеста:</b>
                    <br/> Крутой квест
                </div>

                
                <div className="item-vacancy">
                    <b>Время прохождения:</b> 4 часа
                </div>
                <div className="item-vacancy">
                    <b>Команда:</b> 1 - 3 чел
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
                
            </div>
        );
    }
}



export default (QuestDetails);
