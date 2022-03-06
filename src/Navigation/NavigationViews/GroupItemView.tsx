import React, { FC, Fragment, useEffect, useState } from 'react';
import { Easing, View } from 'react-native';
import { setChekedItemId } from '../../AppState/Navigation/NavigationSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { DropDown } from '../../Components/Dropdown/Dropdown';
import { IDropDownType } from '../../Components/Dropdown/enums/DropdownTypes';
import { IWithToggleAnimation } from '../../globalHooks/Animated/types';
import { IGroupItemProps } from '../Interfaces/IGroupItem';
import { NavigationItemModel } from '../Interfaces/NavigationItemModel';

const GroupItemView: FC<IGroupItemProps> = ({ id, title, children, getItems, getChildrenFor, dataAccessLayer, newItemClass }) => {
    const [model, setModel] = useState<NavigationItemModel[] | undefined>();
    const [checked, setChecked] = useState(false);
    const [rangeIndex, setRangeIndex] = useState(0);
    const { searchString, chekedItemId } = useReduxSelector((state) => state.Navigation);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (children === undefined) {
            setModel(getChildrenFor());
            getItems();
        }
    });

    function pressEvent() {
        setChecked(!checked);
        dispatch(setChekedItemId(id));
    }

    function setHighlight() {
        if (chekedItemId === id && checked) {
            return true;
        } else return false;
    }

    function RenderChildren() {
        if (children != undefined) {
            return children.map((item) => <Fragment key={item.id}>{new newItemClass(item, dataAccessLayer).onRender()}</Fragment>);
        }

        return model === undefined ? (
            <View />
        ) : (
            model.map((item) => {
                return <Fragment key={item.id}>{new newItemClass(item, dataAccessLayer).onRender()}</Fragment>;
            })
        );
    }

    const translationListConfig: IWithToggleAnimation = {
        duration: rangeIndex === 0 ? 600 : 350,
        nativeDriver: false,
        easing: Easing.linear,
        delay: 0,
        outPutRange: [0, 300],
    };

    return (
        <DropDown
            type={IDropDownType.item}
            isChevron={model && model[0] && true}
            title={title}
            translationListConfig={translationListConfig}
            checked={!checked}
            animated={false}
            pressedDropDown={() => {
                model === undefined ? () => {} : model[0] === undefined ? () => {} : pressEvent();
            }}
            children={RenderChildren()}
        />
        // <View>
        //   <StyledText color={colorScheme.defaultColors.secColor}>fdfsdf</StyledText>
        // </View>
    );
};

export default GroupItemView;
