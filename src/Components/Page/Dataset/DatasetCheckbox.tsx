import React from 'react';
import { Checkbox } from 'native-base';
import { View } from 'react-native';
import { AssociatedRowEventType } from './Enums/AssociatedRowEventType';

import type { IDatasetCheckboxProps } from './Interfaces/IDatasetCheckboxProps';
import { addRemoveModel } from './DatasetComponent';
import { StyledCheckBox } from '../../../Navigation/NavigationViews/OptionItem';

export function DatasetCheckbox({ index, emitter, id, onChange }: IDatasetCheckboxProps) {
    const [selected, setSelected] = React.useState<boolean>(false);

    React.useEffect(() => {
        emitter.addListener(`${AssociatedRowEventType.updateCheckbox}${index}`, (v: boolean) => setSelected(v));
        emitter.addListener(`${AssociatedRowEventType.updateAllCheckboxes}`, (v: boolean) => setSelected(v));
        return () => {
            emitter.removeListener(`${AssociatedRowEventType.updateCheckbox}${index}`, () => {});
            emitter.removeListener(`${AssociatedRowEventType.updateAllCheckboxes}`, () => {});
        };
    }, []);

    function pressEvent() {
        const mod: addRemoveModel = {
            id: id,
            value: !selected,
        };
        emitter.emit('change', mod);
        setSelected(!selected);
    }

    return (
        <>
            <StyledCheckBox accessibilityLabel="0" onChange={() => (onChange ? onChange(!selected) : pressEvent())} value={index!.toString()} isChecked={selected} defaultIsChecked={selected} />
        </>
    );
}
