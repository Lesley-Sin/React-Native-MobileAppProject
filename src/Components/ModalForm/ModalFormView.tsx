import React from 'react';
import { View } from 'react-native';
import { ToolbarItemView } from '../InputFields/Toolbar/Interfaces/ToolbarItemView';
import DialogueWindowLayout from '../ModalLayout/DialogueWindowLayout';
import ModalFormLayout from '../ModalLayout/ModalFormLayout';

import type { ModalFormType } from '../Page/Models/ModalFormType';
import type { ModalFormService } from './ModalFormService';

interface IModalFormViewProps {
    modalFormService: ModalFormService;
}

export const ModalFormView: React.FC<IModalFormViewProps> = ({ modalFormService }) => {
    const [child, setChild] = React.useState(<View />);
    const [showModal, setShowModal] = React.useState(false);
    const [toolbarItem, setToolbarItem] = React.useState<ToolbarItemView>();
    const [type, setType] = React.useState<ModalFormType>();

    React.useEffect(() => {
        modalFormService.emitter.addListener('setModalView', (child: JSX.Element) => setChild(child));
        modalFormService.emitter.addListener('setShowModal', () => setShowModal(!showModal));
        modalFormService.emitter.addListener('setToolbar', (tbi: ToolbarItemView) => setToolbarItem(tbi));
        modalFormService.emitter.addListener('setModalFormType', (type: ModalFormType) => setType(type))

        return () => {
            modalFormService.emitter.removeAllListeners('setModalView');
            modalFormService.emitter.removeAllListeners('setShowModal');
            modalFormService.emitter.removeAllListeners('setToolbar');
            modalFormService.emitter.removeAllListeners('setModalFormType');
        };
    }, []);

    const render = () => {
        if (type === 'Dialog') {
            return (
                <DialogueWindowLayout
                    isOpen={showModal}
                    onClose={async () => {
                        setShowModal(false);
                        await modalFormService.setConfirmation(false);
                    }}
                    mainBtnText={toolbarItem?.name}
                    bodyChildren={child}
                    onContinue={async () => {
                        setShowModal(false);
                        await modalFormService.setConfirmation(true);
                    }}
                />
            )
        } else {
            return (
                <ModalFormLayout
                    isOpen={showModal}
                    onClose={async () => {
                        setShowModal(false);
                        await modalFormService.invokeUserAction();
                    }}
                    mainBtnText={toolbarItem?.name}
                    bodyChildren={child}
                    onContinue={async () => {
                        setShowModal(false);
                        await modalFormService.invokeUserAction();
                    }}
                />
            )
        }
    };

    return (
        <View>
            {render()}
        </View>
    );
    
};

export default ModalFormView;
