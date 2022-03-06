import React from 'react';
import { BackHandler, Platform, Text, View } from 'react-native';
import { Modal } from 'native-base';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { DefaultButton } from '../../Components/Buttons/Button';
import { Stack } from '../../Common/Models/Structures/Stack';
import { useReduxSelector } from '../../AppState/Store';
import { useNavigation } from '@react-navigation/native';

import type { IMainScreenViewProps } from '../Interfaces/IMainScreenViewProps';
import { DesktopPage } from '../../Components/Page/Interfaces/DesktopPage';
import { PageQuery } from '../../Components/Page/Interfaces/PageQuery';
import { IDatasetInfo } from '../../Components/Page/Models/IDatasetInfo';
import { Tabs } from '../../Components/Tabs/Tabs';
import { DataformWidgetsQuery, DataformWidgetsQueryResult } from '../../Components/Interfaces/DataformWidgetsQuery';
import LoadingPlaceholder from '../../Components/LoadindPlaceholder/LoadingPlaceholder';
import { PageComponent } from '../../Components/Page/PageComponent';

const MainScreenView: React.FC<IMainScreenViewProps> = ({ pageService, mediator, ucmdService }) => {

    return (
        <View>
            <Text>ТЕСТОВАЯ ВЕРСИЯ ПРИЛОЖЕНИЯ</Text>
        </ View>
    )
};

export default MainScreenView;
