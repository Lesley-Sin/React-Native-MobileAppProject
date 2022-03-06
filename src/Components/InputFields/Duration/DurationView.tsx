import moment from "moment";
import * as React from 'react'
import { Pressable, Text, View } from "react-native";
import { DurationItem } from "./DurationItem";
import 'moment-duration-format';
import { DurationFieldComponent } from "../../Interfaces/FieldComponent";
import { FC, useEffect, useState } from "react";
import { ObjectPropertyFormat } from "../../Enums/ObjectPropertyFirmat";
import EventEmitter from "events";
import { durationErrors, durationEvent } from "./DurationEvents";
import { StyledFormControlLabel } from "../../Form/Form";
import { HelperText } from "../../HelperText/HelperText";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AccessType } from "../../Enums/AccessType";
import { UpperFieldData } from "../../Form/UpperFieldData/UpperFieldData";
import { WidgetData } from "../../Interfaces/DataformWidgetsQuery";

export type DurationValues = {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
}

export enum DurationFormats {
    DurationHMSTime = "DurationHMSTime",
    DurationHMTime = "DurationHMTime",
    DurationHM = "DurationHM",
    DurationHMS = "DurationHMS",
    DurationFullShort = "DurationFullShort",
    DurationD8HM = "DurationD8HM",
    DurationD24HM = "DurationD24HM",
}

type DurationValue = { days: string | undefined, hours: string | undefined, minutes: string | undefined, seconds: string | undefined }

function durationFormatter(format: ObjectPropertyFormat, value: string | undefined): DurationValue {
    const durationValue: DurationValue = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
    }

    if (!value) { return durationValue }

    let formatedValue: string[];

    switch (format) {
        case ObjectPropertyFormat.DurationD24HM:
        case ObjectPropertyFormat.DurationD8HM:
            formatedValue = (moment.duration(value).format("dd hh mm").replace(/,/g, '').split(" "))
            durationValue.days = formatedValue[0]
            durationValue.hours = formatedValue[1]
            durationValue.minutes = formatedValue[2]
            break;
        case ObjectPropertyFormat.DurationFullShort:
            formatedValue = (moment.duration(value).format("dd hh mm ss").replace(/,/g, '').split(" "))
            durationValue.days = formatedValue[0]
            durationValue.hours = formatedValue[1]
            durationValue.minutes = formatedValue[2]
            durationValue.seconds = formatedValue[3]
            break;
        case ObjectPropertyFormat.DurationHM:
        case ObjectPropertyFormat.DurationHMTime:
            formatedValue = (moment.duration(value).format("hh mm").replace(/,/g, '').split(" "))
            durationValue.hours = formatedValue[0]
            durationValue.minutes = formatedValue[1]
            break;
        case ObjectPropertyFormat.DurationHMSTime:
        case ObjectPropertyFormat.DurationHMS:
            formatedValue = (moment.duration(value).format("hh mm ss").replace(/,/g, '').split(" "))
            durationValue.hours = formatedValue[0]
            durationValue.minutes = formatedValue[1]
            durationValue.seconds = formatedValue[2]
            break;
    }
    return durationValue
}

interface DurationProps {
    props: DurationFieldComponent
    emitter: EventEmitter;
    id: string;
    onChange: (value: string | undefined) => void;
}
export const DurationView: FC<DurationProps> = ({ props, emitter, id, onChange }) => {
    const [access, setAccess] = useState<AccessType>(props.accessType)
    const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>();
    const [days, setDays] = React.useState<string | undefined>();
    const [hours, setHours] = React.useState<string | undefined>();
    const [minutes, setMinutes] = React.useState<string | undefined>();
    const [seconds, setSeconds] = React.useState<string | undefined>();

    if (access == (AccessType.Hidden || AccessType.Undefined)) { return null }

    useEffect(() => {
        emitter.addListener(`${durationEvent}${id}`, onWidgetDataReceived);
        emitter.addListener(`${durationErrors}${id}`, setErrorMessages);

        return () => {
            emitter.removeAllListeners(`${durationEvent}${id}`);
            emitter.removeAllListeners(`${durationErrors}${id}`);
        };
    }, [])

    function onWidgetDataReceived(widgetData: WidgetData) {
        if (widgetData.values.literal) {
            console.log(widgetData.values.literal)
            const formatedValue = durationFormatter(props.dataSourceInfo.format, widgetData.values.literal as string);
            setDays(formatedValue.days);
            setHours(formatedValue.hours);
            setMinutes(formatedValue.minutes);
            setSeconds(formatedValue.seconds);
        };
        if (widgetData.access) {
            setAccess(widgetData.access);
        };
    };

    function updateValues() {
        let ISO = moment.duration(days, "days").add(hours, "hours").add(minutes, "minutes").add(seconds, "seconds").toISOString();
        let duration = durationFormatter(props.dataSourceInfo.format, ISO);
        setDays(duration.days);
        setHours(duration.hours);
        setMinutes(duration.minutes);
        setSeconds(duration.seconds);
        onChange(ISO);
    };

    return (
        <>
            <UpperFieldData
                props={props}
            />
            <View style={{ flexDirection: "row" }}>
                <DurationItem
                    onChange={setDays}
                    rightValue={"д"}
                    onBlur={() => { updateValues(); }}
                    onFocus={() => { }}
                    value={days}
                    editable={access == AccessType.Readonly ? false : true}
                />
                <DurationItem
                    onChange={setHours}
                    rightValue={"ч"}
                    onBlur={() => { updateValues(); }}
                    onFocus={() => { }}
                    value={hours}
                    editable={access == AccessType.Readonly ? false : true}

                />
                <DurationItem
                    onChange={setMinutes}
                    rightValue={"м"}
                    onBlur={() => { updateValues(); }}
                    onFocus={() => { }}
                    value={minutes}
                    editable={access == AccessType.Readonly ? false : true}
                />
                <DurationItem
                    onChange={setSeconds}
                    rightValue={"c"}
                    onBlur={() => { updateValues(); }}
                    onFocus={() => { }}
                    value={seconds}
                    editable={access == AccessType.Readonly ? false : true}
                />
                {(access != AccessType.Readonly) &&
                    <View style={{ flexDirection: "column", marginTop: 15 }}>
                        <Pressable
                            onPress={() => {
                                setDays(undefined)
                                setHours(undefined)
                                setMinutes(undefined)
                                setSeconds(undefined)
                                onChange(undefined)
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                size={18}
                            />
                        </Pressable>
                    </View>
                }
            </View>
        </>
    )
}