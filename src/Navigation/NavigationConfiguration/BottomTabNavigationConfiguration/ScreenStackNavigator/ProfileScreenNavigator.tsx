import { faChevronLeft, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyledFontAwasomeIcon } from '../../../../Components/Icons/Icons';
import AppHeader from '../../../../Components/LayoutComponents/Views/AppHeader';
import PageHeader from '../../../../Components/LayoutComponents/Views/PageHeader';
import { colorScheme, fontScheme, sizesScheme } from '../../../../globalStyles/constants';
import Account, { IAccount } from '../../../../MyProfile/MyProfileViews/Account';
import MyProfileScreen from '../../../../MyProfile/MyProfileViews/MyProfileScreen';

const Stack = createStackNavigator();

const AccountScreenNavigator = ({ mediator, myProfileDAL }: IAccount): JSX.Element => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name={'MyProfileScreen'} options={{ header: ({ navigation }) => <PageHeader navigation={navigation} title={'Профиль'} /> }}>
                {() => <MyProfileScreen dataAccessLayer={myProfileDAL} />}
            </Stack.Screen>
            <Stack.Screen
                options={{
                    header: ({ navigation }) => <PageHeader navigation={navigation} burger mediator={mediator} title={'Учетная запись'} />,
                }}
                name={'Profile'}
            >
                {() => <Account mediator={mediator} myProfileDAL={myProfileDAL} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AccountScreenNavigator;
