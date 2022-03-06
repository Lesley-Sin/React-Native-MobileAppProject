import { faChevronDown } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import { IWithToggleAnimation } from "../../globalHooks/Animated/types";
import { interractAnimation } from "../../globalHooks/Animated/withAnimated";
import { Container } from "../../globalStyles";
import {
  colorScheme,
  fontScheme,
  paddings,
  radiusScheme,
  sizesScheme,
} from "../../globalStyles/constants";
import { translationArrowConfig } from "../../utility/arrowAnimationConfig";
import { DropDownStyles } from "../Dropdown/DropdownStyles";
import { StyledFontAwasomeIcon } from "../Icons/Icons";
import { StyledText } from "../Typography/StyledTypography";
import { ISelect } from "./interfaces/ISelect";
import { SelectStyles, SelectStylesItem } from "./styles/SelectStyles";

export const Select: FC<ISelect> = ({ items, defaultValue }) => {
  const defaultCelectedItem = defaultValue ? defaultValue : items[0];

  const [selectedItem, setSelectedItem] = useState<string>(defaultCelectedItem);
  const [activeSelect, setActiveSelect] = useState<boolean>(false);

  const [
    arrowTranslationStyles,
    rangeArrowNumber,
    toggleArrowTaranslationStyles,
  ] = interractAnimation(translationArrowConfig);

  const transformArrowStyle = {
    transform: [{ rotate: arrowTranslationStyles }],
  };

  const duration = items.length * 70;

  const translationListConfig: IWithToggleAnimation = {
    duration: duration,
    nativeDriver: false,
    easing: Easing.linear,
    delay: 0,
    outPutRange: [0, sizesScheme.InputBtn.default.height],
  };

  const [maxHeight, rangeListNumber, toggleTaranslationListStyles] =
    interractAnimation(translationListConfig);

  const transformListStyle = { maxHeight: maxHeight };

  const renderSelectItems = () => {
    return items.map((item, i) => (
      <Pressable
        onPress={() => {
          setSelectedItem(item);
          toggleArrowTaranslationStyles();
          toggleTaranslationListStyles();
          setActiveSelect(!activeSelect);
        }}
      >
        <Animated.View style={transformListStyle}>
          <View
            style={[
              DropDownStyles.common,
              DropDownStyles.item,
              SelectStylesItem(
                items.indexOf(selectedItem) === i && selectedItem === item
              ).item,
            ]}
          >
            <StyledText
              color={
                selectedItem === item
                  ? colorScheme.defaultColors.defaultBackgroundColor
                  : colorScheme.defaultColors.secColor
              }
              key={i}
            >
              {item}
            </StyledText>
          </View>
        </Animated.View>
      </Pressable>
    ));
  };

  return (
    <View style={{ overflow: "visible" }}>
      <Pressable
        onPress={() => {
          if (activeSelect) {
            toggleArrowTaranslationStyles();
            toggleTaranslationListStyles();
            setActiveSelect(!activeSelect);
          }
        }}
        style={[
          SelectStyles.backdrop,
          {
            display: !activeSelect ? "none" : "flex",
          },
        ]}
      />
      <View style={activeSelect && SelectStyles.content}>
        <Pressable
          onPress={() => {
            toggleArrowTaranslationStyles();
            toggleTaranslationListStyles();
            setActiveSelect((prev) => prev !== true && true);
          }}
          style={[
            DropDownStyles.common,
            DropDownStyles.item,
            SelectStyles.header,
          ]}
        >
          <StyledText color={colorScheme.defaultColors.secColor}>
            {selectedItem}
          </StyledText>

          <Animated.View style={transformArrowStyle}>
            <StyledFontAwasomeIcon
              icon={faChevronDown}
              size={fontScheme.text.size}
              color={colorScheme.defaultColors.secColor}
            />
          </Animated.View>
        </Pressable>
        {renderSelectItems()}
      </View>
    </View>
  );
};
