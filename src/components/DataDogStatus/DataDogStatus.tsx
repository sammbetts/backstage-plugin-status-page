import React from "react";
import {
  StyledTableRow,
  StyledTableExpandedRow,
  convertToUKDateTimeFormat,
} from "../StyledTable";
import DataDog from "../../assets/datadog.png";

export const DataDogStatus: React.FC = () => {
  const [statusData, setStatusData] = React.useState<any | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch("https://status.datadoghq.com/api/v2/summary.json")
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
        <div>Error fetching DataDog service status: {error}</div>;
      });
  }, []);

  return (
    <>
      {statusData ? (
        <StyledTableRow
          service="DataDog"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://status.datadoghq.com/"
          logo={DataDog}
          incidents={statusData.incidents.length > 0}
          onToggle={handleToggle}
        />
      ) : null}
      {statusData?.incidents.map((incident: any) => (
        <StyledTableExpandedRow
          key={incident.incident_id}
          service={incident.components[0].name}
          status={
            <>
              <b>{incident.name}</b><br></br>
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
