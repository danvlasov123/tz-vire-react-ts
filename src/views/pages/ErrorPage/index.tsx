import { FC } from "react";
import { Grid, Container, Typography } from "@mui/material";

const ErrorPage: FC<{ error: string }> = ({ error }): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        display="flex"
        height="100vh"
        flexDirection="column"
        justifyContent="center"
      >
        <Grid item>
          <Typography variant="h2" fontWeight="600">
            Oops, Error!
          </Typography>
        </Grid>
        <Grid item mt={2}>
          <Typography color="gray" variant="h5">
            {error}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
