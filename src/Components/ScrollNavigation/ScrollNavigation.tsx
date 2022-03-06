import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-svg';
import { IWithToggleAnimation } from '../../globalHooks/Animated/types';
import { interractAnimation } from '../../globalHooks/Animated/withAnimated';
import { Container, Separator, WithTopExtraMg } from '../../globalStyles';
import { colorScheme, margins, paddings, sizesScheme } from '../../globalStyles/constants';
import { WithShadowBox } from '../Boxes/Boxes';
import { Tabs } from '../Tabs/Tabs';

interface IScrollNavigation {
    stickyHeaderIndices?: number[];
    tabsItems: string[];
    headerItem?: JSX.Element;
    scrollItems: JSX.Element[];
    toolbar?: JSX.Element;
    globalSearch?: JSX.Element;
}

interface IScrollToolbar {
    toolbar: JSX.Element | undefined;
    tabsHeight: number | undefined;
    transformTranslationStyle: {
        transform: {
            translateY: Animated.AnimatedInterpolation;
        }[];
    };
}

export const ScrollNavigation: FC<IScrollNavigation> = ({ children, stickyHeaderIndices, tabsItems, headerItem, scrollItems, toolbar, globalSearch }) => {
    let navScroller = useRef<ScrollView | null>(null);
    let firstScrollElement = useRef<View | null>(null);

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [itemsHeightAccumState, setItemsHeightAccum] = useState<number[]>([]);
    const [firstElementScreenY, setFirstElementScreenY] = useState<number>(0); // нужно для расчета отступа последнего элемента в скролле
    const [tabsHeight, setTabsHeight] = useState<number>(0);
    const [tollBarHeight, setTollBarHeight] = useState<number>(0);
    const [lastElementHeight, setLastElementHeight] = useState<number>(0);
    const { height } = useWindowDimensions();
    const [toolbarDelay, setToolbarDelay] = useState(600);

    const itemsHeight: number[] = [];
    const itemsHeightAccum: number[] = [];

    const scrollToNavItem = (toolbarItem: string, i: number) => {
        navScroller.current?.scrollTo({
            x: 0,
            y: itemsHeightAccumState[i - 1] + firstElementScreenY /* - sizesScheme.workspace.height */ - tabsHeight + sizesScheme.workspace.height,
            animated: true,
        });
    };

    const translationConfig: IWithToggleAnimation = {
        duration: 400,
        delay: toolbarDelay,
        nativeDriver: true,
        easing: Easing.out(Easing.ease),
        outPutRange: [0, -100],
    };

    const [translationInterpolation, inputRange, toggleTranslationInputRange] = interractAnimation(translationConfig);
    const transformTranslationStyle = {
        transform: [{ translateY: translationInterpolation }],
    };

    useEffect(() => {
        if (navScroller.current && firstScrollElement.current) {
            firstScrollElement.current?.measureLayout(
                navScroller.current,
                (left, top, width, height) => {
                    if (firstElementScreenY === 0) {
                        setFirstElementScreenY(top);
                    }
                },
                () => {}
            );
        }
    });

    return (
        <ScrollView
            stickyHeaderIndices={[headerItem ? 1 : 0]}
            scrollEventThrottle={1}
            ref={(scroller) => {
                navScroller.current = scroller;
            }}
            onScrollBeginDrag={(e) => {
                toggleTranslationInputRange();
                setToolbarDelay(0);
            }}
            onScrollEndDrag={(e) => {
                toggleTranslationInputRange();
                setToolbarDelay(600);
            }}
            onScroll={({
                nativeEvent: {
                    contentOffset: { y },
                },
            }) => {
                if (y >= itemsHeightAccumState[activeIndex] + firstElementScreenY - tabsHeight /* + sizesScheme.workspace.height */ - 0.1) {
                    const newActiveindex = activeIndex + 1;
                    setActiveIndex(newActiveindex);
                }
                if (y <= itemsHeightAccumState[activeIndex - 1] + firstElementScreenY - tabsHeight /* + sizesScheme.workspace.height  */ - 0.1) {
                    const newActiveindex = activeIndex - 1;
                    setActiveIndex(newActiveindex);
                }
            }}
            style={{ zIndex: 6 }}
        >
            {headerItem && (
                <View style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor }}>
                    <Container>{headerItem}</Container>
                </View>
            )}

            <View style={{ zIndex: 10 }}>
                <View
                    onLayout={({
                        nativeEvent: {
                            layout: { height },
                        },
                    }) => {
                        tabsHeight === 0 && setTabsHeight(height);
                    }}
                    style={{ backgroundColor: colorScheme.defaultColors.defaultBackgroundColor, zIndex: 8 }}
                >
                    <View style={{ zIndex: 8 }}>
                        <Tabs pressed={scrollToNavItem} activeIndex={activeIndex} tabsItems={tabsItems} />
                    </View>
                </View>
                <View
                    onLayout={({
                        nativeEvent: {
                            layout: { height },
                        },
                    }) => {
                        tollBarHeight === 0 && setTollBarHeight(height);
                    }}
                >
                    <ScrollToolbar toolbar={toolbar} tabsHeight={tabsHeight} transformTranslationStyle={transformTranslationStyle} />
                </View>
            </View>

            <View style={{ zIndex: -1, marginTop: toolbar ? -tollBarHeight : 0 }}>
                <View style={{ zIndex: -1, backgroundColor: colorScheme.defaultColors.mainColor }}>
                    {scrollItems.map((scrollItem, i) => {
                        return (
                            <View
                                key={i}
                                ref={(view) => {
                                    if (i === 0) {
                                        firstScrollElement.current = view;
                                    }
                                }}
                                onLayout={({
                                    nativeEvent: {
                                        layout: { height },
                                    },
                                }) => {
                                    if (itemsHeight.length <= scrollItems.length - 1 /* && tabsHeight !== 0 && firstElementScreenY !== 0 */) {
                                        itemsHeight.push(height);
                                        const sumToLastItem = itemsHeight.reduce((prev, cur) => prev + cur);
                                        itemsHeightAccum.push(sumToLastItem);
                                    }
                                    if (i === scrollItems.length - 1 && lastElementHeight === 0) {
                                        setLastElementHeight(height);
                                        setItemsHeightAccum(itemsHeightAccum);
                                    }
                                }}
                                style={{ zIndex: 5 }}
                            >
                                <Container>
                                    <WithTopExtraMg style={{ zIndex: -1 }}>{scrollItem}</WithTopExtraMg>
                                </Container>

                                {i !== scrollItems.length - 1 && (
                                    <WithTopExtraMg>
                                        <Separator />
                                    </WithTopExtraMg>
                                )}
                            </View>
                        );
                    })}
                    <View
                        style={{
                            height: height - lastElementHeight - sizesScheme.workspace.height - 40 - 75,
                        }}
                    ></View>
                </View>
            </View>
        </ScrollView>
        // </View>
    );
};

const ScrollToolbar: FC<IScrollToolbar> = ({ toolbar, tabsHeight, transformTranslationStyle }) => {
    return (
        <>
            {toolbar && (
                <View style={{ zIndex: 7, width: '100%' }}>
                    <Animated.View style={transformTranslationStyle}>
                        <View style={{ width: '100%', paddingBottom: paddings.smallPadding }}>
                            <WithShadowBox>
                                <View style={{ backgroundColor: colorScheme.defaultColors.mainColor, paddingTop: paddings.smallPadding, paddingBottom: paddings.smallPadding }}>
                                    <Container>
                                        <View>{toolbar}</View>
                                    </Container>
                                </View>
                            </WithShadowBox>
                        </View>
                    </Animated.View>
                </View>
            )}
        </>
    );
};
