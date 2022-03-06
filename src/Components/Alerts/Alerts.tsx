import { faCarrot, faTimes, faCheckCircle, faExclamationCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Alert, CloseIcon, IconButton, List } from 'native-base';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Container } from '../../globalStyles';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { StyledFontAwasomeIcon } from '../Icons/Icons';
import { UnorderedList } from '../List/List';
import { StyledSmallText, StyledText } from '../Typography/StyledTypography';
import { IAlertBody, ICustomAlert, IErrorAlert } from './interfaces/IAlerts';
import { AlertStyles } from './styles/AlertsStyles';

export const AlertError = (props: IErrorAlert) => {
    const { onCloseAlert, errorList, alertMessage, closeIcon = false, children } = props;

    const renderErrorList = () => {
        if (errorList) {
            return <UnorderedList listItems={errorList} />;
        }
        return <View />;
    };

    return (
        <Alert style={[AlertStyles.error, AlertStyles.box]}>
            <View style={{ width: '100%' }}>
                <AlertBody
                    onCloseAlert={onCloseAlert}
                    closeIcon={closeIcon}
                    alertMessage={alertMessage}
                    icon={faExclamationCircle}
                />
                <View>{renderErrorList()}</View>
            </View>
        </Alert>
    );
};
export const AlertSuccess = (props: ICustomAlert) => {
    const { onCloseAlert, alertMessage, children, closeIcon = false } = props;

    return (
        <Alert style={[AlertStyles.success, AlertStyles.box]}>
            <AlertBody
                onCloseAlert={onCloseAlert}
                alertMessage={alertMessage}
                closeIcon={closeIcon}
                icon={faCheckCircle}
                alertChildren={children}
            />
        </Alert>
    );
};

const AlertBody = (props: IAlertBody) => {
    const { onCloseAlert, icon, alertMessage, closeIcon, alertChildren } = props;

    return (
        <View style={[flexBoxRow.SpaceBetweenStart, { width: '100%' }]}>
            <View style={flexBoxRow.default}>
                <StyledFontAwasomeIcon icon={icon} />
                {alertMessage && (
                    <View style={{ marginLeft: margins.deafaultMargins }}>
                        <StyledText>{alertMessage}</StyledText>
                    </View>
                )}
            </View>
            {closeIcon && (
                <IconButton padding={0} icon={<StyledFontAwasomeIcon icon={faTimes} />} onPress={onCloseAlert} />
            )}
        </View>
    );
};
