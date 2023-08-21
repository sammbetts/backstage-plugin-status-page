import React from "react";
import {
  StyledTableRow,
  StyledTableExpandedRow,
  convertToUKDateTimeFormat,
} from "../StyledTable";
import CircleCI from "../../assets/circleci.png";

export const CircleCIStatus: React.FC = () => {
  const [statusData, setStatusData] = React.useState<any | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch("https://status.circleci.com/api/v2/summary.json")
      .then((response) => response.json())
      .then((data) => {
        const { status, page, incidents } = data;
        setStatusData({
          status: status.description,
          updated: page.updated_at,
          incidents: incidents,
        });
      })
      .catch((error) => {
        <div>Error fetching CircleCI service status: {error}</div>;
      });
  }, []);

  return (
    <>
      {statusData ? (
        <StyledTableRow
          service="CircleCI"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://status.circleci.com/"
          logo={CircleCI}
          incidents={
            statusData.status === "All Systems Operational" ? false : true
          }
          onToggle={handleToggle}
        />
      ) : null}
      {statusData?.incidents.map((incident: any) => (
        <StyledTableExpandedRow
          key={incident.incident_id}
          service={incident.components[0].name}
          status={
            <>
              {incident.name}:<br></br>
              {incident.incident_updates[0].body}
            </>
          }
          updated={convertToUKDateTimeFormat(incident.updated_at)}
          link=""
          isOpen={open}
        />
      ))}
    </>
  );
};
