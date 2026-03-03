import { View, ViewProps } from "react-native";
import { c } from "@/lib/styles";

type CardProps = ViewProps;

export const Card = ({ style, ...rest }: CardProps) => (
  <View style={[c.shadow_md, style]} {...rest} />
);
