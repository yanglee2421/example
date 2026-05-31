import { Icon, Row, Spacer, Text } from "@expo/ui";
import { HorizontalDivider, IconButton } from "@expo/ui/jetpack-compose";
import { useRouter } from "expo-router";

interface AppHeaderProps {
  pageName: string;
  showBack?: boolean;
}

export const AppHeader = (props: AppHeaderProps) => {
  const { pageName, showBack = true } = props;

  const router = useRouter();

  return (
    <>
      <Row style={{ paddingVertical: 8 }} alignment="center">
        {showBack ? (
          <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <Icon
              name={Icon.select({
                ios: "0.circle",
                android: import("@expo/material-symbols/arrow_left_alt.xml"),
              })}
            />
          </IconButton>
        ) : (
          <Spacer size={16} />
        )}
        <Text textStyle={{ fontSize: 24 }}>{pageName}</Text>
        <Spacer flexible />
        <IconButton>
          <Icon
            name={Icon.select({
              ios: "0.circle",
              android: import("@expo/material-symbols/more_vert.xml"),
            })}
          />
        </IconButton>
      </Row>
      <HorizontalDivider />
    </>
  );
};
