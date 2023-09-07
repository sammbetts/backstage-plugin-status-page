import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  StyledWidgetTableRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat, useStatusData } from '../../utils';
import HashiCorp from '../../assets/hashicorp.png';

export const HashiCorpStatus: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const statusData = useStatusData(
    'https://status.hashicorp.com/api/v2/summary.json',
    'HasiCorp',
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {statusData && (
        <StyledTableRow
          service="HashiCorp"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://status.hashicorp.com/"
          logo={HashiCorp}
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

export const HashiCorpStatusWidget: React.FC = () => {
  const statusData = useStatusData(
    'https://status.hashicorp.com/api/v2/summary.json',
    'HashiCorp',
  );

  return (
    <>
      {statusData && (
        <StyledWidgetTableRow
          service="HashiCorp"
          updated=""
          link=""
          logo={HashiCorp}
          incidents={statusData.incidents.length > 0}
        />
      )}
    </>
  );
};
