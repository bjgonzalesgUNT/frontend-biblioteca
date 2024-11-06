import { useDebounced } from "@/hooks";
import { Input } from "@nextui-org/react";

interface Props {
  handleChangeValue: (value: string) => void;
}

export const SearchBook = ({ handleChangeValue }: Props) => {
  const { value, setValue } = useDebounced({
    load: ({ value }) => {
      handleChangeValue(value.toUpperCase());
    },
  });

  return (
    <Input
      classNames={{
        input: "w-full",
        mainWrapper: "w-full",
      }}
      isClearable
      placeholder="Buscar libro"
      value={value}
      onValueChange={setValue}
    />
  );
};
