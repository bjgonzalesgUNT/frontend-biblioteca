import { useDebounced } from "@/hooks";
import { Input } from "@nextui-org/react";

interface Props {
  handleSearchChange: (value: string) => void;
}

export const SearchAuthor = ({ handleSearchChange }: Props) => {
  const { value: inputValue, setValue: setInputValue } = useDebounced({
    load: ({ value }) => {
      handleSearchChange(value.toUpperCase());
    },
  });

  return (
    <Input
      classNames={{
        input: "w-full",
        mainWrapper: "w-full",
      }}
      placeholder="Buscar autor"
      value={inputValue}
      onValueChange={setInputValue}
    />
  );
};
