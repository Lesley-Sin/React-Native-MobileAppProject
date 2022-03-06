import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { colorStyle } from 'styled-system';
import { useKeyboard } from '../../globalHooks/Keyboard/useKeyBoard';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { StyledSmallText } from '../Typography/StyledTypography';
import { footerStyles } from './AppFooterStyles';

interface IAppFooter {
    color?: string;
}

const AppFooter = ({ color = colorScheme.defaultColors.mainColor }: IAppFooter) => {
    const year = new Date().getFullYear();

    return (
        <View style={[flexBoxColumn.CenterCenter, footerStyles.content]}>
            <StyledSmallText color={color}>©{year}.</StyledSmallText>
            <StyledSmallText color={color}>Все права защищены.</StyledSmallText>
        </View>
    );
};

export default AppFooter;
