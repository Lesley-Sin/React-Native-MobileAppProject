import React, { FC, useState } from "react";
import { Radio, View } from "native-base";
import styled from "styled-components/native";
import { colorScheme } from "../../../globalStyles/constants";

interface IRadioView {
    radioItems: IRadioViewArr[];
}

interface IRadioViewArr {
    id: string;
    title: string;
}

const CustomIcon = () => {
    const RadioIcon = styled.View`
        width: 12px;
        height: 12px;
        border-radius: 100px;
        background-color: ${colorScheme.defaultColors.defaultBackgroundColor};
    `;
    return <RadioIcon></RadioIcon>;
};

const RadioView: FC<IRadioView> = ({ radioItems }) => {
    const [id, setId] = useState("");

    const renderRadioItem = () =>
        radioItems.map(({ id, title }) => {
            return (
                <Radio
                    borderColor={colorScheme.defaultColors.secColor}
                    icon={<CustomIcon />}
                    key={id}
                    value={id}
                    my="1"
                >
                    {title}
                </Radio>
            );
        });

    const setActiveRadio = (id: string) => {
        setId(id);
    };

    return (
        <Radio.Group
            name=""
            value={id}
            onChange={(id) => {
                setActiveRadio(id);
            }}
        >
            {renderRadioItem()}
        </Radio.Group>
    );
};

export default RadioView;
