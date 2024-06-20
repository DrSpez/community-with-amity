import { createReport as createReportSDK } from "@amityco/ts-sdk";

import { ReportableReference } from "../types";

const createReport = async ({
  referenceType,
  referenceID,
}: {
  referenceType: ReportableReference;
  referenceID: string;
}) => {
  const success = await createReportSDK(referenceType, referenceID);

  return success;
};

export default createReport;
