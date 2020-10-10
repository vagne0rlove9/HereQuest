import React, {Component} from "react";
import axios from "axios";
import "./QuestTasks.css";
import Map from "../Map/Map";
import MapArea from "../MapArea/MapArea";
import TextField from "@material-ui/core/TextField";

class QuestTasks extends Component {
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
        this.props.history.push('/quests/1')
    };

    render() {
        const {vacancy, error} = this.state;
        window.scrollTo(0, 0);
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <h3 className="header-task">Задание 1</h3>
                <h5 className="question">В каком году был основан город Зеленоград?</h5>

                <MapArea />

                <div className="item-vacancy">

                </div>
                <div className="row div-row" style={{marginLeft: "0"}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="answer"
                        label="Ответ на вопрос"
                        name="answer"
                        autoFocus
                    />
                    <button
                        type="button"
                        className="button-start-quest"
                        onClick={this.handleStartQuest}
                    >
                        Ответить на вопрос
                    </button>
                                          
                </div>

            </div>
        );
    }
}


export default (QuestTasks);
