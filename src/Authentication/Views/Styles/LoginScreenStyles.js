import {
  StyleSheet
} from "react-native";
import styled from "styled-components/native";
import {
  colorScheme,
  fontScheme,
  paddings,
  radiusScheme
} from "../../../globalStyles/constants";

export const LoginScreenStyles = StyleSheet.create({
  mainPage: {
    height: "100%",
    paddingTop: 70,
    paddingLeft: paddings.defaultPaddings,
    paddingRight: paddings.deafaultPaddings,
    backgroundColor: colorScheme.defaultColors.mainColor,
    borderRadius: radiusScheme.defaultDegree
  },


  imageField: {
    alignSelf: "center",
    marginBottom: 40,

  },

  protBox: {
    height: 45,
  },

  selectField: {
    paddingLeft: 10,
  },

  alertField: {
    height: 50,
    marginBottom: 100,
  }
});


export const FieldText = styled.Text`
  font-size: ${fontScheme.text.size}px;
  margin: 10px 5px;
  color: black;
`;