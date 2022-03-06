import { FormControl, Select } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { radiusScheme } from '../../../../globalStyles/constants';
import { PickerVariables } from '../Enums/PickerVariables';
import { IPickerSelector } from '../Interfaces/IPickerSelector';
import { PickerItem } from './PickerItem';

export function PickerComponent<T>({ items, value, isRequired, isReadOnly, isDisabled, handler }: IPickerSelector<T>) {
    return (
        <FormControl isRequired={isRequired} isReadOnly={isReadOnly} isDisabled={isDisabled}>
            <Select
                variant="rounded"
                selectedValue={value}
                borderRadius={radiusScheme.defaultDegree}
                placeholder={value}
                placeholderTextColor={PickerVariables.placeholderTextColor}
                onValueChange={(value) => handler(value)}
            >
                {items != undefined ? items.map((item) => <PickerItem key={item.id} item={item} />) : <View />}
            </Select>
        </FormControl>
    );
}
