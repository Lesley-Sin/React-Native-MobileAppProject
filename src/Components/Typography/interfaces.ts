import { ITextProps } from 'native-base';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { WeightType } from '../../globalStyles/enums/constants';

export interface IStyledText extends ITextProps {
    fontSize?: number;
    fontWeight?: WeightType;
    color?: string;
    themeColor?: ThemeColor;
}
