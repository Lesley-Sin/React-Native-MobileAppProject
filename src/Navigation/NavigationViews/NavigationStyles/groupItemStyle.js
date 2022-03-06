import styled from "styled-components/native";


export const FieldItem = styled.View`
background-color: ${props => props.checked ? "#ffffff" : "#f5f5f5"};
height: 45px;
flex-direction: row;
align-items: center;
padding: 10px;
`;

