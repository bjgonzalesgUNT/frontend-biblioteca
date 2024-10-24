import { Summary2Model } from "./summary-2.model";
import { TimestampModel } from "./timestamp.model";

export interface Summary3Model extends TimestampModel {
  id: number;
  summary_2_id: number;
  code: string;
  description: string;
  summary2: Summary2Model;
}
