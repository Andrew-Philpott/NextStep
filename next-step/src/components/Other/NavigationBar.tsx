import React, { useState } from "react";
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

type Props = {
  user: User;
  onLogout: () => void;
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

export const NavigationBar: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { user, onLogout } = props;
  const [anchorEl, setAnchorEl] = useState<Element>();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Element>();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: Event) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(undefined);
  };

  const handleMenuClose = () => {
    setAnchorEl(undefined);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: Event) => {
    setMobileMoreAnchorEl(event.currentTarget as Element);
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
          onLogout();
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
      {user == null ? (
        <MenuItem component={Link} to={routes.LOG_IN}>
          Log in
        </MenuItem>
      ) : (
        <MenuItem onClick={() => handleProfileMenuOpen}>Account</MenuItem>
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
              {user == null ? null : (
                <>
                  <Link className="nav-link" to={routes.WORKOUTS_LIST}>
                    Workouts
                  </Link>
                  <Link className="nav-link" to={routes.RECORDS_LIST}>
                    Records
                  </Link>
                </>
              )}
              {user == null ? (
                <Link className="nav-link" to={routes.LOG_IN}>
                  Log in
                </Link>
              ) : (
                <button
                  className="nav-link pointer"
                  onClick={() => handleProfileMenuOpen}
                >
                  Account
                </button>
              )}
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={() => handleMobileMenuOpen}>
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
