import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";
import CONSTANTS from "./constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.colors.primary,

    paddingVertical: getStatusBarHeight(),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",

    height: hp(45),
    paddingTop: 0,

    // backgroundColor: "blue",
  },
  image: {
    marginVertical: hp(2.5),
    height: hp(20),
    width: wp(65),
  },
  titleWrapper: {
    alignItems: "center",

    // backgroundColor: "red",
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",

    // backgroundColor: "green",
  },
  content: {
    flex: 1,
    alignItems: "center",

    // backgroundColor: "red",
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
    color: CONSTANTS.colors.black,
  },
  generateBtn: {
    width: 300,
    alignItems: "center",

    borderWidth: 0.5,
    borderRadius: 10,

    backgroundColor: CONSTANTS.colors.black,
  },
  generateTxt: {
    fontSize: 22,
    fontWeight: "500",

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

    backgroundColor: CONSTANTS.colors.secondary,
  },
  passwordTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: wp(2),
  },
  splash: {
    flex: 1,
    backgroundColor: CONSTANTS.colors.primary,
  },
});
