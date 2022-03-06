import { Button, Text } from 'native-base';
import React, { FC } from 'react';
import { commonStyles } from '../../globalStyles/colors/colors';
import { colorScheme, fontScheme } from '../../globalStyles/constants';
import { IStyledText } from './interfaces';
import { styles } from './typographyStyles';

export const StyledText: FC<IStyledText> = ({ fontSize, fontWeight, color, themeColor, children }) => {
    return <Text style={[styles(fontSize, fontWeight).text, commonStyles.color(themeColor, color).common]}>{children}</Text>;
};

export const StyledMainTitle: FC<IStyledText> = ({ fontSize, fontWeight, color, themeColor, children }) => {
    return <Text style={[styles(fontSize, fontWeight).h1, commonStyles.color(themeColor, color).common]}>{children}</Text>;
};

export const StyledSecodaryTitle: FC<IStyledText> = ({ fontSize, fontWeight, color, themeColor, children }) => {
    return <Text style={[styles(fontSize, fontWeight).h2, commonStyles.color(themeColor, color).common]}>{children}</Text>;
};

export const StyledThirdTitle: FC<IStyledText> = ({ fontSize, fontWeight, color, themeColor, children }) => {
    return <Text style={[styles(fontSize, fontWeight).h3, commonStyles.color(themeColor, color).common]}>{children}</Text>;
};

export const StyledSmallText: FC<IStyledText> = ({ fontSize, fontWeight, color, themeColor, children }) => {
    return <Text style={[styles(fontSize, fontWeight).smallText, commonStyles.color(themeColor, color).common]}>{children}</Text>;
};

export const StyledExtraSmallText: FC<IStyledText> = (props) => {
    const { fontSize, fontWeight, color, themeColor, children } = props;
    return (
        <Text style={[styles(fontSize, fontWeight).extraSmallText, commonStyles.color(themeColor, color).common]} {...props}>
            {children}
        </Text>
    );
};
