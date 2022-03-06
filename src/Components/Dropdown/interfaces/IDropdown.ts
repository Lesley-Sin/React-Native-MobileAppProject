import { Animated } from 'react-native';
import { IWithToggleAnimation } from '../../../globalHooks/Animated/types';
import { IDropDownType } from '../enums/DropdownTypes';

export interface IDropdown {
    isChevron?: boolean;
    title: string;
}

export interface IDropdownHeader extends IDropdown {
    transformArrowStyle?: {
        transform: {
            rotate: Animated.AnimatedInterpolation;
        }[];
    };
    bottomBorders: boolean;
}

export interface IDropdownBody extends IDropdown {
    transformArrowStyle?: {
        transform: {
            rotate: Animated.AnimatedInterpolation;
        }[];
    };
    textColor?: string;
    iconColor?: string;
}

export interface IDropDownExtended extends IDropdown {
    pressedDropDown?: () => void;
    translationListConfig: IWithToggleAnimation;
    checked: boolean;
    type: IDropDownType;
    defaultIsOpen?: boolean;
    animated?: boolean;
}
