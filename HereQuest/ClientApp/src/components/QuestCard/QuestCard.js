import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import {withRouter} from "react-router-dom";
import "./QuestCard.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        width: (window.screen.availWidth > 320) ? "340px" : "280px",
        maxWidth: 350,
        margin: "5px",
        zIndex: 0,
        display: "inline-block",
        borderRadius: "10px"
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: "white",
        backgroundColor: "#0095a8"
    },
    cardHeader: {
        "&:hover": {
            cursor: "pointer",
        },
    },
    message: {
        backgroundColor: "white",
        width: "95%",
        borderRadius: "10px",
        boxShadow: "0px 2px 2px #c2bebe",
        margin: "auto",
        paddingTop: "19px",
        paddingBottom: "10px",
        textAlign: "center",
    },
}));

function QuestCard(props) {
    //const imgPath = `images/${setIcon(props.vacancy.sphere)}.png`;
    const [isLiked, setIsLiked] = useState(false);
    const classes = useStyles();
    const likeIconRef = React.useRef(null);
    const messageRef = React.useRef(null);
    const [expanded, setExpanded] = React.useState(false);
    const [state, setState] = React.useState(null);
    const history = useHistory();
    const [flag, setFlag] = React.useState(true);
    const [quest, setQuest] = React.useState(null);
    const [imgPath, setPath] = React.useState("");
    const id = props.quest.id 
    
    useEffect(() => {
        
        axios
            .get(`https://js-here.firebaseio.com/quests/tourism/${props.quest.id}.json`)
            .then((response) => response.data)
            .then(
                (data) => {
                    setQuest(data)
                    setPath(data.img2)
                }
            );
        
    }, []);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMenuClose = () => {
        setState(null);
    };

    const renderOptions = (
        <Menu
            anchorEl={state}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            keepMounted
            id="primary-search-account-menu"
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={Boolean(state)}
            onClose={handleMenuClose}
        >
            <MenuItem>Удалить</MenuItem>
            <MenuItem>Редактировать</MenuItem>
        </Menu>
    );
    
    
    return (
        <>
            {flag === true ? (
                <>
                    <Card className={classes.root} id="card">

                        <img
                            src={imgPath}
                            onClick={() => history.push(`/quests/tourism/${id}`)}
                            style={{ height: "150px", width: "100%", objectFit: "cover" }} alt=""
                        />
                        <CardHeader
                            className={classes.cardHeader}
                            onClick={() => history.push(`/quests/tourism/${id}`)}
                            title={
                                <Typography variant="h6" component="p">
                                    {quest !== null ? quest.title : null}
                                </Typography>
                            }
                        />
                        <div
                            onClick={() => history.push(`/quests/tourism/${id}`)}
                            className="card-content"
                        >
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    Время: {quest !== null ? quest.time : null}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    Рейтинг: {quest !== null ? quest.rating : null} / 10
                                </Typography>
                            </CardContent>
                        </div>
                        <CardActions disableSpacing>

                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph></Typography>
                                <Typography paragraph>
                                    {quest !== null ? quest.description : null}
                                </Typography>
                            </CardContent>
                        </Collapse>
                        {renderOptions}
                    </Card>
                </>
            ) : null}
        </>
    );
}


export default withRouter(
    (QuestCard)
);

//<CardHeader
//    className={classes.cardHeader}
//    avatar={
//        <Avatar aria-label="recipe" className={classes.avatar}>
//            {quest !== null ? quest.city.slice(0, 1) : null}
//        </Avatar>
//    }
//    action={
//        <>
//            {props && props.pagePurpose === "profile" ? (
//                <IconButton aria-label="settings">
//                    <SettingsIcon />
//                </IconButton>
//            ) : null}
//        </>
//    }
//    title={
//        <Typography
//            onClick={() => history.push(`/quests/tourism/${id}`)}
//            variant="body2"
//            color="textSecondary"
//            component="p"
//        >
//            {quest !== null ? quest.city : null}
//        </Typography>
//    }
///>