import React from 'react';
import { Pressable } from 'react-native';
import { DropdownItem } from '../../Components/Dropdown/Dropdown';
import { PageQuery } from '../../Components/Page/Interfaces/PageQuery';
import type { IRoleWorkspaceModel } from '../Interfaces/IRoleWorkspaceModel';

interface ITopNavigItemView {
    model: IRoleWorkspaceModel;
    onPress: (value: PageQuery) => void
};

export function TopNavigItemView({ model, onPress }: ITopNavigItemView) {
    const navigItemData = model.navigationItems[0];
    const pageQ = new PageQuery(navigItemData.container, navigItemData.target);

    function onPressEvent() {
        onPress(pageQ);
    };

    return (
        <Pressable onPress={() => onPressEvent()}>
            <DropdownItem title={model.name} />
        </Pressable>
    )
};