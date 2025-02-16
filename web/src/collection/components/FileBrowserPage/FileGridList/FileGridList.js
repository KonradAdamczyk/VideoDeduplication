import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { composition } from "./composition";
import FileGridListItem from "./FileGridListItem";
import FileGridListLoadTrigger from "./FileGridListLoadTrigger";

function items(breakpoint, dense) {
  const decrease = dense ? 1 : 0;
  return composition[breakpoint] - decrease;
}

const useStyles = makeStyles((theme) => ({
  gridList: {
    [theme.breakpoints.only("xs")]: {
      minWidth: ({ dense }) =>
        theme.dimensions.gridItem.width * items("xs", dense),
    },
    [theme.breakpoints.only("sm")]: {
      minWidth: ({ dense }) =>
        theme.dimensions.gridItem.width * items("sm", dense),
    },
    [theme.breakpoints.only("md")]: {
      minWidth: ({ dense }) =>
        theme.dimensions.gridItem.width * items("md", dense),
    },
    [theme.breakpoints.only("lg")]: {
      minWidth: ({ dense }) =>
        theme.dimensions.gridItem.width * items("lg", dense),
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: ({ dense }) =>
        theme.dimensions.gridItem.width * items("xl", dense),
    },
  },
}));

function FileGridList(props) {
  const { children, dense = false, className } = props;
  const classes = useStyles({ dense });
  return (
    <Grid container spacing={5} className={clsx(classes.gridList, className)}>
      {children}
    </Grid>
  );
}

FileGridList.propTypes = {
  dense: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

// Access item type from container type.
FileGridList.Item = FileGridListItem;

// Access loading trigger from container type
FileGridList.LoadTrigger = FileGridListLoadTrigger;

export default FileGridList;
