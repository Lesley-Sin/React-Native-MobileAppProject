import { Modal } from 'native-base';
import React, { FC } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, WithBottomSmallMg, WithTopSmallMg } from '../../globalStyles';
import { ThemeColor } from '../../globalStyles/colors/enums/colorTypes';
import { sizesScheme } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { StretchedButton } from '../Buttons/Button';
import { StyledSecodaryTitle } from '../Typography/StyledTypography';
import { StyledModalBody, StyledModalContent, StyledModalFooter, StyledModalFooterContent, StyledModalHeader } from './styles/ModalLayoutStyles';

import type { IModalLayout } from './models/IModalLayout';

const ModalFormLayout: FC<IModalLayout> = ({ isOpen, onClose, onCancel, onContinue, bodyChildren, footerChildren, mainBtnText, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <StyledModalContent>
                <Container>
                    {title && (
                        <StyledModalHeader>
                            <View style={flexBoxRow.CenterCenter}>
                                <StyledSecodaryTitle themeColor={ThemeColor.secColor}>{title}</StyledSecodaryTitle>
                            </View>
                        </StyledModalHeader>
                    )}
                    <StyledModalBody>
                        <WithTopSmallMg>
                            <ScrollView>{bodyChildren}</ScrollView>
                        </WithTopSmallMg>
                    </StyledModalBody>
                    <StyledModalFooter>
                        <StyledModalFooterContent>
                            <WithBottomSmallMg>
                                <StretchedButton height={sizesScheme.InputBtn.default.height} onPress={onContinue}>
                                    {mainBtnText}
                                </StretchedButton>
                                <WithTopSmallMg>
                                    <StretchedButton height={sizesScheme.InputBtn.default.height} themeColor={ThemeColor.secColor} backgroundThemeColor={ThemeColor.mainColor} onPress={onCancel}>
                                        cancel
                                    </StretchedButton>
                                </WithTopSmallMg>
                            </WithBottomSmallMg>
                        </StyledModalFooterContent>
                    </StyledModalFooter>
                </Container>
            </StyledModalContent>
        </Modal>
    );

};

export default ModalFormLayout;