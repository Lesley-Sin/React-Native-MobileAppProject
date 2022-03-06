import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colorScheme, margins } from '../../../globalStyles/constants';
import { StyledSecodaryTitle, StyledSmallText, StyledText } from '../../../Components/Typography/StyledTypography';

export const MyProfileTitle = styled(StyledText)`
    color: ${colorScheme.defaultColors.secColor};
`;

export const Substitutions = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const SubstitutionsItem = styled.View`
    flex-direction: row;
    flex-basis: 50%;
    margin-top: ${margins.deafaultMargins};
`;

export const SubstitutionsRight = styled(SubstitutionsItem)`
    justify-content: flex-end;
`;

export const SubstitutionsLeft = styled(SubstitutionsItem)`
    justify-content: flex-start;
`;

export const SubstitutionsItemCenter = styled(SubstitutionsLeft)`
    align-items: center;
`;

export const SubstitutionsStatus = styled(SubstitutionsRight)`
    align-items: center;
`;
