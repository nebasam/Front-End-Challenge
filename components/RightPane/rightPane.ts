import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  submit: { width: 1, marginTop: "6px" },
  mainCont: {
    margin: "0.4rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  h5: {
    marginTop: 0,
    marginBottom: 0,
  },
  toggleButton: {
    backgroundColor: "#1877F2 !important",
  },
  link: {
    
    textDecoration: "none",
    fontSize: "0.9rem",
    color: "#1877F2",
  },
  p: {
    marginTop: 0,
    marginBottom: 0,
  },
  toggle: {
    margin: 4,
    padding: "0.7rem 2rem",
  },
}));

export { useStyles };
