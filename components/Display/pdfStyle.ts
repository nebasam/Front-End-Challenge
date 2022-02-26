import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  mainContainer: {
    margin: "1rem",
    flex: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  minContainer: {
    padding: "0.5rem",
    margin: "1rem",
  },
  img: {
    alignItem: "center",
    justifyContent: "center",
    width: 100,
    height: 100
  },
}));

export { useStyles };
