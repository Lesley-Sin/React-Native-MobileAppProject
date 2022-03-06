import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colorScheme } from '../../globalStyles/constants';

const LoadingPlaceholder: React.FC = () => {
    return (
        <View style={{ opacity: 0.35, backgroundColor: '#383838', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, justifyContent: 'center'}} >
            <ActivityIndicator animating={true} size={50} color={colorScheme.defaultColors.defaultBackgroundColor} />
        </View>
    );
}

export default LoadingPlaceholder;