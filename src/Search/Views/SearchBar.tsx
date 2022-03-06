import { Divider } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useReduxSelector } from '../../AppState/Store';
import Searcher from '../../Components/Searcher/Searcher';
import { Tabs } from '../../Components/Tabs/Tabs';
import { StyledText } from '../../Components/Typography/StyledTypography';
import { useSearcher } from '../../globalHooks/Searccher/useSearcher';
import { Container, WithBottomBigMg, WithBottomMg, WithTopDefMg, WithTopExtraMg } from '../../globalStyles';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxColumn, flexBoxRow } from '../../globalStyles/flexBox';
import { StyledCheckBox } from '../../Navigation/NavigationViews/OptionItem';
import { SearchFilter } from '../DataAccessLayer/SearchFilter';
import { ISearchBarProps } from '../Interfaces/ISearchBarProps';
import { SearchResult } from './SearchResult';

/**
 * @SearchBar
 * Functional component provides handle user events and render view of search widget
 *
 * @param dataAccessLayer implementation of ISearchDAL passed with props
 *
 * @returns JSX.Element
 */
export const SearchBar = ({ dataAccessLayer }: ISearchBarProps): JSX.Element => {
    const filter = new SearchFilter();
    const DAL = dataAccessLayer;
    const { model } = useReduxSelector((state) => state.Search);
    const [searchInDocument, setSearchInDocument] = useState<boolean>(true);
    const [searchInFile, setSearchInFile] = useState<boolean>(true);
    const [searchInConversation, setSearchInConversation] = useState<boolean>(true);
    const { setField, value } = useSearcher();

    /**
     * @editFilter
     * Function whos set data to SearchFilter properties
     *
     * @param text string value for filter searchString property
     */
    function editFilter(text: string): void {
        filter.SearchString = text;
        filter.ShowRecord = searchInDocument;
        filter.ShowAttachment = searchInFile;
        filter.ShowAttachmentName = searchInConversation;
    }

    /**
     * @renderSearchResults
     * Function for render search result, if its model != undefined
     *
     * @returns JSX.Element | JSX.Element[][][]
     *
     */
    function renderSearchResults(): JSX.Element | JSX.Element[][][] {
        if (model === undefined) {
            return (
                <WithTopExtraMg style={flexBoxRow.CenterCenter}>
                    <StyledText color={colorScheme.defaultColors.greyoutColor}>No search results</StyledText>
                </WithTopExtraMg>
            );
        } else {
            return new SearchResult(model.templates, dataAccessLayer).render();
        }
    }

    /**
     * @applySearchFilter
     * Function for apply filter changes and invoke search method
     *
     * @param text string value for filter searchString property
     */
    async function applySearchFilter(text: string): Promise<void> {
        setField(text);
        editFilter(text);
        await DAL.search(filter);
    }

    return (
        <ScrollView style={{ backgroundColor: colorScheme.defaultColors.mainColor }} stickyHeaderIndices={[0]}>
            <View style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor }}>
                <Container>
                    <WithTopDefMg>
                        <Searcher
                            customValue={value}
                            clearField={async () => {
                                await applySearchFilter('');
                            }}
                            onChangeText={async (text) => {
                                await applySearchFilter(text);
                            }}
                        />
                    </WithTopDefMg>
                </Container>
                <WithTopDefMg>
                    <Tabs tabsItems={['Все', 'Поля', 'Файлы']} activeIndex={0} pressed={() => {}} />
                </WithTopDefMg>
            </View>
            <WithTopDefMg>
                <Container paddingRight={0}>
                    <View>
                        {/* <View
                            style={{
                                ...flexBoxColumn.FlexStartFlexStart,
                            }}
                        >
                            <WithBottomMg>
                                <StyledCheckBox value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked={searchInDocument} title={'Атрибуты'} onChange={() => setSearchInDocument(!searchInDocument)} />
                            </WithBottomMg>
                            <WithBottomMg>
                                <StyledCheckBox value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked={searchInFile} title={'Имя вложения'} onChange={() => setSearchInFile(!searchInFile)} />
                            </WithBottomMg>
                            <WithBottomMg>
                                <StyledCheckBox value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked={searchInConversation} onChange={() => setSearchInConversation(!searchInConversation)} title={'Имя вложения'} />
                            </WithBottomMg>
                        </View> */}
                        <WithBottomBigMg>{renderSearchResults()}</WithBottomBigMg>
                    </View>
                </Container>
            </WithTopDefMg>
        </ScrollView>
    );
};
