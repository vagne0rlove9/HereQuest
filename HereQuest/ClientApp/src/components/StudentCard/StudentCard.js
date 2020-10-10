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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useHistory} from "react-router-dom";
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
        //backgroundColor: '#001970',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    cardHeader: {
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

export default function StudentCard(props) {
    const classes = useStyles();
    //var imgPath = "images/" + setIcon(props.student.sphere) + ".png";
    let sphere;
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    if((props.student.sphere !== null) && (props.student.sphere !== undefined) && (props.student.sphere !== ""))
    {
        if(props.student.sphere.length > 20)
        {
            sphere = props.student.sphere.slice(0,16) + "...";
        }
        else sphere = props.student.sphere;
    }
    else sphere = "Сфера не указана";
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
                avatar={props.student.secondName !== null && props.student.secondName !== undefined ?
                    <Avatar aria-label="recipe"  className={classes.avatar}>
                    </Avatar>
                    : null
                }
                title={
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.student.secondName !== null && props.student.secondName !== undefined ? props.student.secondName + " "
                            : null}
                        {props.student.name !== null && props.student.name !== undefined ? props.student.name + " "
                            : null}
                        {props.student.thirdName !== null && props.student.thirdName !== undefined ? props.student.thirdName
                            : null}
                    </Typography>
                }
            />
            <CardHeader
                className={classes.cardHeader}
                onClick={() => history.push(`/students/${props.student.id}`)}
                title={
                    <Typography variant="h6" component="p">
                        {sphere}
                    </Typography>
                }
            />

            {/* <CardMedia
        className={classes.media}
        image="/public/images/cards/12.png"
        title="Paella dish"
      /> */}
            <div
                onClick={() => history.push(`/students/${props.student.id}`)}
                className="card-content"
            >
                <CardContent>
                    <Typography variant="body2" component="p">
                        Возраст: {props.student.age < 120 ? props.student.age : "Не указан"}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Город: {props.student.address || "Не указан"}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Тип занятости: {props.student.typeOfEmployment || "Не указан"}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        ВУЗ: {props.student.university}
                    </Typography>
                </CardContent>
            </div>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton> */}
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
                    <Typography paragraph>{props.student.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
