import { StyleSheet } from 'react-native';
import { colorScheme, radiusScheme } from '../../../globalStyles/constants';

export const AlertStyles = StyleSheet.create({
    box: {
        borderRadius: radiusScheme.bigRadius,
        borderWidth: 0,
    },
    error: {
        backgroundColor: colorScheme.notificationColors.error,
    },
    success: {
        backgroundColor: colorScheme.notificationColors.success,
    },
});
