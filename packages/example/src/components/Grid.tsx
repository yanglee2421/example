import React from "react";
import { useWindowDimensions, View, ViewProps } from "react-native";

export const itemSize = (
  totalWidth: number,
  columns: number,
  span: number,
  spacing: number,
) => {
  const perColSize = totalWidth / columns;
  const preSpacing = spacing / columns;
  const spanSize = perColSize * span;
  const restSpan = columns - span;

  return spanSize - restSpan * preSpacing;
};

const GridContext = React.createContext({
  totalWidth: 0,
  columns: 0,
  spacing: 0,
});

type ContainerProps = React.PropsWithChildren<{
  viewProps?: ViewProps;
  spacing?: number;
  columns?: number;
}>;

const Container = (props: ContainerProps) => {
  const { viewProps = {}, spacing = 0, columns = 12 } = props;

  const [width, setWidth] = React.useState(0);

  return (
    <View
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
      }}
      style={{
        borderWidth: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing,
      }}
      {...viewProps}
    >
      <GridContext
        value={{
          columns,
          spacing,
          totalWidth: width,
        }}
      >
        {props.children}
      </GridContext>
    </View>
  );
};

type ItemProps = React.PropsWithChildren<{
  viewProps?: ViewProps;
  xs?: number;
}>;

const Item = (props: ItemProps) => {
  const { xs = 1, children, viewProps = {} } = props;

  const ctx = React.useContext(GridContext);

  useWindowDimensions();

  return (
    <View
      style={{
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: "auto",
        width: itemSize(ctx.totalWidth, ctx.columns, xs, ctx.spacing),
        borderWidth: 0,
      }}
      {...viewProps}
    >
      {children}
    </View>
  );
};

type GridProps = React.PropsWithChildren<{
  container?: boolean;
  viewProps?: ViewProps;
  spacing?: number;
  columns?: number;
  xs?: number;
}>;

export const Grid = (props: GridProps) => {
  const { container, viewProps, spacing, columns, xs, children } = props;

  if (container) {
    return (
      <Container viewProps={viewProps} spacing={spacing} columns={columns}>
        {children}
      </Container>
    );
  }

  return (
    <Item viewProps={viewProps} xs={xs}>
      {children}
    </Item>
  );
};
