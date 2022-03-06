import React, { FC, Fragment, useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { setChekedItemId } from '../../AppState/Navigation/NavigationSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { DropDown } from '../../Components/Dropdown/Dropdown';
import { IDropDownType } from '../../Components/Dropdown/enums/DropdownTypes';
import { IWithToggleAnimation } from '../../globalHooks/Animated/types';
import { INavigationDAL } from '../DataAccessLayer/INavigationDAL';
import { getShortTitle } from '../helpers/getShortTitle';
import { NavigationItemModel } from '../Interfaces/NavigationItemModel';
import { NavigationItemConstructor } from './NavigationItemConstructor';

// import { IWithToggleAnimation } from '../../customHooks/withAnimations/types';
// import { interractAnimation } from '../../customHooks/withAnimations/Animations';
interface IWorkspaceItemView {
    id: string;
    title: string;
    children: NavigationItemModel[];
    fetchChildren: () => void;
    dataAccessLayer: INavigationDAL;
}

const WorkspaceItemView: FC<IWorkspaceItemView> = ({ id, title, children, fetchChildren, dataAccessLayer }) => {
    const [checked, setChecked] = useState(false);
    const [model, setModel] = useState<NavigationItemModel[]>();
    const [rangeIndex, setRangeIndex] = useState(0);
    const [outputValue, setOutputValue] = useState(45);
    const { searchString, chekedItemId } = useReduxSelector((state) => state.Navigation);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        setModel(children);
        fetchChildren();
    }, [checked, searchString]);

    function PressEvent() {
        setChecked(!checked);
        dispatch(setChekedItemId(id));
        setOutputValue(90);
    }

    function renderChildren() {
        return model === undefined ? (
            <View />
        ) : (
            model.map((item) => {
                return <Fragment key={item.id}>{new NavigationItemConstructor(item, dataAccessLayer).onRender()}</Fragment>;
            })
        );
    }

    const titleUI = getShortTitle(title);

    const translationListConfig: IWithToggleAnimation = {
        duration: /* rangeIndex === 0 ? 900 : */ 0,
        nativeDriver: false,
        easing: Easing.linear,
        delay: 0,
        outPutRange: [0, outputValue],
    };

    return (
        <DropDown
            type={IDropDownType.header}
            isChevron={children[0] && true}
            title={titleUI}
            translationListConfig={translationListConfig}
            checked={!checked}
            animated={false}
            pressedDropDown={() => {
                children[0] === undefined ? () => {} : PressEvent();
            }}
            children={renderChildren()}
            defaultIsOpen={true}
        />
    );
};

export default WorkspaceItemView;
