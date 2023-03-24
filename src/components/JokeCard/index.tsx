import { FC, memo } from "react";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

import { IJokes } from "src/interfaces/jokes.interface";

import s from "./index.module.scss";

import { useActions } from "src/hooks/useActions";

const JokeCard: FC<{ joke: IJokes }> = ({ joke, ...rest }): JSX.Element => {
  const { removeJokes, refreshJoke } = useActions();

  return (
    <Grid item xs={12} sm={6} md={4} {...rest}>
      <Card className={s.card} variant="outlined">
        <CardContent>
          <Grid
            container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item display="flex">
              <Typography fontWeight="600">Type:</Typography>
              <Typography color="primary" fontWeight="600">
                {joke.type}
              </Typography>
            </Grid>
            <Grid item display="flex">
              <Typography color="primary" fontWeight="600">
                ID #{joke.id}
              </Typography>
            </Grid>
          </Grid>
          <Grid mt={4}>
            <Typography fontWeight="600">Setup:</Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {joke.setup}
            </Typography>
          </Grid>
          <Grid mt={4}>
            <Typography fontWeight="600">Punchline:</Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {joke.punchline}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="text"
            onClick={() => removeJokes(joke.id)}
          >
            <Typography variant="body2" fontWeight="500">
              Delete
            </Typography>
          </Button>
          <Button
            size="small"
            variant="text"
            onClick={() => refreshJoke(joke.id)}
          >
            <Typography variant="body2" fontWeight="500">
              Refresh
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(JokeCard);
