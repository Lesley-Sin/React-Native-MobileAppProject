import { StyleSheet } from 'react-native';
import { colorScheme, fontScheme, sizesScheme } from '../../../globalStyles/constants';

export const headerScreenStyles = StyleSheet.create({
    header: { backgroundColor: colorScheme.defaultColors.defaultBackgroundColor, height: sizesScheme.workspace.height, borderWidth: 0, elevation: 0 },
    title: { color: colorScheme.defaultColors.mainColor, fontSize: fontScheme.text.size, fontWeight: fontScheme.text.weight },
});
