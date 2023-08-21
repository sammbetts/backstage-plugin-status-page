// import React from 'react';
// import axios from 'axios';
// import AWS from '../../assets/aws.png';
// import { StyledTableRow, StyledTableExpandedRow } from '../StyledTable';

// interface Incident {
//   incident_id: string;
//   date: number;
//   region_id: string;
//   event_log: string[];
//   impacted_services: { service_name: string[] };
// }

// export const AWSStatus: React.FC = () => {
//   const [statusData, setStatusData] = React.useState<Incident[]>([]);
//   const [open, setOpen] = React.useState(false);

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   React.useEffect(() => {
//     async function fetchIncidents() {
//       try {
//         const response = await axios.get(
//           'https://health.aws.amazon.com/public/currentevents',
//         );
//         const ongoingIncidents = response.data.filter(
//           (incident: Incident) => incident,
//         );
//         setStatusData(ongoingIncidents);
//       } catch (error) {
//         <div>Error fetching AWS service status: {error}</div>;
//       }
//     }
//     fetchIncidents();
//   }, [console.log(statusData)]);

//   function convertUnixTimestampToUKDate(timestamp: number): string {
//     const date = new Date(timestamp * 1000);
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       timeZone: 'Europe/London',
//     };

//     const formattedDate = date.toLocaleDateString('en-GB', options);
//     return formattedDate;
//   }

//   return (
//     <>
//       <StyledTableRow
//         service="Amazon Web Services"
//         status=""
//         updated={new Date().toLocaleString()}
//         link="https://health.aws.amazon.com/health/status"
//         logo={AWS}
//         incidents={statusData.length > 0}
//         onToggle={handleToggle}
//       />
//       {statusData.length > 0
//         ? statusData.map(incident => (
//             <StyledTableExpandedRow
//               key={incident.incident_id}
//               service={incident.impacted_services.service_name.join(', ')}
//               status={''}
//               updated={convertUnixTimestampToUKDate(incident.date)}
//               link=""
//               isOpen={open}
//             />
//           ))
//         : null}
//     </>
//   );
// };
