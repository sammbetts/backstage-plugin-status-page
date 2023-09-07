import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  StyledWidgetTableRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat, useStatusData } from '../../utils';
import Vercel from '../../assets/vercel.png';

export const VercelStatus: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const statusData = useStatusData(
    'https://www.vercel-status.com/api/v2/summary.json',
    'Vercel',
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {statusData && (
        <StyledTableRow
          service="Vercel"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://www.vercel-status.com/"
          logo={Vercel}
          incidents={statusData.incidents.length > 0}
          onToggle={handleToggle}
          isOpen={open}
        />
      )}
      {statusData?.incidents.map((incident: any) => (
        <StyledTableExpandedRow
          key={incident.incident_id}
          service={incident.components[0].name}
          status={
            <>
              <b>{incident.name}</b>
              <br />
              {incident.incident_updates[0].body}
            </>
          }
          updated={convertToUKDateTimeFormat(incident.updated_at)}
          link={incident.shortlink}
          isOpen={open}
        />
      ))}
    </>
  );
};

export const VercelStatusWidget: React.FC = () => {
  const statusData = useStatusData(
    'https://www.vercel-status.com/api/v2/summary.json',
    'Vercel',
  );

  return (
    <>
      {statusData && (
        <StyledWidgetTableRow
          service="Vercel"
          updated=""
          link=""
          logo={Vercel}
          incidents={statusData.incidents.length > 0}
        />
      )}
    </>
  );
};
