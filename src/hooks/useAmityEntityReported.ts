import { useEffect, useState } from "react";

import { ReportableReference } from "../types";

import getIsReportedByMe from "../utils/getIsReportedByMe";

const useAmityEntityReported = ({
  referenceType,
  referenceID,
  flagCount,
}: {
  referenceType: ReportableReference;
  referenceID: string;
  flagCount: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isReportedByMe, setIsReportedByMe] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getAlreadyReported = async () => {
      const alreadyReported = await getIsReportedByMe({
        referenceID,
        referenceType,
      });
      setIsReportedByMe(alreadyReported);
    };
    getAlreadyReported();
    setIsLoading(false);
  }, [referenceType, referenceID, flagCount]); // NOTE: flagCount is essential here because we need to trigger the recheck after the report is done and make the button disappear

  return { isReportedByMe, isLoading };
};

export default useAmityEntityReported;
