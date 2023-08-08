import { Stack } from "@mui/material";

export default function RowStack({ children, ...rest }) {
  return (
    <Stack
      width="100%"
      direction="row"
      spacing={3}
      alignItems="center"
      {...rest}
    >
      {children.length > 0 &&
        children.map((childNode, index) => {
          const w = childNode?.props?.width || "50%";
          return (
            <Stack key={index} width={w}>
              {childNode}
            </Stack>
          );
        })}
    </Stack>
  );
}
