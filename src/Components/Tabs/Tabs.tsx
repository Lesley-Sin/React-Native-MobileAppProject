import React, { FC, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Container } from '../../globalStyles';
import { colorScheme, margins, paddings } from '../../globalStyles/constants';
import { StyledText } from '../Typography/StyledTypography';

interface ITabs {
    tabsItems: string[];
    tabIndicator?: JSX.Element[];
    activeIndex: number;
    pressed: (...args: any) => any;
}

export const Tabs: FC<ITabs> = ({ tabsItems, pressed, activeIndex, tabIndicator }) => {
    let toolbarScroller = useRef<ScrollView | null>(null);
    const [tabsItemsWidth, settabsItemsWidth] = useState<number[]>([]);
    const [tabsItemsWidthAccum, settabsItemsWidthAccum] = useState<number[]>([]);

    useEffect(() => {
        const getProfileScroll = () => tabsItemsWidthAccum.find((item, i) => i === activeIndex && item);
        const scrollSum = getProfileScroll();

        toolbarScroller.current?.scrollTo({ x: scrollSum && scrollSum - 60, y: 0, animated: true });
    }, [activeIndex, tabsItemsWidthAccum]);

    const tabsItemsWidthArr: number[] = [];
    const tabsItemsWidthArrAccum: number[] = [0];

    const rendertabsItems = () => {
        return tabsItems.map((toolbarItem, i) => {
            let margin = 0;
            let borderWidth = 0;

            if (i === activeIndex) {
                borderWidth = 2;
            }

            return (
                <Pressable
                    onPress={async () => {
                        await pressed(toolbarItem, i);
                    }}
                    key={i}
                    onLayout={({
                        nativeEvent: {
                            layout: { width, height },
                        },
                    }) => {
                        if (tabsItemsWidthArr.length <= tabsItems.length - 1) {
                            tabsItemsWidthArr.push(width);
                            const sumToLastItem = tabsItemsWidthArr.reduce((prev, cur) => prev + cur);
                            tabsItemsWidthArrAccum.push(sumToLastItem);
                        }
                        if (tabsItemsWidthArr.length === tabsItems.length - 1) {
                            settabsItemsWidth(tabsItemsWidthArr);
                            settabsItemsWidthAccum(tabsItemsWidthArrAccum);
                        }
                    }}
                    style={{
                        paddingHorizontal: paddings.defaultPaddings,
                        paddingVertical: paddings.smallPadding,
                        borderBottomColor: colorScheme.defaultColors.mainColor,
                        borderBottomWidth: borderWidth,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <StyledText>{toolbarItem}</StyledText>

                    {tabIndicator && tabIndicator[i]}
                </Pressable>
            );
        });
    };

    return (
        <View
            style={{
                backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
            }}
        >
            <Container paddingRight={0}>
                <ScrollView
                    style={{
                        backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
                    }}
                    ref={(scroller) => {
                        toolbarScroller.current = scroller;
                    }}
                    scrollEventThrottle={1}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {rendertabsItems()}
                </ScrollView>
            </Container>
        </View>
    );
};
