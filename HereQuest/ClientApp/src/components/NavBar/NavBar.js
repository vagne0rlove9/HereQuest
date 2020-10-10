import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "./NavBar.css";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  navbarBackgroundColor: {
    backgroundColor: 'rgb(20, 102, 202)'
    // backgroundColor: "#001970", //theme.palette.primary.dark
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    color: "white",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    paddingLeft: "8px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 123,
      "&:focus": {
        width: 200,
      },
    },
  },
  sectionMobile: {
    color: "white",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    color: "white",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    profileMenuAnchorEl: null,
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleProfileMenuOpen = (event) => {
    this.setState({ profileMenuAnchorEl: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ profileMenuAnchorEl: null });
  };

  goToSearchPage = (e) => {
    e.preventDefault();
    if (e.target.id === "desktop") {
      //this.props.onSearch(document.getElementById("search-str-desktop").value);
      //this.props.history.push("/searchvac/" + this.props.term);
    }
    if (e.target.id === "mobile") {
      //this.props.onSearch(document.getElementById("search-str-mobile").value);
      //this.props.history.push("/searchvac/" + this.props.term);
    }
  };
  handleClickHomePage = (e) => {
    this.handleMenuClose();
    this.props.history.push("/");
  };
  handleClickEnterPage = (e) => {
    this.handleMenuClose();
    this.signInRedirect();
  };
  handleGoToProfile = (e) => {
    this.handleProfileMenuClose();
    this.handleMenuClose();
    // if (this.props.user.profile.role === "Student")
    //   this.props.history.push("/profile")
    //   else
    //   this.props.history.push('/companyProfile')
  };
  render() {
    const { anchorEl, mobileMoreAnchorEl, profileMenuAnchorEl } = this.state;
    const { classes } = this.props;
    const renderProfileOptions = (
      <Menu
        anchorEl={profileMenuAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        id="primary-search-account-menu"
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(profileMenuAnchorEl)}
        onClose={this.handleProfileMenuClose}
      >
        <MenuItem onClick={this.handleGoToProfile}>Профиль</MenuItem>
        <MenuItem >Выйти</MenuItem>
      </Menu>
    );
    const renderProfileButton = (
      <div className={classes.sectionDesktop}>
        {!this.props.user ? (
          <div className="signInBtn" onClick={this.signInRedirect}>
            Войти
          </div>
        ) : (
          <AccountCircle
            className="account-circle"
            onClick={this.handleProfileMenuOpen}
          ></AccountCircle>
        )}
      </div>
    );
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleClickHomePage}>Главная</MenuItem>
        {!this.props.user ? (
          <MenuItem onClick={this.handleClickEnterPage}>Войти</MenuItem>
        ) : (
          <>
            <MenuItem onClick={this.handleGoToProfile}>Профиль</MenuItem>
            <MenuItem>Выйти</MenuItem>
          </>
        )}
      </Menu>
    );
    return (
      <div className={classes.root} id="NavBar">
        <AppBar className="navbar-background" position="fixed">
          <Toolbar>
            {/* <div className={classes.sectionDesktop}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="account of current user"
                aria-controls={this.menuId}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div> */}
            <Typography
              className={classes.title}
              variant="h6"
              onClick={this.handleClickHomePage}
              noWrap
            >
              MayDay
            </Typography>
            <div className={classes.sectionDesktop}>
              <form
                className="form-inline"
                id="desktop"
                onSubmit={this.goToSearchPage}
              >
                <div className={classes.search}>
                  <InputBase
                    placeholder="Поиск квестов"
                    id="search-str-desktop"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                <button className="button-search" type="submit">
                  Поиск
                </button>
              </form>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                aria-label="show more"
                aria-controls={this.mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <form
                className="form-inline"
                id="mobile"
                onSubmit={this.goToSearchPage}
              >
                <div className={classes.search}>
                  <InputBase
                    placeholder="Поиск вакансий"
                    id="search-str-mobile"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </form>
            </div>
            {renderProfileButton}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderProfileOptions}
      </div>
    );
  }
}



export default withRouter(
  withStyles(styles)(NavBar)
);
