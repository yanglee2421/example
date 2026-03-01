import { useTheme } from "@/hooks/useTheme";
import { DateTimePicker, Button } from "@expo/ui/jetpack-compose";
import dayjs from "dayjs";
import React from "react";
import { Modal, ScrollView, Pressable, View } from "react-native";
import { Text } from "@/components/Text";

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
        <Button
          onPress={() => {
            setShow((p) => !p);
          }}
        >
          Begin: {dayjs(begin).format("YYYY/MM/DD")}
        </Button>
        <Modal
          visible={show}
          onRequestClose={() => {
            setShow(false);
          }}
          transparent={false}
          animationType="fade"
          backdropColor={"rgba(0,0,0,.5)"}
          statusBarTranslucent
        >
          <Pressable
            onPress={() => {
              setShow(false);
            }}
            style={{
              height: "100%",

              justifyContent: "center",
              padding: 12,
            }}
          >
            <Pressable>
              <DateTimePicker
                initialDate={begin.toISOString()}
                onDateSelected={(date) => {
                  setBegin(date);
                }}
                displayedComponents="date"
                showVariantToggle={false}
                variant="picker"
                style={{
                  position: "static",

                  height: 520,
                }}
              />
            </Pressable>
          </Pressable>
        </Modal>
        <Button
          onPress={() => {
            setShowEnd((p) => !p);
          }}
        >
          End: {dayjs(end).format("YYYY/MM/DD")}
        </Button>
        <Modal
          visible={showEnd}
          onRequestClose={() => {
            setShowEnd(false);
          }}
          transparent={false}
          animationType="fade"
          backdropColor={"rgba(0,0,0,.5)"}
          statusBarTranslucent
        >
          <Pressable
            onPress={() => {
              setShowEnd(false);
            }}
            style={{
              height: "100%",

              justifyContent: "center",
              padding: 12,
            }}
          >
            <Pressable>
              <DateTimePicker
                initialDate={begin.toISOString()}
                onDateSelected={(date) => {
                  setEnd(date);
                }}
                displayedComponents="date"
                showVariantToggle={false}
                variant="picker"
                style={{
                  position: "static",

                  height: 520,
                }}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
}
