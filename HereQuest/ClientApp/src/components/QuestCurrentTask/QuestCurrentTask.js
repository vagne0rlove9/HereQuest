import React, {Component} from "react";
import axios from "axios";
import "./QuestCurrentTask.css";
import Map from "../Map/Map";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Loader from "../Loader/Loader";

class QuestCurrentTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quest: {},
            ans: null,
            errorMes: null,
            correct: false,
            loading: true
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getVacancy()
        this.props.onDesc(true)

    }

    getVacancy() {

        //const id = this.props.match.params.id;
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

    handleChangeAns = (event) => {
        this.props.onAnswer(event.target.value)
        if (event.target.value === this.props.task.right.toString()) {
            this.props.onFlag(true);
            this.setState({correct: true})
        } else {
            this.props.onFlag(false);
            this.setState({correct: false})
        }
    }

    render() {
        const {vacancy, error} = this.state;
        setTimeout(() => this.setState({loading: false}), 600)
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div>
                {this.state.loading
                    ? <Loader/>
                    :
                    <>
                        <h3 className="header-task">Задание {this.props.task.id + 1} из {this.props.task.count}</h3>
                        <h5 className="question">{this.props.task.question}</h5>
                        <Map/>
                        {this.props.isDesc
                            ?
                            <div className="row div-row" style={{marginLeft: "0", marginTop: "20px"}}>
                                <FormControl component="fieldset">
                                    <h5 className="question">Варианты ответа:</h5>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.props.answer}
                                                onChange={this.handleChangeAns}>
                                        <FormControlLabel value="1" control={<Radio/>} label={this.props.task.var_1}/>
                                        <FormControlLabel value="2" control={<Radio/>} label={this.props.task.var_2}/>
                                        <FormControlLabel value="3" control={<Radio/>} label={this.props.task.var_3}/>
                                        <FormControlLabel value="4" control={<Radio/>} label={this.props.task.var_4}/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            :
                            <div className="row div-row" style={{marginLeft: "0", marginTop: "20px"}}>
                                {this.state.correct
                                    ? <h5 className="error-description-green">Вы ответили правильно!</h5>
                                    : <h5 className="error-description-red">Вы ответили неправильно!</h5>
                                }
                                <br/><h6 className="question-description">{this.props.task.description}</h6>
                            </div>
                        }
                    </>
                }
            </div>
        );
    }
}

const mapDispachToProps = dispatch => {
    return {
        onFlag: value => dispatch({type: "isRight", value: value}),
        onAnswer: value => dispatch({type: "answer", value: value}),
        onDesc: value => dispatch({type: "isDesc", value: value})
    };
};

const mapStateToProps = state => {
    return {
        isRight: state.isRight,
        isDesc: state.isDesc
    };
};

export default connect(mapStateToProps, mapDispachToProps)(QuestCurrentTask);
