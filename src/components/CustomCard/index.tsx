import { Card, Text, Group, Box } from "@mantine/core";
import { getCustomCardStyles } from "./styles";
import CustomButton from "../CustomButton";

interface CustomCardProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
}

const CustomCard = ({ title, onClick, disabled = false, description, buttonText, icon }: CustomCardProps) => {
  const styles = getCustomCardStyles();

  return (
    <Card
      padding="md"
      radius="lg"
      withBorder
      style={{
        ...styles.card,
      }}
      onClick={disabled ? undefined : onClick}
    >
      <Group>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Box>{icon}</Box>
          <Box style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "space-between" }}>
            <Text style={styles.title} mt="auto">
              {title}
            </Text>
            <Text style={styles.description} mt="auto">
              {description}
            </Text>
            <CustomButton title={buttonText} onClick={onClick} disabled={disabled} variant="light" />
          </Box>
        </div>
      </Group>
    </Card>
  );
};

export default CustomCard;
