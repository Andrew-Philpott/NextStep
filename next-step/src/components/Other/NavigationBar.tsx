import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import * as routes from "../../constants/route-constants";
import { makeStyles } from "@material-ui/core";
import { User } from "../../types/types";
import { useHistory } from "react-router-dom";

type Props = {
  user: User | null;
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const NavigationBar: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<Element | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={routes.ACCOUNT}>
        My account
      </MenuItem>
      <MenuItem
        onClick={function () {
          handleMenuClose();
          history.push("/login");
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to={routes.WORKOUTS_LIST}>
        Workouts
      </MenuItem>
      <MenuItem component={Link} to={routes.RECORDS_LIST}>
        Records
      </MenuItem>
      {user === null ? (
        <MenuItem component={Link} to={routes.LOG_IN}>
          Log in
        </MenuItem>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>Account</MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <AppBar className="blue-background" position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to={routes.LANDING} className="nav-link">
              NextStep Fitness
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography variant="h6">
              {user === null ? null : (
                <>
                  <Link className="nav-link" to={routes.WORKOUTS_LIST}>
                    Workouts
                  </Link>
                  <Link className="nav-link" to={routes.RECORDS_LIST}>
                    Records
                  </Link>
                </>
              )}
              {user === null ? (
                <Link className="nav-link" to={routes.LOG_IN}>
                  Log in
                </Link>
              ) : (
                <span
                  className="nav-link pointer"
                  onClick={handleProfileMenuOpen}
                >
                  Account
                </span>
              )}
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen}>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
