import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const MarkdownStyle = StyleSheet.create({
    box: {
        // flex: 1
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: 'black'
    }, 
    preview: {
        width: '90%',
        height: 'auto',
        minHeight: 50
    }
});

export const ViewStyle = styled.View`
    flex: 1;
    display: ${props => props.previewState};
`;