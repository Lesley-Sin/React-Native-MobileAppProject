import { List } from 'native-base';
import React from 'react';
import { colorScheme } from '../../globalStyles/constants';
import { StyledSmallText } from '../Typography/StyledTypography';
import { IUnorderedList } from './interfaces/List';

export const UnorderedList = (props: IUnorderedList) => {
    const { listItems } = props;
    const renderListItems = () =>
        listItems.map((listItem, i) => (
            <List.Item key={i} _text={{ color: colorScheme.defaultColors.mainColor }}>
                <StyledSmallText>{listItem}</StyledSmallText>
            </List.Item>
        ));
    return <List.Unordered borderWidth={0}>{renderListItems()}</List.Unordered>;
};
