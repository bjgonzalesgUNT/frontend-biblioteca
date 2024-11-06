import { Summary1Model } from "./summary-1.model";
import { TimestampModel } from "./timestamp.model";

export interface Summary2Model extends TimestampModel {
  id: number;
  code: string;
  summary_1_id: number;
  description: string;
  summary1: Summary1Model;
}
