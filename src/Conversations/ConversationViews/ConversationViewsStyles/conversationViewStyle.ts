import { Dimensions, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { alignItems, padding, position } from 'styled-system';
import { colorScheme, margins, paddings, sizesScheme } from '../../../globalStyles/constants';
import { windowHeight } from '../../../utility/getDimension';

interface IConversationTop {
    height: number;
}

export const ConversationScreen = styled.View`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: ${colorScheme.defaultColors.mainColor};
`;

export const PressableSettingButton = styled.Pressable`
    width: ${sizesScheme.InputBtn.default.height}px;
    height: ${sizesScheme.InputBtn.default.height}px;
    background-color: ${colorScheme.defaultColors.defaultBackgroundColor};
    margin: ${margins.deafaultMargins}px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 10;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
`;

export const ConversationTop = styled.View<IConversationTop>`
    position: relative;
    height: ${({ height }) => height}px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
`;

export const ConversationTopWrapper = styled.View<IConversationTop>`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: ${({ height }) => height - 170}px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const ConversationBottom = styled.View`
    background-color: ${colorScheme.menuColor.default};
    padding-bottom: ${paddings.smallPadding}px;
    border-top-width: 1px;
    border-top-color: ${colorScheme.formColors.mainColor};
    display: flex;
    flex-direction: column;
`;

export const ConversationContent = styled.View``;

export const ConversationViewStyle = StyleSheet.create({
    boxView: {
        flexDirection: 'column',
    },
    boxViewMessages: {
        zIndex: -1,
    },

    icon: {
        color: colorScheme.defaultColors.secColor,
    },
});
