import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { INavItem } from "../Interfaces/INavItem";
import { NavItemStyle } from "./NavigationStyles/navItemStyle";
import { NavigationOmni } from "./NavigationStyles/navigationOmni";
import { useReduxSelector, useReduxDispatch } from "../../AppState/Store";
import { setChekedItemId } from "../../AppState/Navigation/NavigationSlice";
import { StyledText } from "../../Components/Typography/StyledTypography";
import { colorScheme, margins } from "../../globalStyles/constants";
import { marginLeft } from "styled-system";
import { DropdownItem } from "../../Components/Dropdown/Dropdown";

const NavItemView: FC<INavItem> = ({ itemModel, handleUserCommandAction, notify }) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const { chekedItemId } = useReduxSelector((state) => state.Navigation);
  const dispatch = useReduxDispatch();

  function PressEvent() {
    if (itemModel.userCommand) {
      handleUserCommandAction(itemModel.userCommand)
    } else {
      setChecked(!checked);
      dispatch(setChekedItemId(itemModel.id));
      notify()
    }
  };

  function setHighlight() {
    if (chekedItemId === itemModel.id && checked) {
      return true;
    } else return false;
  }

  return (
    <Pressable onPress={() => PressEvent()}>
      <DropdownItem title={itemModel.name} />
    </Pressable>
  );
};

export default NavItemView;
