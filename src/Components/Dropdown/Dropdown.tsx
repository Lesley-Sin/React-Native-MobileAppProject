import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useEffect } from 'react';
import { View, Animated, Pressable, GestureResponderEvent } from 'react-native';
import { IWithToggleAnimation } from '../../globalHooks/Animated/types';
import { interractAnimation } from '../../globalHooks/Animated/withAnimated';
import { colorScheme, fontScheme } from '../../globalStyles/constants';
import { translationArrowConfig } from '../../utility/arrowAnimationConfig';
import { StyledText } from '../Typography/StyledTypography';
import { DropDownHeaderStyles, DropDownStyles } from './DropdownStyles';
import { IDropDownType } from './enums/DropdownTypes';
import { IDropdownBody, IDropDownExtended, IDropdownHeader } from './interfaces/IDropdown';

export const DropDown: FC<IDropDownExtended> = ({ animated, pressedDropDown, isChevron, translationListConfig, title, checked, children, type, defaultIsOpen }) => {
    const [arrowTranslationStyles, rangeArrowNumber, toggleArrowTaranslationStyles] = interractAnimation(translationArrowConfig);

    const transformArrowStyle = {
        transform: [
            {
                rotate: arrowTranslationStyles,
            },
        ],
    };

    const [translationListStyles, rangeListNumber, toggleTaranslationListStyles] = interractAnimation(translationListConfig);

    useEffect(() => {
        if (defaultIsOpen) {
            pressedDropDown && pressedDropDown();
            toggleTaranslationListStyles();
            toggleArrowTaranslationStyles();
        }
    }, []);

    const transformListStyle = {
        maxHeight: translationListStyles,
    };

    const renderType = () => {
        switch (type) {
            case IDropDownType.header:
                return <DropdownHeader isChevron={isChevron} transformArrowStyle={transformArrowStyle} title={title} bottomBorders={checked} />;

            case IDropDownType.item:
                return <DropdownItem isChevron={isChevron} transformArrowStyle={transformArrowStyle} title={title} />;
        }
    };

    return (
        <Pressable
            style={{
                overflow: 'hidden',
            }}
            onPress={() => {
                pressedDropDown && pressedDropDown();
                toggleArrowTaranslationStyles();
                // setRangeIndex(rangeListNumber);
                toggleTaranslationListStyles();
            }}
        >
            {renderType()}
            {animated ? <Animated.View style={transformListStyle}>{children}</Animated.View> : !checked && <View>{children}</View>}
        </Pressable>
    );
};

export const DropdownHeader: FC<IDropdownHeader> = ({ children, bottomBorders, transformArrowStyle, isChevron, title }) => {
    return (
        <View style={[DropDownStyles.common, DropDownHeaderStyles(bottomBorders).header]}>
            <DropdownBody isChevron={isChevron} transformArrowStyle={transformArrowStyle} title={title} textColor={colorScheme.defaultColors.mainColor} iconColor={colorScheme.defaultColors.mainColor} />
        </View>
    );
};
export const DropdownItem: FC<IDropdownBody> = ({ children, transformArrowStyle, title, isChevron }) => {
    return (
        <View style={[DropDownStyles.common, DropDownStyles.item]}>
            <DropdownBody isChevron={isChevron} transformArrowStyle={transformArrowStyle} title={title} textColor={colorScheme.defaultColors.secColor} iconColor={colorScheme.defaultColors.secColor} />
        </View>
    );
};

const DropdownBody: FC<IDropdownBody> = ({ isChevron, transformArrowStyle, title, textColor, iconColor }) => {
    let chevronUi = <View />;
    if (isChevron) {
        chevronUi = (
            <Animated.View style={transformArrowStyle}>
                <FontAwesomeIcon icon={faChevronDown} size={fontScheme.text.size} color={iconColor} />
            </Animated.View>
        );
    }
    return (
        <>
            <StyledText color={textColor}>{title}</StyledText>
            {chevronUi}
        </>
    );
};
