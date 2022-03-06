import { AddIcon, ArrowUpIcon, Checkbox, CheckIcon, ICheckboxProps, Icon, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { colorScheme, margins } from '../../globalStyles/constants';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IOptions extends ICheckboxProps {
    arr?: string[];
    title?: string;
    id?: string;
    changed?: ((isSelected: boolean) => void) | undefined;
}

export const StyledCheckBox = (props: IOptions) => {
    const { id, title, arr, changed } = props;
    const [value, setValue] = useState<boolean>(true);
    if (arr && id) {
        if (value) {
            arr.push(id);
        } else {
            let index = arr.indexOf(id);
            index && arr.splice(index, 1);
        }
    }
    return (
        <Checkbox
            onChange={() => {
                setValue(!value);
                changed && changed;
            }}
            accessibilityLabel="1"
            style={{ alignSelf: 'flex-start' }}
            icon={<Icon as={MaterialCommunityIcons} name="check" opacity={1} />}
            defaultIsChecked={true}
            {...props}
        >
            {title && (
                <View style={{ width: '90%', paddingLeft: margins.deafaultMargins }}>
                    <StyledText color={colorScheme.defaultColors.secColor}>{title}</StyledText>
                </View>
            )}
        </Checkbox>
    );
};
