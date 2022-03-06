import { faBars, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { DrawerActions, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconButton, View } from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import { colorScheme, sizesScheme } from '../../../globalStyles/constants';
import { flexBoxRow } from '../../../globalStyles/flexBox';
import { StyledIconButton } from '../../Buttons/Button';
import { StyledFontAwasomeIcon } from '../../Icons/Icons';
import { StyledText } from '../../Typography/StyledTypography';

interface IPageHeader {
    title: string;
    headerRight?: JSX.Element;
    headerLeft?: JSX.Element;
    burger?: boolean;
    mediator?: IModulesMediator;
    navigation: StackNavigationProp<ParamListBase, string>;
}

const PageHeader: FC<IPageHeader> = ({ title, headerRight, headerLeft, navigation, burger = false, mediator }) => {
    async function burgerIconPressEvent(): Promise<void> {
        navigation.dispatch(DrawerActions.toggleDrawer());
        mediator && (await mediator.openNavigationDrawer());
    }

    const getHeaderLeft = () => {
        if (headerLeft) {
            return headerLeft;
        }
        if (burger) {
            return <StyledIconButton /* style={{ marginLeft: -margins.exSmallMargin }} */ icon={<StyledFontAwasomeIcon style={{ zIndex: -1 }} icon={faBars} />} pressed={async () => await burgerIconPressEvent()} />;
            // return <StyledIconButton /* style={{ marginLeft: -margins.exSmallMargin }} */ icon={<StyledFontAwasomeIcon icon={faBars} />} pressed={async () => await burgerIconPressEvent()} />;
        }
        return (
            <StyledIconButton
                hitSlop={{
                    bottom: 20,
                    left: 50,
                    right: 20,
                    top: 50,
                }}
                pressed={() => navigation.goBack()}
                icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faChevronLeft} />}
            />
        );
    };

    return (
        <View style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor }}>
            <SafeAreaView>
                <View style={[flexBoxRow.SpaceBetweenCenter, { height: sizesScheme.workspace.height, backgroundColor: colorScheme.defaultColors.defaultBackgroundColor, position: 'relative' }]}>
                    <View>{getHeaderLeft()}</View>
                    <View style={{ position: 'absolute', left: 0, right: 0, margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <StyledText textAlign={'center'}> {title}</StyledText>
                    </View>
                    {headerRight}
                </View>
            </SafeAreaView>
        </View>
    );
};

export default PageHeader;
