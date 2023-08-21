import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  convertToUKDateTimeFormat,
} from '../StyledTable';
import Github from '../../assets/github.png';

export const GitHubStatus: React.FC = () => {
  const [statusData, setStatusData] = React.useState<any | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch('https://www.githubstatus.com/api/v2/summary.json')
      .then(response => response.json())
      .then(data => {
        const { status, page, incidents } = data;
        setStatusData({
          status: status.description,
          updated: page.updated_at,
          incidents: incidents,
        });
      })
      .catch(error => {
        <div>Error fetching GitHub service status: {error}</div>;
      });
  }, []);

  return (
    <>
      {statusData ? (
        <StyledTableRow
          service="GitHub"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://www.githubstatus.com"
          logo={Github}
          incidents={statusData.incidents.length > 0}
          onToggle={handleToggle}
        />
      ) : null}
      {statusData?.incidents.map((incident: any) => (
        <StyledTableExpandedRow
          key={incident.incident_id}
          service={incident.name}
          status={incident.impact}
          updated={convertToUKDateTimeFormat(incident.updated_at)}
          link=""
          isOpen={open}
        />
      ))}
    </>
  );
};
