import { faEllipsisH, faEllipsisHAlt } from '@fortawesome/pro-light-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { IModulesMediator } from '../../../AppMediator/Interfaces/IModulesMediator';
import { StyledIconButton } from '../../../Components/Buttons/Button';
import { StyledFontAwasomeIcon } from '../../../Components/Icons/Icons';
import PageHeader from '../../../Components/LayoutComponents/Views/PageHeader';
import ConversationView from '../../../Conversations/ConversationViews/ConversationView';
import { IConversationDAL } from '../../../Conversations/DataAccessLayer/IConversationDAL';
import { colorScheme } from '../../../globalStyles/constants';
import { flexBoxRow } from '../../../globalStyles/flexBox';

const Stack = createStackNavigator();

interface IConversationNavigator {
    conversationDAL: IConversationDAL;
    mediator: IModulesMediator;
}

const ConversationNavigator = ({ mediator, conversationDAL }: IConversationNavigator): JSX.Element => {
    const navigation = useNavigation();
    const headerRight = (
        <View style={flexBoxRow.default}>
            <StyledIconButton pressed={() => {}} icon={<StyledFontAwasomeIcon color={colorScheme.defaultColors.mainColor} icon={faEllipsisH} />} />
        </View>
    );

    return (
        <Stack.Navigator initialRouteName="ConversationNavigator">
            <Stack.Screen name={'ConversationNavigator'} options={{ header: ({ navigation }) => <PageHeader headerRight={headerRight} navigation={navigation} title={'чаты'} /> }}>
                {() => <ConversationView dataAccessLayer={conversationDAL} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default ConversationNavigator;
