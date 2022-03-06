import EventEmitter from 'events';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Container, WithTopBigMg } from '../../../globalStyles';
import { ThemeColor } from '../../../globalStyles/colors/enums/colorTypes';
import { StyledSecodaryTitle } from '../../Typography/StyledTypography';
import { GroupPanelView } from './GroupPanelView';

interface IPopup {
    children: any;
    text: string;
    instance?: GroupPanelView;
    emitter?: EventEmitter;
}

const GroupPanelDropdown = ({ children, text, instance, emitter }: IPopup): JSX.Element => {
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        emitter?.addListener('update', () => {
            setUpdate(!update);
        });
    });

    return (
        <View>
            <StyledSecodaryTitle themeColor={ThemeColor.secColor}>{text}</StyledSecodaryTitle>
            <WithTopBigMg>
                <Container>{children}</Container>
            </WithTopBigMg>
        </View>
    );
};

export default GroupPanelDropdown;
