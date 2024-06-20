import { useState } from "react";

import { ReportableReference } from "../types";
import createReport from "../utils/createReport";

const ReportButton = ({
  referenceType,
  referenceID,
}: {
  referenceType: ReportableReference;
  referenceID: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <button
      className="report-button"
      onClick={async () => {
        setIsLoading(true);
        await createReport({ referenceType, referenceID });
        setIsLoading(false);
      }}
      disabled={isLoading}
    >
      Report
    </button>
  );
};

export default ReportButton;
