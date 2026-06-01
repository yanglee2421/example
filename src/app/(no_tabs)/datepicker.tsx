import { AppHeader } from "@/components/app-header";
import { Column, Host, Icon, Text } from "@expo/ui";
import {
  DatePickerDialog,
  DateTimePicker,
  IconButton,
  OutlinedTextField,
  Surface,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import React from "react";
import { runOnUISync } from "react-native-worklets";

export default function DatePickerPage() {
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());

  const [show, setShow] = React.useState(false);
  const nativeText = useNativeState(selectedDate.toLocaleDateString());
  const handleChange = React.useCallback(
    (v: string) => {
      "worklet";
      nativeText.value = v;
    },
    [nativeText],
  );

  return (
    <Host style={{ flex: 1 }}>
      <Surface>
        <Column>
          <AppHeader pageName="Date Picker" />
          <OutlinedTextField
            value={nativeText}
            onValueChange={handleChange}
            readOnly
            singleLine
            modifiers={[fillMaxWidth()]}
          >
            <OutlinedTextField.Label>
              <Text>label</Text>
            </OutlinedTextField.Label>
            <OutlinedTextField.Placeholder>
              <Text>Placeholder</Text>
            </OutlinedTextField.Placeholder>
            <OutlinedTextField.SupportingText>
              <Text>SupportingText</Text>
            </OutlinedTextField.SupportingText>
            <OutlinedTextField.LeadingIcon>
              <IconButton>
                <Icon
                  name={Icon.select({
                    ios: "0.circle",
                    android: import("@expo/material-symbols/account_tree.xml"),
                  })}
                />
              </IconButton>
            </OutlinedTextField.LeadingIcon>
            <OutlinedTextField.TrailingIcon>
              <IconButton onClick={() => setShow(true)}>
                <Icon
                  name={Icon.select({
                    ios: "0.circle",
                    android:
                      import("@expo/material-symbols/calendar_month.xml"),
                  })}
                />
              </IconButton>
            </OutlinedTextField.TrailingIcon>
            <OutlinedTextField.Prefix>
              <Text>$</Text>
            </OutlinedTextField.Prefix>
            <OutlinedTextField.Suffix>
              <Text>USD</Text>
            </OutlinedTextField.Suffix>
          </OutlinedTextField>
        </Column>
        {show && (
          <DatePickerDialog
            onDismissRequest={() => {
              setShow(false);
            }}
            initialDate={selectedDate.toISOString()}
            onDateSelected={(date) => {
              setSelectedDate(date);
              setShow(false);
              const dateString = date.toLocaleDateString();

              runOnUISync(() => {
                handleChange(dateString);
              });
            }}
          />
        )}
        <>
          {false && (
            <DateTimePicker
              initialDate={selectedDate.toISOString()}
              onDateSelected={(date) => {
                setSelectedDate(date);
              }}
              displayedComponents="date"
              variant="picker"
            />
          )}
        </>
      </Surface>
    </Host>
  );
}
