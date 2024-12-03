import { Summary3Model } from "@/models";
import { SummariesService } from "@/services";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

interface Props {
  selectedSummaries2: string[];
  setSelectedSummaries2: (value: string[]) => void;
}

export const SidebarWrapper = ({
  selectedSummaries2,
  setSelectedSummaries2,
}: Props) => {
  const [summaries3, setSummaries3] = useState<Summary3Model[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showMore, setShowMore] = useState<boolean>(false);

  const s2 = useMemo(() => {
    return showMore ? summaries3.slice(0, 20) : summaries3.slice(0, 10);
  }, [showMore, summaries3]);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const summaries3 = await SummariesService.getS3();
      setSummaries3(summaries3);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="hidden md:flex md:flex-col md:gap-y-4">
      {/* Categorías */}
      <Card fullWidth className="p-2">
        <CardHeader>
          <h2 className="text-lg font-bold">CATEGORÍAS</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <Skeleton
            className={clsx(isLoading ? "w-full rounded-lg py-2" : null)}
            isLoaded={!isLoading}
          >
            <CheckboxGroup
              value={selectedSummaries2}
              onValueChange={setSelectedSummaries2}
            >
              {s2.map((summary2) => (
                <Checkbox
                  key={summary2.id}
                  value={summary2.id.toString()}
                  className="capitalize"
                >
                  {summary2.description.toLowerCase()}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <Button
              variant="light"
              onPress={() => setShowMore(!showMore)}
              fullWidth
              className="mt-2"
            >
              {showMore ? "Ver menos" : "Ver más"}
            </Button>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};
