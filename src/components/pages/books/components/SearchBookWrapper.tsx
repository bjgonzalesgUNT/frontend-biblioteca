import { useDebounced } from "@/hooks";
import { Input } from "@nextui-org/react";
interface Props {
  filter: string;
  setFilter: (value: string) => void;
}

export const SearchBookWrapper = ({ filter, setFilter }: Props) => {
  const { value, setValue } = useDebounced({
    load: ({ value }) => {
      setFilter(value.trim().toUpperCase());
    },
    initValue: filter,
  });

  return (
    <div className="col-span-full pb-4 pt-2">
      <div className="flex items-center justify-center">
        <Input
          className="max-w-xl"
          variant="bordered"
          placeholder="Buscar libro"
          size="lg"
          radius="lg"
          value={value}
          onValueChange={setValue}
          isClearable
        />
      </div>
    </div>
  );
};
