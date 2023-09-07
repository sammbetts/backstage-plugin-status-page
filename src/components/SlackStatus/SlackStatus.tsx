import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  StyledWidgetTableRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat, useSlackStatusData } from '../../utils';
import Slack from '../../assets/slack.png';

export const SlackStatus: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const statusData = useSlackStatusData(
    'https://status.slack.com/api/v2.0.0/current',
    'Slack',
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {statusData && (
        <StyledTableRow
          service="Slack"
          status={`${statusData.status} ${
            statusData.status === 'ok' ? '' : 'incident'
          }`}
          updated={convertToUKDateTimeFormat(statusData.updated)}
          link="https://status.slack.com/"
          logo={Slack}
          incidents={statusData.incidents.length > 0}
          onToggle={handleToggle}
          isOpen={open}
        />
      )}
      {statusData?.incidents.map((incident: any) => (
        <StyledTableExpandedRow
          key={incident.id}
          service={incident.services.join(', ')}
          status={
            <>
              <b>
                {incident.status} {incident.type}
              </b>
              <br />
              {incident.title}
            </>
          }
          updated={convertToUKDateTimeFormat(incident.date_updated)}
          link={incident.url}
          isOpen={open}
        />
      ))}
    </>
  );
};

export const SlackStatusWidget: React.FC = () => {
  const statusData = useSlackStatusData(
    'https://status.slack.com/api/v2.0.0/current',
    'Slack',
  );

  return (
    <>
      {statusData && (
        <StyledWidgetTableRow
          service="Slack"
          updated=""
          link=""
          logo={Slack}
          incidents={statusData.incidents.length > 0}
        />
      )}
    </>
  );
};
