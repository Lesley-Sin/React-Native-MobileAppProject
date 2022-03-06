import moment from "moment";
import React, { SetStateAction, useState, FC, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { AccessType } from "../../Enums/AccessType";
import DateTimePicker, {
  AndroidMode,
} from "@react-native-community/datetimepicker";
import { DataPicker } from "./DateTimeViewStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt, faClock, faBan, faTimes } from "@fortawesome/pro-light-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { ILabel } from "../../Interfaces/ILabel";
import { Divider, FormControl } from "native-base";
import { colorScheme, margins } from "../../../globalStyles/constants";
import { StyledText } from "../../Typography/StyledTypography";
import { IDateColors } from "./interfaces/dataColors";
import { flexBoxRow } from "../../../globalStyles/flexBox";
import { StyledFormControlLabel } from "../../Form/Form";
import { EventEmitter } from "events";
import { updateDate, dateTiemErrors } from "./Events";
import { HelperText } from "../../HelperText/HelperText";
import { TextContainer } from "../CheckBox/Boolean/Boolean";
import { ObjectPropertyFormat } from "../../Enums/ObjectPropertyFirmat";
import { DateTimeFormater } from "../../../DateTimeFormater.ts/DateTimeFormatter";
import { WidgetData } from "../../Interfaces/DataformWidgetsQuery";

export const viewStyle = (access: AccessType): IDateColors => {
  switch (access) {
    case AccessType.Readonly: {
      return {
        backgroundColor: colorScheme.dateColors.background.readonly,
        textColor: colorScheme.dateColors.text.readonly,
        iconColor: colorScheme.dateColors.icon.readonly,
      };
    }
    default:
      return {
        backgroundColor: colorScheme.dateColors.background.normal,
        textColor: colorScheme.dateColors.text.normal,
        iconColor: colorScheme.dateColors.icon.normal,
        borderColor: colorScheme.dateColors.border.normal,
      };
  }
};

interface IDateTimePickerView {
  dataType: string;
  icon: IconDefinition;
  dateString: string | undefined;
  show: boolean;
  access: AccessType;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date | undefined;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  placeholder: string;
}

export const DateTimePickerView: FC<IDateTimePickerView> = ({
  dataType,
  icon,
  dateString,
  show,
  setShow,
  currentDate,
  setCurrentDate,
  access,
  placeholder
}) => {

  return (
    <>
      <Pressable
        style={[flexBoxRow.default, { paddingTop: 10, paddingBottom: 10 }]}
        onPress={() => {
          access !== AccessType.Readonly && setShow(true);
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          size={18}
          color={viewStyle(access).iconColor}
          style={{ marginRight: 10 }}
        />
        <StyledText color={viewStyle(access).textColor}>
          {dateString ?? placeholder}
        </StyledText>
      </Pressable>

      {show && (
        <DateTimePicker
          value={currentDate == undefined ? new Date() : new Date(currentDate)}
          mode={dataType as AndroidMode | undefined}
          display="default"
          onChange={(e: { type: string }, date: Date | undefined) => {
            if (e.type === "dismissed") {
              setShow(false);
            }
            if (e.type === "set") {
              setShow(false);
              setCurrentDate(date); // баг, нужно было два раза нажать на ок, чтобы Picker пропал
            }
          }}
        />
      )}
    </>
  );
};

interface DateOrTime {
  data: Date | undefined,
  dateTimeFormat: ObjectPropertyFormat,
  accessType: AccessType,
  emitter: EventEmitter,
  id: string,
  displayType: "date" | "time",
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  currentDate: Date | undefined,
  setErrors: (e: JSX.Element | undefined) => void
}

//TODO валидация req
const DateOrTimePicker: FC<DateOrTime> = ({ dateTimeFormat, accessType, emitter, id, displayType, setCurrentDate, currentDate, setErrors }) => {
  const [show, setShow] = useState(false);
  const [access, setAccess] = useState<AccessType>(accessType)
  const { date, time } = DateTimeFormater.getFormatedDate(dateTimeFormat, currentDate);

  useEffect(() => {
    emitter.addListener(`${dateTiemErrors}${id}`, onWidgetErrorsReceived);
    emitter.addListener(`${updateDate}${id}`, onWidgetDataReceived);

    return () => {
      emitter.removeAllListeners(`${dateTiemErrors}${id}`);
      emitter.removeAllListeners(`${updateDate}${id}`);
    };
  }, []);

  function onWidgetDataReceived(widgetData: WidgetData) {
    if (widgetData.values.literal) {
      setCurrentDate(widgetData.values.literal as Date | undefined);
    };
    if (widgetData.access) {
      setAccess(widgetData.access);
    };
  };

  function onWidgetErrorsReceived(v: JSX.Element) {
    setErrors(v);
  };

  return (
    <>
      <DateTimePickerView
        currentDate={currentDate}
        dataType={displayType}
        dateString={displayType == "date" ? date : time}
        icon={displayType == "date" ? faCalendarAlt : faClock}
        setCurrentDate={setCurrentDate}
        setShow={setShow}
        show={show}
        access={access}
        placeholder={displayType == "date" ? "Дата" : "Время"} //TODO Localize it!
      />
    </>
  )

}

const checkFormat = (format: ObjectPropertyFormat) => {
  // let time = null;
  // let date = null;
  let isTime = false;
  if (
    format === ObjectPropertyFormat.CondensedDateTime ||
    format === ObjectPropertyFormat.ShortDateShortTime ||
    format === ObjectPropertyFormat.ShortDateLongTime ||
    format === ObjectPropertyFormat.LongDateShortTime ||
    format === ObjectPropertyFormat.LongDateLongTime ||
    format === ObjectPropertyFormat.DateTimeISO
  ) {
    return !isTime;
  }
  return isTime;
};

interface IWrappedView {
  format: ObjectPropertyFormat;
  date: Date | undefined;
  access: AccessType;
  label: ILabel;
  emitter: EventEmitter;
  id: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  currentDate: Date | undefined;
  helpText: TextContainer;
}
//TODO Localize it!
const DateTimeWrappedView: FC<IWrappedView> = ({
  format,
  date,
  access,
  label,
  emitter,
  id,
  setCurrentDate,
  currentDate,
  helpText,
}) => {
  let timeUi = <View />;
  const [errorMessages, setErrorMessages] = useState<JSX.Element | undefined>()

  if (checkFormat(format)) {
    timeUi = (
      <>
        <Divider
          orientation="vertical"
          width={0.5}
          style={{
            backgroundColor: colorScheme.dateColors.border.normal,
            marginLeft: margins.deafaultMargins,
            marginRight: margins.deafaultMargins,
          }}
        />
        <DateOrTimePicker setErrors={(v) => setErrorMessages(v)} data={date} dateTimeFormat={format} access={access} emitter={emitter} id={id} displayType={"time"} setCurrentDate={setCurrentDate} currentDate={currentDate} />
      </>
    );
  }

  const dateUi = (
    <DateOrTimePicker setErrors={(v) => setErrorMessages(v)} data={date} dateTimeFormat={format} access={access} emitter={emitter} id={id} displayType={"date"} setCurrentDate={setCurrentDate} currentDate={currentDate} />
  );

  let content = (
    <>
      <View style={{ flexDirection: "row" }}>
        <StyledFormControlLabel>{label.text.ru}</StyledFormControlLabel>
        <HelperText textContainer={helpText} style={{ flexDirection: "row" }} />
        {errorMessages}
      </View>
      <DataPicker
        backgroundColor={viewStyle(access).backgroundColor}
        borderColor={viewStyle(access).borderColor}
      >
        {dateUi}
        {timeUi}
      </DataPicker>
    </>
  )
  switch (access) {
    case AccessType.Undefined: {
      return <View />;
    }
    case AccessType.Hidden: {
      return <View />
    }
    case AccessType.Readonly: {
      return (
        <FormControl isReadOnly={true} isInvalid={false}>
          {content}
        </FormControl>
      );
    }
    case AccessType.Required: {
      return (
        <FormControl isRequired={true} isInvalid={false} >
          {content}
        </FormControl>
      );
    }
    case AccessType.Editable: {
      return (
        <FormControl isInvalid={false}>
          {content}
        </FormControl>
      );
    }
    default:
      return <View />;
  }
};

interface DateTimeViewProps {
  format: ObjectPropertyFormat;
  accessType: AccessType
  emitter: EventEmitter
  id: string
  label: ILabel
  helpText: TextContainer
  setValue: (v: Date | undefined) => void
}
export const DateTimeView = ({ format, accessType, emitter, id, label, helpText, setValue }: DateTimeViewProps) => {
  const [data, setData] = useState<Date | undefined>(/* date */);

  let showDelButton = true
  if (accessType == AccessType.Readonly || accessType == AccessType.Hidden) {
    showDelButton = false
  }
  setValue(data)
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <DateTimeWrappedView
          format={format}
          date={data}
          currentDate={data}
          access={accessType}
          emitter={emitter}
          id={id}
          setCurrentDate={setData}
          label={label}
          helpText={helpText}
        />
      </View>
      <View style={{ marginTop: 37, marginLeft: 12 }}>
        {showDelButton && <Pressable
          onPress={() => setData(undefined)}
        >
          <FontAwesomeIcon
            icon={faTimes}
            size={18}
          />
        </Pressable>}
      </View>
    </View>
  )
}