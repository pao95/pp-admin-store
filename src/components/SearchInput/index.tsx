import { Flex } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import IconButton from "../IconButton";
import CustomInput from "../CustomInput";
import { makeStyles } from "./styles";

interface SearchInputProps {
  handleSearch: (query: string) => void;
  placeholder?: string;
  search: string;
  setSearch: (value: string) => void;
}

export const SearchInput = ({ placeholder, search, handleSearch, setSearch }: SearchInputProps) => {
  const styles = makeStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(search.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <Flex style={styles.inputContainer}>
        <CustomInput
          label=""
          variant="default"
          placeholder={placeholder}
          style={styles.input}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </Flex>
      <Flex>
        <IconButton
          variant="transparent"
          size="md"
          icon={<IconSearch />}
          color="primary"
          onClick={() => handleSearch(search.trim())}
        />
      </Flex>
    </form>
  );
};
