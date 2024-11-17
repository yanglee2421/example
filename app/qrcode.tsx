import { Button, Card, FAB, makeStyles, useTheme } from "@rneui/themed";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { View } from "react-native";
import { setStringAsync } from "expo-clipboard";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";

export default function Qrcode() {
  const [data, setData] = React.useState("");
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const styles = useStyles();
  const { theme } = useTheme();

  const copy = useMutation<boolean, Error, string>({
    async mutationFn(data) {
      const ok = await setStringAsync(data);

      if (ok) {
        return ok;
      }

      throw new Error("copy failed");
    },
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <Loading />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Card>
          <Card.FeaturedTitle style={{ color: theme.colors.black }}>
            Need Permission
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
            We need your permission to show the camera
          </Card.FeaturedSubtitle>
          <Button onPress={requestPermission}>grant permission</Button>
        </Card>
      </View>
    );
  }

  if (data) {
    return (
      <View>
        <Card>
          <Card.Title style={{ color: theme.colors.black }}>QR Code</Card.Title>
          <Card.FeaturedSubtitle style={{ color: theme.colors.secondary }}>
            {data}
          </Card.FeaturedSubtitle>
          <Button
            icon={{
              name: "content-copy",
              type: "material-community",
              color: "#fff",
            }}
            onPress={() => copy.mutate(data)}
            loading={copy.isPending}
          >
            Copy
          </Button>
        </Card>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={(res) => setData(res.data)}
        style={styles.cameraView}
      >
        <FAB
          onPress={toggleCameraFacing}
          icon={{ name: "camera-flip-outline", type: "material-community" }}
          color="#fff"
          size="large"
          style={styles.fab}
        />
      </CameraView>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
  fab: {
    marginBlockStart: "auto",
    marginBlockEnd: 64,
    shadowColor: "red",
    shadowOpacity: 0,
    shadowRadius: 99999,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
    boxShadow: "none",
  },
  empty: {
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
  },
}));
