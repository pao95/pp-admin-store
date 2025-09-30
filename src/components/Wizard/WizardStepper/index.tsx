import { Box, Image, Text } from "@mantine/core";

import { translate } from "../../../hooks/useTranslator";
import { wizardStepperStyles } from "./styles";
import CustomTitle from "../../CustomTitle";
import LogoSimple from "../../../assets/images/logo-simple.svg";

const WizardStepper = ({
  steps,
  currentStep,
}: {
  steps: any[];
  currentStep: number;
  onStepChange: (step: number) => void;
}) => {
  const t = translate();
  const styles = wizardStepperStyles();

  return (
    <Box style={styles.container}>
      <CustomTitle type="title1">{t("store.register.title")}</CustomTitle>

      <Box style={styles.menuList}>
        {steps.map((item) => (
          <Box style={styles.stepperItem} key={item.step}>
            <Box style={currentStep >= item.step ? styles.iconCircleCompleted : styles.iconCircle}>
              <Text style={currentStep >= item.step ? styles.iconTextCompleted : styles.iconText}>{item.step}</Text>
            </Box>
            <Text style={styles.label}>{t(item.label)}</Text>
          </Box>
        ))}
      </Box>

      <Box style={styles.logoContainer}>
        <Image src={LogoSimple} w="55%" />
      </Box>
    </Box>
  );
};

export default WizardStepper;
