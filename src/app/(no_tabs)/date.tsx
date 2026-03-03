import { Text } from "@/components/Text";
import { useTheme } from "@/hooks/useTheme";
import { Button, DateTimePicker, Host } from "@expo/ui/jetpack-compose";
import dayjs from "dayjs";
import React from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";

export default function Page() {
  const [show, setShow] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [begin, setBegin] = React.useState(() => new Date());
  const [end, setEnd] = React.useState(() => new Date());

  const result = dayjs(end).diff(dayjs(begin), "day") + 1;

  const theme = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: theme.spacing(3),
        }}
      >
        <Text>{result}</Text>
        <Host matchContents>
          <Button
            onPress={() => {
              setShow((p) => !p);
            }}
          >
            Begin: {dayjs(begin).format("YYYY/MM/DD")}
          </Button>
        </Host>
        <Host matchContents>
          <Button
            onPress={() => {
              setShowEnd((p) => !p);
            }}
          >
            End: {dayjs(end).format("YYYY/MM/DD")}
          </Button>
        </Host>
        <Modal
          visible={show}
          onRequestClose={() => {
            setShow(false);
          }}
          transparent={false}
          backdropColor={`rgba(0,0,0,.5)`}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setShow(false);
            }}
          >
            <Host matchContents>
              <DateTimePicker
                initialDate={begin.toISOString()}
                onDateSelected={(date) => {
                  setBegin(date);
                }}
                displayedComponents="date"
                variant="picker"
              />
            </Host>
          </Pressable>
        </Modal>
        <Modal
          visible={showEnd}
          onRequestClose={() => {
            setShowEnd(false);
          }}
          transparent={false}
          backdropColor={`rgba(0,0,0,.5)`}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setShowEnd(false);
            }}
          >
            <Host matchContents>
              <DateTimePicker
                initialDate={end.toISOString()}
                onDateSelected={(date) => {
                  setEnd(date);
                }}
                displayedComponents="date"
                variant="picker"
              />
            </Host>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
}
