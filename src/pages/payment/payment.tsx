// Stripe Imports
import { StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";

// RN Imports
import { Alert, Button, StyleSheet, Text, View } from "react-native";

// API Imports
// import { useCreatePaymentIntent } from "@/hooks/api-stripe";

export function Payment() {
  const publishableKey =
    "pk_test_51Ndm80IkSBLJkZjEn12WIA7SFaWsSLgWSouTzG1tIaGhmIh3yMquZQZvxFwjrIwRrsNYDbytyJkrLAI0qZmlU8V300eeL8V4bR";

  return (
    <StripeProvider publishableKey={publishableKey}>
      <PaymentApp />
    </StripeProvider>
  );
}

function PaymentApp() {
  const { loading, confirmPayment } = useConfirmPayment();

  //   const { mutateAsync } = useCreatePaymentIntent();

  const handleConfirm = async () => {
    try {
      //   const { client_secret } = await mutateAsync({
      //     data: {
      //       amount: 8,
      //       currency: "hkd",
      //     },
      //   });
      const client_secret =
        "pi_3OAOLwIkSBLJkZjE2zAp1Uvx_secret_efAVP4iYEe9WCCrxKkZPtjBJM";
      const { error, paymentIntent } = await confirmPayment(client_secret, {
        paymentMethodType: "Alipay",
      });

      if (error) {
        Alert.alert("Error", error.message);
      }

      if (paymentIntent) {
        Alert.alert("Success", paymentIntent.currency);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Button title="Pay with Alipay" onPress={handleConfirm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
