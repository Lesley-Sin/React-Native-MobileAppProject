import styled from 'styled-components/native';
import { colorScheme, margins, paddings } from './constants';
import { IContainer, ISeparator } from './interfaces/index';

export const Container = styled.View<IContainer>`
    margin: auto;
    max-width: 1200px;
    width: 100%;
    padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')}px;
    padding-bottom: ${({ paddingBottom }) => (paddingBottom ? paddingBottom : '0')}px;
    padding-left: ${({ paddingLeft = paddings.defaultPaddings }) => (paddingLeft >= 0 ? paddingLeft : paddings.defaultPaddings)}px;
    padding-right: ${({ paddingRight = paddings.defaultPaddings }) => (paddingRight >= 0 ? paddingRight : paddings.defaultPaddings)}px;
`;

export const WtihExSmallMargin = styled.View`
    margin-top: ${margins.exSmallMargin}px;
`;

export const WithTopSmallMg = styled.View`
    margin-top: ${margins.smallMargin}px;
`;

export const WithTopDefMg = styled.View`
    margin-top: ${margins.deafaultMargins}px;
`;

export const WithTopBigMg = styled.View`
    margin-top: ${margins.largeMargin}px;
`;

export const WithTopExtraMg = styled.View`
    margin-top: ${margins.extraMargin}px;
`;

export const WtihBottomExSmallMargin = styled.View`
    margin-bottom: ${margins.exSmallMargin}px;
`;

export const WithBottomSmallMg = styled.View`
    margin-bottom: ${margins.smallMargin}px;
`;

export const WitрBottomDefMg = styled.View`
    margin-bottom: ${margins.deafaultMargins}px;
`;

export const WithBottomBigMg = styled.View`
    margin-bottom: ${margins.largeMargin}px;
`;

export const WithBottomExtraMg = styled.View`
    margin-bottom: ${margins.extraMargin}px;
`;

export const WithBottomMg = styled.View`
    margin-bottom: ${margins.deafaultMargins}px;
`;

export const Separator = styled.View<ISeparator>`
    background-color: ${colorScheme.formColors.mainColor};
    height: 1px;
    margin-left: ${({ marginLeft = margins.deafaultMargins }) => (marginLeft >= 0 ? marginLeft : margins.deafaultMargins)}px;
`;

export const WithShadow = styled.View`
shadow-color: #000;
shadow-offset: {width: 0px, height: 0px};
shadow-opacity: 0.16;
shadow-radius: 6;
elevation: 1;
width: 100%;
height: 35px;
`;
