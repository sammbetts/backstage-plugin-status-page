import React from 'react';
import CloudFlare from '../../assets/cloudflare.png';
import {
  StyledTableRow,
  StyledTableExpandedRow,
  convertToUKDateTimeFormat,
} from '../StyledTable';

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
        console.log(data);
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
      <>
        {statusData ? (
          <StyledTableRow
            service="CloudFlare"
            status={statusData.status}
            updated={convertToUKDateTimeFormat(statusData.updated)}
            link="https://www.cloudflarestatus.com/"
            logo={CloudFlare}
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
    </>
  );
};
