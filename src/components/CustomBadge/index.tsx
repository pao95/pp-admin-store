import { Badge } from "@mantine/core";
import { makeStyles } from "./styles";

export const CustomBadge = ({ color = "default", children }: { color?: string; children: React.ReactNode }) => {
  const styles = makeStyles(color);
  return <Badge style={styles.badge}>{children}</Badge>;
};
