import { useDebounced } from "@/hooks";
import { Input } from "@nextui-org/react";

interface Props {
  handleSearchChange: (value: string) => void;
}

export const SearchPublisher = ({ handleSearchChange }: Props) => {
  const { value, setValue } = useDebounced({
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
      placeholder="Buscar editorial"
      value={value}
      onValueChange={setValue}
    />
  );
};
