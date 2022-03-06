import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { colorScheme, fontScheme, margins, paddings, radiusScheme, sizesScheme } from '../../../globalStyles/constants';

export const ReferenceWidgetInput = styled(Pressable)`
    border-width: 1px;
    border-color: ${colorScheme.formColors.mainColor};
    width: 100%;
    border-radius: ${radiusScheme.defaultDegree}px;
    height: ${sizesScheme.InputBtn.default.height}px;
`;
export const ReferenceWidgetInputChevron = styled.View`
    margin-left: ${margins.smallMargin};
`;

const absolutePosition = () => {
    return `position: absolute; top: -20px`;
};
export const ActionsheetCloseBtn = styled(Pressable)`
    left: ${margins.deafaultMargins};
    ${absolutePosition()}
`;

export const ActionsheetSubmitBtn = styled(Pressable)`
    right: ${margins.deafaultMargins};
    ${absolutePosition()}
`;

export const OptionCount = StyleSheet.create({
    styles: {
        backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
        padding: 2,
        paddingBottom: 1,
        height: 20,
    },
});

export const ActionsheetScrollView = styled(ScrollView)`
    max-height: 200px;
    margin-top: ${margins.deafaultMargins}px;
    margin-bottom: ${margins.exSmallMargin}px;
`;
export const ActionsheetBottom = styled.View`
    border-top-width: 1px;
    border-top-color: ${colorScheme.formColors.mainColor};
`;
export const ActionsheetBottomContent = styled.View`
    padding-vertical: ${paddings.bigPadings};
`;
