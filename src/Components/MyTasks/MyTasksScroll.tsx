import { FC } from 'hoist-non-react-statics/node_modules/@types/react';
import React from 'react';
import { View } from 'react-native';
import { Container, WithBottomMg, WithTopBigMg, WithTopDefMg } from '../../globalStyles';
import { colorScheme, margins } from '../../globalStyles/constants';
import { flexBoxRow } from '../../globalStyles/flexBox';
import { DefaultCard } from '../Boxes/Boxes';
import { AbreviationIcon } from '../Icons/Icons';
import { SeverityStatusIndicator, SeverityStatusIndicatorType } from '../SeverityStatusIndicator/SeverityStatusIndicator';
import { Toolbar } from '../Tabs/Tabs';
import { StyledSecodaryTitle, StyledSmallText, StyledText } from '../Typography/StyledTypography';

interface IMyTasksScroll {
    name: string;
    description: string;
    level: unknown;
    date: string;
}

interface IMyTasksScrollBody {
    type: IMyTasksScrollTypes;
}

enum IMyTasksScrollTypes {
    general = 'general',
    description = 'description',
    desicion = 'desicion',
    deligation = 'deligation',
}

const MyTasksScrollHeader: FC<IMyTasksScroll> = ({ name, date, description, level }) => {
    return (
        <View>
            <Container>
                <WithTopBigMg>
                    <View style={flexBoxRow.default}>
                        <AbreviationIcon name={name} />
                        <View style={{ marginLeft: margins.deafaultMargins }}>
                            <StyledSmallText>{name}</StyledSmallText>
                            <StyledSmallText>{date}</StyledSmallText>
                        </View>
                    </View>
                </WithTopBigMg>
                <WithTopBigMg>
                    <View style={{ width: '80%' }}>
                        <StyledSecodaryTitle>{description}</StyledSecodaryTitle>
                    </View>
                </WithTopBigMg>
                <WithTopBigMg>
                    <SeverityStatusIndicator type={SeverityStatusIndicatorType.usuall} />
                </WithTopBigMg>
            </Container>
        </View>
    );
};

const MyTasksScrollGeneral = () => {
    return <View></View>;
};

const MyTasksScrollBody: FC<IMyTasksScrollBody> = ({ type }) => {
    switch (type) {
        case IMyTasksScrollTypes.general:
            return <MyTasksScrollGeneral />;
    }
    return <></>;
};

export const MyTasksScroll: FC = (props) => {
    const toolbarList = ['Общие', 'Описание', 'Решение', 'Делегирование'];
    return (
        <View
            style={{
                backgroundColor: colorScheme.defaultColors.defaultBackgroundColor,
            }}
        >
            <WithTopBigMg>
                <Toolbar tabsItems={toolbarList} />
            </WithTopBigMg>
            <MyTasksScrollBody type={IMyTasksScrollTypes.general} />
        </View>
    );
};
