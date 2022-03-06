import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IAlertProps } from 'native-base';
import { GestureResponderEvent } from 'react-native';

export interface ICustomAlert extends IAlertProps {
    onCloseAlert?: ((event: GestureResponderEvent) => void) | null | undefined;
    alertMessage?: string;
    closeIcon?: boolean;
}

export interface IErrorAlert extends ICustomAlert {
    errorList?: string[];
}

export interface IAlertBody extends ICustomAlert {
    icon: IconDefinition;
    closeIcon?: boolean;
    alertChildren?: JSX.Element;
}
