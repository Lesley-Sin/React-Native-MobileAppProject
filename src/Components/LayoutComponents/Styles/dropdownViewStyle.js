import { StyleSheet } from "react-native";
import styled from 'styled-components/native';

export const DropdownViewStyle = StyleSheet.create({
    boxView: {
        backgroundColor: 'blue',
        height: 30,
        marginTop: 10
    },

    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },

    text: {
        color: 'white'
    }
});



export const ViewStyle = styled.View`
    margin-bottom: 5px;
    border-width: 1px;
    border-color: #0575bd;
    padding: 5px;
    display: ${props => props.displayView};
`;
