import React, {Component} from "react";
import axios from "axios";
import "./QuestDetails.css";
import Map from "../Map/Map";

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

    handleSendRequest = () => {
        // const vacancyId = this.props.match.params.id;
        // const url = `${APP_URL_DEV}/email/to/company`;
        // const params = {
        //     vacancyId: vacancyId,
        //     studentId: this.props.user.profile.sub,
        //     companyEmail: this.state.vacancy.companyInfo.email,
        // };
        // axios
        //     .post(url, {}, {params: params})
        //     .then((response) => response.status)
        //     .then(
        //         (status) => {
        //             if (status === 200) {
        //                 document.getElementById("green").style.opacity = 1;
        //                 setTimeout(
        //                     'document.getElementById("green").style.opacity = 0',
        //                     5000
        //                 );
        //             }
        //         },
        //         (error) => {
        //             document.getElementById("green").style.opacity = 1;
        //             setTimeout(
        //                 'document.getElementById("green").style.opacity = 0',
        //                 5000
        //             );
        //         }
        //     );
    };

    render() {
        const {vacancy, error} = this.state;
        window.scrollTo(0, 0);
        if (error) return <div>Error: {error.message}</div>;
        return (
            <div className="container-vac-details">
                <h3 className="header-h">Узнай свой город</h3>
                <h5 className="enter">Зеленоград</h5>
                    
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
                <Map/>
                    
                
            </div>
        );
    }
}



export default (QuestDetails);
