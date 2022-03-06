import EventEmitter from "events";
import { FormControl } from "native-base";
import React, { useState, FC, useEffect } from "react"
import { View } from "react-native";
import { AccessType } from "../../Enums/AccessType";
import { StyledFormControlLabel, StyledFormInput } from "../../Form/Form";
import { NumberFieldComponent } from "../../Interfaces/FieldComponent";
import { HelperText } from "../../HelperText/HelperText";
import { numberErrors, updateNumber } from "./Events";
import { WidgetData } from "../../Interfaces/DataformWidgetsQuery";

interface NumberProps {
    props: NumberFieldComponent
    emitter: EventEmitter;
    id: string;
    onChange: (value: string | undefined) => void;
}
//TODO Localize It!
export const NumberView: FC<NumberProps> = ({ props, emitter, id, onChange }) => {
    let decimalPlaces = props.dataSourceInfo.decimalPlaces
    const [access, setAccess] = useState<AccessType>(props.accessType);
    const [inputValue, setValue] = useState<string | undefined>();
    const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>()

    useEffect(() => {
        emitter.addListener(`${updateNumber}${id}`, onWidgetDataReceived);
        emitter.addListener(`${numberErrors}${id}`, setErrorMessages);

        return () => {
            emitter.removeAllListeners(`${updateNumber}${id}`);
            emitter.removeAllListeners(`${numberErrors}${id}`);
        };
    }, []);

    function onWidgetDataReceived(widgetData: WidgetData) {
        if (widgetData) {
            const value = widgetData.values.literal as number;
            setValue(value.toFixed(decimalPlaces));
            if (widgetData.access) {
                setAccess(widgetData.access);
            };
        };
    };

    const Input = (
        <StyledFormInput
            value={localize(validate(inputValue))}
            onChangeText={(t) => setValue(localize(onUpdate(t)))}
            onBlur={() => onChange(localize(inputValue))}
            keyboardType={"numeric"}
        />
    )

    //NOTE Временный метод. Бекэнд не дает сохранать (или сохраняет не правильно) значение, если десятичный разделитель не локализован
    //NOTE В JavaScript десятичный разделитель всегда "."
    //TODO Удалить, когда локализация будет прикручена  
    function localize(text: string | undefined): string | undefined {
        if (!text) { return undefined }

        let lang: "ru" | "en" | "de" = "ru"

        if (lang == "ru" || lang == "de") {
            return text.replace(".", ",")
        }

        return text

    }

    function onUpdate(text: string) {

        if (text == "0") {
            let returnVal = 0
            return returnVal.toFixed(decimalPlaces)
        }

        let isNegative = text.includes("-")
        let digitsOnly: RegExpMatchArray | null;
        if (isNegative) {
            digitsOnly = text.match(/\d+/g);
            if (digitsOnly) {
                digitsOnly[0] = "-" + digitsOnly[0]
            }
        } else {
            digitsOnly = text.match(/\d+/g);
        }

        let value = digitsOnly ? parseInt(digitsOnly.join(""), 10) / Math.pow(10, decimalPlaces ?? 0) : undefined;

        if (value) {
            let maxValue = props.max ?? 999999999999999;
            let minValue = props.min ?? -999999999999999;

            if (value > maxValue) {
                return maxValue.toFixed(decimalPlaces)
            }

            if (value < minValue) {
                return minValue.toFixed(decimalPlaces)
            }

            return (value.toFixed(decimalPlaces))
        }

    }


    const UpperFiledData = (
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <StyledFormControlLabel>{props.label.text.ru}</StyledFormControlLabel>
            <HelperText
                textContainer={props.helpText}
                style={{ flexDirection: "row" }} />
            {errorMessages}
        </View>
    )


    return (
        AccesTypeWarper()
    )


    function validate(text: string | undefined) {
        if (!text) { return }

        let value = (text.replace(/\s/g, ''))

        if (Number.isNaN(value)) {
            return undefined
        }

        if (props.dataSourceInfo.isDigitGrouping) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }

        return value.toString()

    }

    function AccesTypeWarper() {
        switch (access) {
            case AccessType.Undefined:
                return null
            case AccessType.Required:
                return (<FormControl isRequired={true}>
                    {UpperFiledData}
                    {Input}
                </FormControl>)
            case AccessType.Readonly:
                return (<FormControl isReadOnly={true} isInvalid={false}>
                    {UpperFiledData}
                    {Input}
                </FormControl>)
            case AccessType.Hidden:
                return null
            case AccessType.Editable:
                return (<FormControl >
                    {UpperFiledData}
                    {Input}
                </FormControl>)
        }
    }

}

