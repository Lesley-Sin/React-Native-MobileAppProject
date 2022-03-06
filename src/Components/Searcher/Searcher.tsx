import { faSearch, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IInputProps, Input, View } from 'native-base';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { colorScheme, fontScheme, margins, radiusScheme, sizesScheme } from '../../globalStyles/constants';
import { StyledFontAwasomeIcon } from '../Icons/Icons';

interface ISearcher extends IInputProps {
    customValue?: string;
    clearField?: () => void;
}

const Searcher = (props: ISearcher) => {
    const searcher = StyleSheet.create({
        default: {
            height: sizesScheme.InputBtn.default.height,
            fontSize: fontScheme.text.size,
        },
    });
    const { customValue, onChangeText, clearField } = props;

    const initialSearchValue = customValue ? customValue : '';

    let times = <View />;
    if (customValue?.length) {
        times = (
            <Pressable onPress={clearField}>
                <StyledFontAwasomeIcon color={colorScheme.notificationColors.error} style={{ marginRight: margins.smallMargin }} icon={faTimes} />
            </Pressable>
        );
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: colorScheme.defaultColors.mainColor,
                    width: '100%',
                    borderRadius: radiusScheme.bigRadius,
                }}
            >
                <Input
                    style={searcher.default}
                    placeholder={'Поиск'}
                    p={0}
                    value={initialSearchValue}
                    onChangeText={onChangeText}
                    InputLeftElement={
                        <FontAwesomeIcon
                            style={{
                                marginLeft: margins.deafaultMargins,
                                marginRight: margins.exSmallMargin,
                                color: colorScheme.formColors.mainColor,
                            }}
                            icon={faSearch}
                            size={20}
                        />
                    }
                    InputRightElement={times}
                    {...props}
                />
            </View>
        </SafeAreaView>
    );
};

export default Searcher;
