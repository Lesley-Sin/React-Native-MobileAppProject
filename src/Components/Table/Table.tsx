import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC } from "react";
import { View } from "react-native";
import { colorScheme, margins } from "../../globalStyles/constants";
import { flexBoxRow } from "../../globalStyles/flexBox";
import { DefaultButton, SquareButton } from "../Buttons/Button";
import { StyledSecodaryTitle, StyledText } from "../Typography/StyledTypography";
import { faEdit, faBorderAll } from "@fortawesome/pro-light-svg-icons";
import { StyledFontAwasomeIcon } from "../Icons/Icons";
import Searcher from "../Searcher/Searcher";
import { Container } from "../../globalStyles";
import { SimpleGrid } from "native-base";

interface ITableTitle {
    title: string;
}

interface ITable extends ITableTitle {
    title: string;
}

const TableHeader: FC<ITableTitle> = ({ title }) => {
    return (
        <>
            <View style={flexBoxRow.SpaceBetweenCenter}>
                <View>
                    <SquareButton icon={<StyledFontAwasomeIcon icon={faBorderAll} />}></SquareButton>
                </View>
                <View style={{ marginLeft: margins.largeMargin }}>
                    <SquareButton icon={<StyledFontAwasomeIcon icon={faEdit} />}></SquareButton>
                </View>
                <View style={{ flex: 1, marginLeft: margins.largeMargin }}>
                    <Searcher />
                </View>
            </View>
        </>
    );
};

const TableBody = () => {
    return <SimpleGrid></SimpleGrid>;
};

export const Table: FC<ITable> = ({ title }) => {
    return (
        <View>
            <Container>
                <StyledSecodaryTitle color={colorScheme.defaultColors.secColor}>{title}</StyledSecodaryTitle>
                <TableHeader title={title} />
            </Container>
        </View>
    );
};
