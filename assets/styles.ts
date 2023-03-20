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
    fontSize: 33,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    letterSpacing: 0.7,

    // backgroundColor: "green",
  },
  content: {
    flex: 1,
    alignItems: "center",

    // backgroundColor: "red",
  },
  lenWrapper: {
    flexDirection: "row",
  },
  len: {
    fontSize: 21,
    letterSpacing: 0.2,
    marginRight: 5,
  },
  lenNum: {
    fontSize: 21,
    fontWeight: "700",
  },
  slider: {
    width: wp(50),
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 20,
  },
  checkBoxContainerTxt: {
    fontSize: 20,
    color: CONSTANTS.colors.black,
    letterSpacing: 0.1,
  },
  generateBtn: {
    width: wp(80),

    alignItems: "center",

    borderWidth: 0.5,
    borderRadius: 8,

    padding: 8,

    backgroundColor: CONSTANTS.colors.black,
  },
  generateTxt: {
    fontSize: 22,
    fontWeight: "500",

    color: "white",
    letterSpacing: 1,
  },
  passwordBtn: {
    width: wp(80),
    flexDirection: "row",
    justifyContent: "center",

    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,

    paddingVertical: 7,
    paddingLeft: 7,
    paddingRight: -10,

    marginTop: 20,
    marginBottom: 150,

    backgroundColor: CONSTANTS.colors.secondary,
  },
  passwordTxt: {
    fontSize: 21,
    fontWeight: "bold",
    marginRight: wp(2),
    letterSpacing: 0.2,
  },
  splash: {
    flex: 1,
    backgroundColor: CONSTANTS.colors.primary,
  },
  copiedMsg: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    bottom: hp(1),
    width: wp(80),

    paddingHorizontal: wp(1.5),
    paddingVertical: hp(2),
    borderRadius: 8,

    backgroundColor: "#323232",
  },
  copiedTxt: { fontSize: 16, color: "white", marginLeft: wp(1.5), letterSpacing: 0.27 },
});
