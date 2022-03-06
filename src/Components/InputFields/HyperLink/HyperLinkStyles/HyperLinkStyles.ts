import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { colorScheme, fontScheme, radiusScheme, sizesScheme } from '../../../../globalStyles/constants';
import { IHyperLinkInput } from './interfaces/IHyperLinkStyles';

export const HyperLinkBody = styled.View`
    flex: 1;
    flex-direction: row;
    border-width: 1px;
    border-radius: ${radiusScheme.defaultDegree}px;
    align-items: center;
    height: ${sizesScheme.InputBtn.default.height}px;
    background-color: ${colorScheme.defaultColors.mainColor};
    border-color: ${colorScheme.formColors.mainColor};
`;
export const HyperLinkInput = styled(TextInput)<IHyperLinkInput>`
    flex: 1;
    padding-right: 10px;
    margin-left: 10px;
    background-color: #fff;
    color: ${({ editable, validationError }) => (editable || validationError ? colorScheme.defaultColors.secColor : colorScheme.defaultColors.defaultBackgroundColor)};
    font-size: ${fontScheme.text.size}px;
`;
