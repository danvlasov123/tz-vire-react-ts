import { Grid, Button } from "@mui/material";
import { FC, Fragment } from "react";
import JokeCard from "src/components/JokeCard";

import { IJokes } from "src/interfaces/jokes.interface";
import { useActions } from "src/hooks/useActions";
import { useAppSelector } from "src/hooks/useStore";

const CardList: FC<{ data: IJokes[] }> = ({ data }): JSX.Element => {
  const { getJokes } = useActions();
  const { quantity } = useAppSelector((state) => state.jokes);
  const handleClick = async () => {
    await getJokes(quantity + 10);
  };

  return (
    <Fragment>
      <Grid container spacing={4} py={4}>
        {data.map((joke) => (
          <JokeCard joke={joke} key={joke.id} />
        ))}
      </Grid>
      <Grid container pb={4}>
        <Grid item margin="0 auto">
          <Button onClick={handleClick} variant="outlined">
            LOAD MORE
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardList;
