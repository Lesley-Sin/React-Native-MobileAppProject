import { Modal } from 'native-base';
import React, { FC } from 'react';
import { View } from 'react-native';
import { IContextMenu } from './interfaces/IContexMenu';

const ContextMenu: FC<IContextMenu> = ({
    contextMenuPosition,
    closeContextMenu,
    isOpen,
    setContextMenuWidth,
    children,
}) => {
    return (
        <Modal
            top={contextMenuPosition?.y}
            left={contextMenuPosition?.x}
            margin={0}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
            isOpen={isOpen}
            onClose={closeContextMenu}
        >
            <View>
                <Modal.Content></Modal.Content>
                <Modal.Content
                    onLayout={({
                        nativeEvent: {
                            layout: { width },
                        },
                    }) => setContextMenuWidth && setContextMenuWidth(width)}
                >
                    <Modal.Body>{children}</Modal.Body>
                </Modal.Content>
            </View>
        </Modal>
    );
};

export default ContextMenu;
