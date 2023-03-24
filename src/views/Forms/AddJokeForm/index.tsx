import { FC } from "react";

import { Box, Grid, TextField, Button, CircularProgress } from "@mui/material";

import { useFormik, FormikProps } from "formik";
import { validateAddJoke } from "src/helpers/formik";

interface IForm {
  onCloseModal?: () => void;
  onSubmit: (values: IFormJoke) => void;
}

export interface IFormJoke {
  setup: string;
  punchline: string;
  type: string;
}

const AddJokeForm: FC<IForm> = ({ onCloseModal, onSubmit }): JSX.Element => {
  const initialValues: IFormJoke = {
    setup: "",
    punchline: "",
    type: "",
  };

  const { values, touched, errors, handleChange, isSubmitting, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validateAddJoke,
      onSubmit: (values: IFormJoke, { setSubmitting }): void => {
        setSubmitting(true);
        onSubmit(values);
        setSubmitting(false);
      },
    });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="type"
            label="Type joke"
            name="type"
            autoComplete="type"
            required
            fullWidth
            value={values.type}
            onChange={handleChange}
            error={touched.type && !!errors.type}
            helperText={touched.type && errors.type}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-setup"
            name="setup"
            required
            fullWidth
            id="setup"
            label="Setup"
            value={values.setup}
            onChange={handleChange}
            error={touched.setup && !!errors.setup}
            helperText={touched.setup && errors.setup}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="punchline"
            label="Punchline"
            name="punchline"
            autoComplete="punchline"
            required
            fullWidth
            value={values.punchline}
            onChange={handleChange}
            error={touched.punchline && !!errors.punchline}
            helperText={touched.punchline && errors.punchline}
          />
        </Grid>
        {!!onCloseModal && (
          <Grid item xs={12} sm={6}>
            <Button onClick={onCloseModal} fullWidth variant="outlined">
              Cancel
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={!!onCloseModal ? 6 : 12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Add joke"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddJokeForm;
