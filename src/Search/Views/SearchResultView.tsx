import { faFileWord } from '@fortawesome/pro-light-svg-icons';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { WithCircle } from '../../Components/Boxes/Boxes';
import { StyledFontAwasomeIcon } from '../../Components/Icons/Icons';
import { StyledSmallText } from '../../Components/Typography/StyledTypography';
import { Container, Separator, WithBottomSmallMg, WithTopSmallMg, WtihExSmallMargin } from '../../globalStyles';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { IFragment } from '../Interfaces/IFragment';
import { ISearchResultView } from '../Interfaces/ISearchResultView';
import { SearchResultViewStyles } from './SearchStyles/searchResultViewStyle';

/**
 * @SearchResultView
 * Functional component provides view of single search result
 * @returns JSX.Element
 */
const SearchResultView: FC<ISearchResultView> = ({ tempName, property, objectName, notify }): JSX.Element => {
    const navigation = useNavigation();
    /**
     * @textHighLighter
     * Highlight search matching in text by entries index
     * @returns JSX.Elements array
     */
    function textHighLighter(): Array<JSX.Element> {
        const jsxArray: Array<JSX.Element> = [];
        const fragmetsArr: Array<IFragment> = [];
        let textValue: string = '';
        property.values.forEach((val) => {
            textValue = val.value;
            val.fragments.forEach((frag) => fragmetsArr.push(frag));
        });
        let splitedTextValue: Array<string> = textValue.split(' ');
        let entryIndex = 0;
        for (let i = 0; i < splitedTextValue.length; i++) {
            const item = splitedTextValue[i];
            let entryStart = fragmetsArr[entryIndex]?.propertyValueBegin;
            let entryEnd = fragmetsArr[entryIndex]?.propertyValueEnd;
            let entryString = textValue.slice(entryStart, entryEnd);
            if (item.includes(entryString)) {
                entryIndex++;
                jsxArray.push(<Text style={SearchResultViewStyles.text}>{item} </Text>);
            } else {
                jsxArray.push(<Text>{item} </Text>);
            }
        }
        return jsxArray;
    }

    return (
        <>
            <WithBottomSmallMg>
                <Pressable
                    onPress={() => {
                        notify();
                    }}
                    style={flexBoxRow.default}
                >
                    <WtihExSmallMargin>
                        <WithCircle backgroundColor={colorScheme.menuColor.default}>
                            <StyledFontAwasomeIcon color={colorScheme.defaultColors.defaultBackgroundColor} icon={faFileWord} />
                        </WithCircle>
                    </WtihExSmallMargin>
                    <Container paddingRight={0}>
                        <View style={{ marginLeft: margins.smallMargin }}>
                            <View style={SearchResultViewStyles.boxText}>
                                <StyledSmallText themeColor={ThemeColor.secColor}>{objectName + ' (' + tempName + ')'}</StyledSmallText>
                            </View>
                            <StyledSmallText themeColor={ThemeColor.secColor}>
                                {property.property.name + ': '}
                                {textHighLighter()}
                            </StyledSmallText>
                            <WithTopSmallMg>
                                <Separator marginLeft={0} />
                            </WithTopSmallMg>
                        </View>
                    </Container>
                </Pressable>
            </WithBottomSmallMg>
        </>
    );
};

export default SearchResultView;
