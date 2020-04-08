import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import InStockLogo from "../App/images/inStockLogo";
import OutOfStockLogo from "../App/images/outOfStockLogo";

import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Badge from "@material-ui/core/Badge";

import RoomIcon from "@material-ui/icons/Room";
import NotListedLocationOutlinedIcon from "@material-ui/icons/NotListedLocationOutlined";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { red, green } from "@material-ui/core/colors";
import Reports from "./Reports";
import { createApolloFetch } from "apollo-fetch";

import { useDispatch } from "redux-react-hook";
import * as actions from "../../constants/action_types";

const client = createApolloFetch({
  uri: "http://localhost:8080/graphql",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          close
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const MapMarker = ({ marker }) => {
  // use useQuery here to fetch marker data based on search term
  // console.log("location info", marker);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInStock = (marker) => {
    // console.log(marker)
    const now = new Date().toISOString();
    // console.log('its time', now)
    client({
      query: `mutation createReport($googleId: String!, $placeName: String!, $dateTime: DateTime){
        addReport(itemName: "toilet paper", status: "inStock", googleId: $googleId, placeName: $placeName, dateTime: $dateTime){
          id
          itemName
          status
          placeId
          googleId
          dateTime
        
        }
      }`,
      variables: {
        googleId: `${marker.id}`,
        placeName: `${marker.name}`,
        dateTime: now,
      },
    }).then((res) => {
      // console.log('added a report', res)
      // addReportToMarker(res)
      const add = (res) => {
        dispatch({ type: actions.ADD_REPORT, report: res, marker });
      };
      add(res);
    });
  };
  const handleOutOfStock = (marker) => {
    // console.log(marker)
    client({
      query: `mutation createReport($googleId: String!, $placeName: String!){
        addReport(itemName: "toilet paper", status: "outOfStock", googleId: $googleId, placeName: $placeName){
          id
          itemName
          status
          placeId
          googleId
          dateTime
          
        }
      }`,
      variables: { googleId: `${marker.id}`, placeName: `${marker.name}` },
    }).then((res) => {
      // console.log('added a report', res)
      // addReportToMarker(res)
      const add = (res) => {
        dispatch({ type: actions.ADD_REPORT, report: res, marker });
      };
      add(res);
    });
  };

  const determineInStock = (marker) => {
    // console.log(marker)
    const sortedReports = !marker.reports
      ? false
      : marker.reports.sort(function compare(a, b) {
          var dateA = new Date(a.dateTime);
          var dateB = new Date(b.dateTime);
          return dateB - dateA;
        });

    const latestReport = sortedReports[0];

    const status = !marker.reports ? "noReports" : sortedReports[0].status;

    // console.log(status)
    if (status === "outOfStock") {
      return <OutOfStockLogo />;
    } else if (status === "inStock") {
      return <InStockLogo />;
    } else if (status === "noReports") {
      return <NotListedLocationIcon fontSize="large" />;
    }
  };

  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 12,
      height: 12,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }))(Avatar);

  return (
    <div>
      <Button onClick={handleClickOpen} transitioncompoonent={Transition}>
        <div className="marker-container">
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            badgeContent={
              <Chip variant="outlined" size="small" label={marker.name} />
            }
          >
            {determineInStock(marker)}
          </Badge>
        </div>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {marker.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Latest Reports
          </Typography>
          {/* Display report count?*/}
          <Reports marker={marker} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleInStock(marker)}
            color="primary"
          >
            <ShoppingCartIcon style={{ color: green[500] }} />
            Report: This place has TP!
          </Button>
          <Button
            autoFocus
            onClick={() => handleOutOfStock(marker)}
            color="secondary"
          >
            <RemoveShoppingCartIcon style={{ color: red[500] }} />
            Report: This place doesn't have TP!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapMarker;
