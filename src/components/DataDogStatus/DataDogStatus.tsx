import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  StyledWidgetTableRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat, useStatusData } from '../../utils';
import DataDog from '../../assets/datadog.png';

export const DataDogStatus: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const statusData = useStatusData(
    'https://status.datadoghq.com/api/v2/summary.json',
    'DataDog',
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {statusData && (
        <StyledTableRow
          service="DataDog"
          status={statusData.status}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://status.datadoghq.com/"
          logo={DataDog}
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

export const DataDogStatusWidget: React.FC = () => {
  const statusData = useStatusData(
    'https://status.datadoghq.com/api/v2/summary.json',
    'DataDog',
  );

  return (
    <>
      {statusData && (
        <StyledWidgetTableRow
          service="DataDog"
          updated=""
          link=""
          logo={DataDog}
          incidents={statusData.incidents.length > 0}
        />
      )}
    </>
  );
};
