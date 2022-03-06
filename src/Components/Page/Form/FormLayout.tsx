import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { DefaultButton } from '../../Buttons/Button';
import { BaseComponent } from '../../Interfaces/BaseComponent';
import { GroupPanel } from '../../Interfaces/LayoutComponent';
import { GroupPanelView } from '../../LayoutComponents/Views/GroupPanelView';
import { VerticalLayoutView } from '../../LayoutComponents/Views/VerticalLayoutView';
import { ScrollNavigation } from '../../ScrollNavigation/ScrollNavigation';
import Searcher from '../../Searcher/Searcher';

interface IModalLayout {
    toolbar: JSX.Element;
    root: VerticalLayoutView;
}

interface IFormLayout extends IModalLayout {
    formAreasView: [string[], JSX.Element[]];
    navigateToObjectConversation(): void;
}

export const FormLayout: FC<IFormLayout> = ({ toolbar, formAreasView, navigateToObjectConversation, root }) => {
    const [formAreaText, setFormAreaText] = useState<string[]>([]);
    const [formAreasViewUI, setFormAreasViewUI] = useState<[string[], JSX.Element[]]>(formAreasView);

    const toolbarUI = <>{toolbar != undefined ? toolbar : <View />}</>;

    return (
        <>
            {/* <DefaultButton onPress={navigateToObjectConversation}>go to conv</DefaultButton> */}
            <ScrollNavigation tabsItems={formAreasViewUI[0]} scrollItems={formAreasViewUI[1]} toolbar={toolbarUI} />
        </>
    );
};

export const FormModalLayout: FC<IModalLayout> = ({ toolbar, root }) => <>{[toolbar != undefined ? toolbar : <View />, root.create()]}</>;
