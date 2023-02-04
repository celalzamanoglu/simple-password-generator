import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0e6",
    alignItems: "center",

    padding: 5,
    paddingTop: getStatusBarHeight(),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  lockIcon: {
    margin: 20,
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "500",
    fontStyle: "italic",

    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",

    marginBottom: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "#faf0e6",
    alignItems: "center",
  },
  len: {
    fontSize: 20,
  },
  slider: {
    width: 220,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 20,
  },
  checkBoxContainerTxt: {
    fontSize: 20,
  },
  generateBtn: {
    width: 300,
    alignItems: "center",

    borderWidth: 0.5,
    borderRadius: 10,

    backgroundColor: "black",
  },
  generateTxt: {
    fontSize: 22,

    padding: 5,

    color: "white",
  },
  passwordBtn: {
    width: 300,
    flexDirection: "row",
    justifyContent: "center",

    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,

    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: -10,

    marginTop: 20,
    marginBottom: 150,

    backgroundColor: "#faebd7",
  },
  passwordTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  copyIcon: {},
});
