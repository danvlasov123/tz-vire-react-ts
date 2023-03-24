import { FC, Fragment, useEffect, useState } from "react";

import { useAppSelector } from "src/hooks/useStore";

import CardList from "src/components/CardList";

import { Container, Button, Grid, Typography } from "@mui/material";
import Loader from "src/components/Loader";
import ErrorPage from "src/views/pages/ErrorPage";

import AddIcon from "@mui/icons-material/Add";
import ModalDialog from "src/components/Modal";
import AddJokeForm, { IFormJoke } from "src/views/Forms/AddJokeForm";
import { useActions } from "src/hooks/useActions";

import { findMaxNumber } from "src/utils/findMaxNumber";
import { randomInteger } from "src/utils/randomInteger";

const MainPage: FC = (): JSX.Element => {
  const { addJokes, getJokes } = useActions();

  const { data, isLoading, error } = useAppSelector((state) => state.jokes);

  const [isOpenedModal, setIsOpened] = useState(false);

  const handleToggleModal = (): void => setIsOpened((prev) => !prev);

  const handleAddJoke = (values: IFormJoke): void => {
    const maxId = findMaxNumber(data, "id").id;

    const generateId = randomInteger(maxId, maxId * 1_000);

    const result = {
      ...values,
      id: generateId,
    };

    addJokes(result);

    handleToggleModal();
  };

  useEffect(() => {
    getJokes(0);
  }, []);

  if (isLoading) {
    return <Loader isPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <Fragment>
      <Container maxWidth="md">
        <Grid container pt={4} pb={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleToggleModal}
          >
            Add joke
          </Button>
        </Grid>
        {data.length ? (
          <CardList data={data} />
        ) : (
          <Grid item>
            <Typography mt={4} align="center">
              No jokes
            </Typography>
          </Grid>
        )}
      </Container>
      <ModalDialog
        open={isOpenedModal}
        onClose={handleToggleModal}
        title="Added joke"
      >
        <AddJokeForm
          onCloseModal={handleToggleModal}
          onSubmit={handleAddJoke}
        />
      </ModalDialog>
    </Fragment>
  );
};

export default MainPage;
