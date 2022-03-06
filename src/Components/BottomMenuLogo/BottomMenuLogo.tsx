import React from 'react';
import { View } from 'react-native';
import { paddings } from '../../globalStyles/constants';
import { WithShadowBox } from '../Boxes/Boxes';
import { Logo } from '../Logo/Logo';

export const BottomMenuLogo = () => {
    return (
        <View>
            <WithShadowBox>
                <View style={{ margin: paddings.defaultPaddings, height: 20 }}>
                    <Logo height={'100%'} />
                </View>
            </WithShadowBox>
        </View>
    );
};
