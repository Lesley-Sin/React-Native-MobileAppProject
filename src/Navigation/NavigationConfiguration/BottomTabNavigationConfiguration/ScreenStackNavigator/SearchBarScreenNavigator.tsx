import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IModulesMediator } from '../../../../AppMediator/Interfaces/IModulesMediator';
import PageHeader from '../../../../Components/LayoutComponents/Views/PageHeader';
import { ISearchDAL } from '../../../../Search/Interfaces/ISearchDAL';
import { SearchBar } from '../../../../Search/Views/SearchBar';

interface ISearchScreenNavigator {
    mediator: IModulesMediator;
    searchDAL: ISearchDAL;
}

const SearchBarScreenNavigator = ({ mediator, searchDAL }: ISearchScreenNavigator) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: true, header: ({ navigation }) => <PageHeader navigation={navigation} burger mediator={mediator} title={'Поиск в системе'} /> }} name={'Profile'}>
                {() => <SearchBar dataAccessLayer={searchDAL} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default SearchBarScreenNavigator;
