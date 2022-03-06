import { Modal } from 'native-base';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { colorScheme } from '../../../globalStyles/constants';

export const StyledModalContent = styled(Modal.Content)`
    background-color: ${colorScheme.defaultColors.mainColor};
`;

export const StyledModalHeader = styled(Modal.Header)`
    border-color: ${colorScheme.defaultColors.mainColor};
    padding-bottom: 0px;
`;

export const StyledModalBody = styled(Modal.Body)`
    max-height: 150px;
`;

export const StyledModalFooter = styled(Modal.Footer)`
    padding: 0px;
    background-color: ${colorScheme.defaultColors.mainColor};
`;
export const StyledModalFooterContent = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
