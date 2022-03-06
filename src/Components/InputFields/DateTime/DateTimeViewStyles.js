import {
    StyleSheet
} from "react-native";
import styled from "styled-components/native";
import {
    colorScheme,
    paddings,
    radiusScheme
} from "../../../globalStyles/constants";



export const DataPicker = styled.View `
border-color:  ${({borderColor}) => borderColor ? borderColor : 'transparent'};
border-width: 1px;
border-style: solid;
border-radius: ${radiusScheme.defaultDegree}px;
justify-content: flex-start;
padding-left: ${paddings.defaultPaddings}px;
padding-right: ${paddings.defaultPaddings}px;
align-self: flex-start;
background-color: ${({backgroundColor}) => backgroundColor };
flex-direction: row;
`