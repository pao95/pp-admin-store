import { Pagination } from "@mantine/core";
import { makeStyles } from "./styles";
import { customColors } from "../../themes/customColors";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const CustomPagination = ({ currentPage, totalPages, onPageChange, disabled = false }: CustomPaginationProps) => {
  const styles = makeStyles();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={styles.container}>
      <Pagination
        total={totalPages}
        value={currentPage + 1}
        onChange={(page) => onPageChange(page - 1)}
        disabled={disabled}
        size="md"
        radius="md"
        withEdges
        withControls
        color={customColors.primary.primary700}
      />
    </div>
  );
};

export default CustomPagination;
