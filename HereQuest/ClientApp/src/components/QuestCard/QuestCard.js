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
        color: "black",
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
                    <div
                        className="messageAria"
                        id="message"
                        ref={messageRef}
                    >
                        <div className={classes.message}>
                            <h5>Вакансия добавлена в избранное!</h5>
                        </div>
                    </div>
                    <Card className={classes.root} id="card">
                        <CardHeader
                            className={classes.cardHeader}
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    З
                                </Avatar>
                            }
                            action={
                                <>
                                    { props && props.pagePurpose === "profile" ? (
                                        <IconButton aria-label="settings">
                                            <SettingsIcon/>
                                        </IconButton>
                                    ) : null}
                                </>
                            }
                            title={
                                <Typography
                                    onClick={() => history.push(`/quests`)}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Зеленоград
                                </Typography>
                            }
                        />
                        <CardHeader
                            className={classes.cardHeader}
                            onClick={() => history.push(`/quests`)}
                            title={
                                <Typography variant="h6" component="p">
                                    Узнай свой город
                                </Typography>
                            }
                        />
                        <div
                            onClick={() => history.push(`/quests`)}
                            className="card-content"
                        >
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    Время прохождения: 4 часа
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    Команда: 1 - 3 чел 
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
                                <Typography paragraph>{props.vacancy.description}</Typography>
                                <Typography paragraph>
                                    Описание
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
