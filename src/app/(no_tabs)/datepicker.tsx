import { AppHeader } from "@/components/app-header";
import { Column, Host, Icon, Row, Text } from "@expo/ui";
import {
  Card,
  DatePickerDialog,
  IconButton,
  OutlinedTextField,
  Surface,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth, padding } from "@expo/ui/jetpack-compose/modifiers";
import dayjs from "dayjs";
import React from "react";
import { scheduleOnUI } from "react-native-worklets";

interface DateFieldProps {
  value: Date;
  onChange: (date: Date) => void;
  label: string;
  helperText: string;
}

const DateField = (props: DateFieldProps) => {
  const { value, onChange, label, helperText } = props;

  const [show, setShow] = React.useState(false);

  const nativeText = useNativeState(value.toLocaleDateString());

  const handleChange = React.useCallback(
    (text: string) => {
      "worklet";
      nativeText.value = text;
    },
    [nativeText],
  );

  return (
    <>
      <OutlinedTextField
        value={nativeText}
        onValueChange={handleChange}
        readOnly
        singleLine
        modifiers={[fillMaxWidth()]}
      >
        <OutlinedTextField.Label>
          <Text>{label}</Text>
        </OutlinedTextField.Label>
        <OutlinedTextField.Placeholder>
          <Text>Placeholder</Text>
        </OutlinedTextField.Placeholder>
        <OutlinedTextField.SupportingText>
          <Text>{helperText}</Text>
        </OutlinedTextField.SupportingText>
        <OutlinedTextField.TrailingIcon>
          <IconButton onClick={() => setShow(true)}>
            <Icon
              name={Icon.select({
                ios: "0.circle",
                android: import("@expo/material-symbols/event.xml"),
              })}
            />
          </IconButton>
        </OutlinedTextField.TrailingIcon>
      </OutlinedTextField>
      {show && (
        <DatePickerDialog
          onDismissRequest={() => {
            setShow(false);
          }}
          initialDate={value.toISOString()}
          onDateSelected={(date) => {
            onChange(date);
            setShow(false);
            scheduleOnUI(handleChange, date.toLocaleDateString());
          }}
        />
      )}
    </>
  );
};

export default function DatePickerPage() {
  const [begin, setBegin] = React.useState(() => new Date());
  const [end, setEnd] = React.useState(() => new Date());

  const calcDayCount = (begin: Date, end: Date) => {
    const count = dayjs(end).diff(dayjs(begin), "day") + 1;

    return count;
  };

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column spacing={12}>
          <AppHeader pageName="Date Picker" />
          <Card modifiers={[padding(12, 0, 12, 0), fillMaxWidth()]}>
            <Column style={{ padding: 12 }}>
              <Text textStyle={{ fontSize: 20 }}>
                {`共${calcDayCount(begin, end)}天`}
              </Text>
            </Column>
          </Card>
          <Row style={{ paddingHorizontal: 12, paddingVertical: 0 }}>
            <DateField
              value={begin}
              onChange={setBegin}
              label="开始日期"
              helperText="请选择开始日期"
            />
          </Row>
          <Row style={{ paddingHorizontal: 12, paddingVertical: 0 }}>
            <DateField
              value={end}
              onChange={setEnd}
              label="结束日期"
              helperText="请选择结束日期"
            />
          </Row>
        </Column>
      </Surface>
    </Host>
  );
}
