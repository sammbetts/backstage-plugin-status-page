import React from 'react';
import axios from 'axios';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  convertToUKDateTimeFormat,
} from '../StyledTable';
import GCP from '../../assets/gcp.png';

interface Incident {
  incident_id: string;
  service_name: string;
  external_desc: string;
  modified: string;
  end: string;
}

export const GCPStatus: React.FC = () => {
  const [statusData, setStatusData] = React.useState<Incident[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await axios.get(
          'https://status.cloud.google.com/incidents.json',
        );
        const ongoingIncidents = response.data.filter(
          (incident: Incident) => !incident.end,
        );
        setStatusData(ongoingIncidents);
      } catch (error) {
        <div>Error fetching GCP service status: {error}</div>;
      }
    }
    fetchIncidents();
  }, []);

  return (
    <>
      <StyledTableRow
        service="Google Cloud Platform"
        updated={new Date().toLocaleString()}
        link="https://status.cloud.google.com/"
        logo={GCP}
        incidents={statusData.length > 0}
        onToggle={handleToggle}
      />
      {statusData.length > 0
        ? statusData.map(incident => (
            <StyledTableExpandedRow
              key={incident.incident_id}
              service={incident.service_name}
              status={incident.external_desc}
              updated={convertToUKDateTimeFormat(incident.modified)}
              link=""
              isOpen={open}
            />
          ))
        : null}
    </>
  );
};
