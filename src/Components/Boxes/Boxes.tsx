import React, { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Container } from '../../globalStyles';
import { colorScheme, margins, paddings, radiusScheme } from '../../globalStyles/constants';
import { IContainer } from '../../globalStyles/interfaces';

interface IDefaultCard extends IContainer {
    height?: boolean;
}

interface IWithCircle {
    backgroundColor?: string;
}

export const MenuContainer: FC = ({ children }) => {
    const BoxStyles = StyleSheet.create({
        content: {
            padding: paddings.defaultPaddings,
            backgroundColor: colorScheme.menuColor.default,
            borderRadius: radiusScheme.bigRadius,
        },
    });
    return <View style={BoxStyles.content}>{children}</View>;
};

export const DefaultCard: FC<IDefaultCard> = ({ children, height, paddingLeft = paddings.defaultPaddings, paddingRight = paddings.defaultPaddings, paddingBottom = paddings.defaultPaddings, paddingTop = paddings.defaultPaddings }) => {
    const BoxStyles = StyleSheet.create({
        content: {
            height: height ? 'auto' : '100%',
            overflow: 'hidden',
            paddingLeft: paddingLeft >= 0 ? paddingLeft : paddings.defaultPaddings,
            paddingRight: paddingRight >= 0 ? paddingRight : paddings.defaultPaddings,
            paddingTop: paddingTop >= 0 ? paddingTop : paddings.defaultPaddings,
            paddingBottom: paddingBottom >= 0 ? paddingBottom : paddings.defaultPaddings,
            backgroundColor: colorScheme.defaultColors.mainColor,
            borderRadius: radiusScheme.bigRadius,
        },
    });

    return <View style={BoxStyles.content}>{children}</View>;
};

export const ScrollViewWithoutBounce: FC<ScrollViewProps> = (props) => {
    const { children } = props;

    return (
        <ScrollView {...props} alwaysBounceVertical={false}>
            {children}
        </ScrollView>
    );
};

export const WithShadowBox: FC = ({ children }) => {
    return (
        <Shadow
            startColor={'#0001'}
            radius={{ default: radiusScheme.defaultDegree }}
            viewStyle={{
                width: '100%',
            }}
            distance={6}
        >
            {children}
        </Shadow>
    );
};

export const WithCircle: FC<IWithCircle> = ({ children, backgroundColor = colorScheme.defaultColors.defaultBackgroundColor }) => {
    return <View style={{ borderRadius: 100, backgroundColor: backgroundColor, padding: margins.exSmallMargin, display: 'flex', alignSelf: 'flex-start', justifyContent: 'flex-start' }}>{children}</View>;
};
