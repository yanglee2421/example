import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type TextProps = RNTextProps & {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
};

export const Text = (props: TextProps) => {
  const theme = useTheme();
  const { variant, style, ...rest } = props;
  const variantStyle = theme.typography[variant || "body1"];

  return (
    <RNText
      style={[variantStyle, { color: theme.palette.text.primary }, style]}
      {...rest}
    />
  );
};
