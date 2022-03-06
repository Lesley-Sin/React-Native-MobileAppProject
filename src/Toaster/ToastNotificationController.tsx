import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useToast } from 'native-base';
import { ToastNotificationService } from './ToastNotificationService';
import { IUserCommandMessage } from '../UserCommandExecutionService/Models/IUserCommandResult';
import { SeverityLevel } from '../SharedTypes/SeveretyLevel';
import { StyledText } from '../Components/Typography/StyledTypography';
import { AlertError, AlertSuccess } from '../Components/Alerts/Alerts';
import { Container } from '../globalStyles';

interface IToast {
    toastNotificationService: ToastNotificationService;
}

export function ToastNotificationController({ toastNotificationService }: IToast) {
    const toast = useToast();
    const { width } = useWindowDimensions();
    React.useEffect(() => {
        toastNotificationService.emitter.addListener('toastMessage', (messageModel: IUserCommandMessage) =>
            toasrMessage(messageModel)
        );

        return () => {
            toastNotificationService.emitter.removeAllListeners('toastMessage');
        };
    }, []);

    function toasrMessage(messageModel: IUserCommandMessage) {
        const messageText = messageModel.text;
        const wrappedMessage = severityWrapper(messageModel.severity, messageText);
        toast.show({
            render: () => {
                return (
                    <View
                        style={{
                            width: width,
                        }}
                    >
                        <Container>{wrappedMessage}</Container>
                    </View>
                );
            },
        });
    }

    function severityWrapper(severity: SeverityLevel, messageText: string) {
        switch (severity) {
            case SeverityLevel.None: {
                return <AlertSuccess alertMessage={messageText} />;
            }
            case SeverityLevel.Low:
            case SeverityLevel.Normal: {
                return <AlertSuccess closeIcon alertMessage={messageText} />;
            }
            case SeverityLevel.Major:
            case SeverityLevel.Critical:
            case SeverityLevel.Fatal: {
                return <AlertError alertMessage={messageText} />;
            }
            default:
                return <View />;
        }
    }

    return <View />;
}
