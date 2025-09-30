import { Box, Container } from "@mantine/core";
import { wizardStyles } from "./styles";
import WizardStepper from "./WizardStepper";

export const Wizard = ({
  steps,
  currentStep,
  onStepChange,
  children,
  renderButtons,
}: {
  steps: any[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  renderButtons: () => React.ReactNode;
}) => {
  const styles = wizardStyles();

  return (
    <Container size={"xl"}>
      <Box style={styles.container}>
        <Box style={styles.sideMenuWrapper}>
          <WizardStepper steps={steps} currentStep={currentStep} onStepChange={onStepChange} />
        </Box>
        <Box style={styles.contentWrapper}>
          <Box size={"xl"} style={styles.containerContent}>
            {children}
          </Box>
          <Box size={"xl"} mt="md" mb="xl">
            {renderButtons()}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
