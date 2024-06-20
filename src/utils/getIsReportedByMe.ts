import { isReportedByMe } from "@amityco/ts-sdk";
import { ReportableReference } from "../types";

const getIsReportedByMe = async ({
  referenceType,
  referenceID,
}: {
  referenceType: ReportableReference;
  referenceID: string;
}) => {
  const isReported = await isReportedByMe(referenceType, referenceID);
  return isReported;
};

export default getIsReportedByMe;
