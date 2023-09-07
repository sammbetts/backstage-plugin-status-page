import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  StyledWidgetTableRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat, useGCPStatusData } from '../../utils';
import GCP from '../../assets/gcp.png';

export const GCPStatus: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const statusData = useGCPStatusData(
    'https://status.cloud.google.com/incidents.json',
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <StyledTableRow
        service="Google Cloud Platform"
        updated={new Date().toLocaleString()}
        link="https://status.cloud.google.com/"
        logo={GCP}
        incidents={statusData.length > 0}
        onToggle={handleToggle}
        isOpen={open}
      />
      {statusData.length > 0 &&
        statusData.map((incident: any) => (
          <StyledTableExpandedRow
            key={incident.id}
            service={incident.service_name}
            status={
              <>
                <b>{incident.status_impact}</b>
                <br />
                {incident.external_desc}
              </>
            }
            updated={convertToUKDateTimeFormat(incident.modified)}
            link={`https://status.cloud.google.com/${incident.uri}`}
            isOpen={open}
          />
        ))}
    </>
  );
};

export const GCPStatusWidget: React.FC = () => {
  const statusData = useGCPStatusData(
    'https://status.cloud.google.com/incidents.json',
  );

  return (
    <>
      {statusData && (
        <StyledWidgetTableRow
          service="GCP"
          updated=""
          link=""
          logo={GCP}
          incidents={statusData.length > 0}
        />
      )}
    </>
  );
};
