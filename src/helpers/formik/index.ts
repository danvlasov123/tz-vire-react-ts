import * as yup from "yup";

const validateAddJoke = yup.object().shape({
  setup: yup.string().required("Required"),
  punchline: yup.string().required("Required"),
});

export { validateAddJoke };
