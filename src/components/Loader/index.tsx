import { FC } from "react";
import { Grid, CircularProgress } from "@mui/material";

import clsx from "clsx";

import "./index.scss";

const Loader: FC<{ isPage: boolean }> = ({
  isPage = false,
  ...rest
}): JSX.Element => {
  const modifications = clsx("loader", {
    "loader--page": isPage,
  });

  return (
    <Grid className={modifications} {...rest}>
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
