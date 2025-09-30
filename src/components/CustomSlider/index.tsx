import { Slider } from "@mantine/core";

interface CustomSliderProps {
  onChange: (value: number) => void;
  value: number;
}

const CustomSlider = ({ onChange, value }: CustomSliderProps) => {
  return (
    <Slider
      onChange={onChange}
      // color={customColors.primary.background}
      min={10000}
      max={300000}
      w={"70%"}
      value={value}
    />
  );
};

export default CustomSlider;
