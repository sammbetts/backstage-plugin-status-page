import React from 'react';
import {
  StyledTableRow,
  StyledTableExpandedRow,
} from '../StyledTable';
import { convertToUKDateTimeFormat } from '../utils';
import CloudFlare from '../../assets/cloudflare.png';

export const CloudFlareStatus: React.FC = () => {
  const [statusData, setStatusData] = React.useState<any | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetch('https://www.cloudflarestatus.com/api/v2/summary.json')
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
        <div>Error fetching CloudFlare service status: {error}</div>;
      });
  }, []);

  return (
    <>
        {statusData &&
          <StyledTableRow
            service="CloudFlare"
            status={statusData.status}
            updated={convertToUKDateTimeFormat(statusData.updated)}
            link="https://www.cloudflarestatus.com/"
            logo={CloudFlare}
            incidents={statusData.incidents.length > 0}
            onToggle={handleToggle}
          />
        }
        {statusData?.incidents.map((incident: any) => (
           <StyledTableExpandedRow
           key={incident.incident_id}
           service={incident.components[0].name}
           status={
             <>
               <b>{incident.name}</b><br/>
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
