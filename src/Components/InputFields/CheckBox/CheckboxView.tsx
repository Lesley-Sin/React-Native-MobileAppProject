import React from "react";
import { Settings, Text, View } from "react-native";
import { Checkbox, FormControl, IconButton } from "native-base";
import { CheckBoxStyle } from "./CheckBoxStyle";
import { faQuestion } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AccessType } from "../../Enums/AccessType";
import { IBoolean } from "./Boolean/Boolean";

//TODO func component
export class CheckboxView {
    private isChecked: boolean;
    private label: string;
    private handler: (value: boolean) => void;
    private helperText: string | undefined;
    private settings: IBoolean | undefined;
    //TODO Localize it
    constructor(isChecked: boolean, handler: (value: boolean) => void, settings: IBoolean | undefined) {
        this.isChecked = isChecked;
        this.label = settings?.label.text.ru ?? "";
        this.handler = handler;
        this.helperText = settings?.helpText.ru;
        this.settings = settings;
    }

    /**
     * @getView
     */
    public getView() {
        if (this.settings?.accessType == AccessType.Hidden) {
            return <View></View>;
        } else {
            return (
                <View style={CheckBoxStyle.boxView}>
                    <FormControl isInvalid={this.settings?.accessType == AccessType.Required}>
                        <Checkbox
                            accessibilityLabel={this.label}
                            value={this.label}
                            isChecked={this.isChecked != undefined ? this.isChecked : false}
                            onChange={() => this.handler(!this.isChecked)}
                        >
                            <Text style={CheckBoxStyle.text}>{this.label}</Text>
                        </Checkbox>
                        {/*                         {this.helperView()}
                         */}{" "}
                    </FormControl>
                </View>
            );
        }
    }

    private helperView() {
        const [showHelper, setShowHelper] = React.useState(false);
        if (this.helperText) {
            return (
                <View>
                    <IconButton
                        icon={<FontAwesomeIcon icon={faQuestion} />}
                        onPress={() => setShowHelper(!showHelper)}
                    />
                    {showHelper && <Text style={CheckBoxStyle.text}>{this.helperText}</Text>}
                </View>
            );
        }
        return <View />;
    }
}
