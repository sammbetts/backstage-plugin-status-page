import { useState, useEffect } from 'react';
import axios from 'axios';

interface Incident {
  id: string;
  service_name: string;
  external_desc: string;
  status_impact: string;
  modified: string;
  uri: string;
  end: string;
}

export const useStatusData = (fetchURL: string, service: string) => {
  const [statusData, setStatusData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(fetchURL)
      .then(response => response.json())
      .then(data => {
        const { status, page, incidents } = data;
        setStatusData({
          status: status.description,
          updated: page.updated_at,
          incidents: incidents,
        });
      })
      .catch(fetchError => {
        setError(`Error fetching ${service} service status: ${fetchError}`);
      });
  }, [fetchURL, service]);

  if (error) {
    throw new Error(error);
  }

  return statusData;
};

export const useSlackStatusData = (fetchURL: string, service: string) => {
  const [statusData, setStatusData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(fetchURL)
      .then(response => response.json())
      .then(data => {
        const { status, active_incidents, date_updated } = data;
        setStatusData({
          status: status,
          updated: date_updated,
          incidents: active_incidents,
        });
      })
      .catch(fetchError => {
        setError(`Error fetching ${service} service status: ${fetchError}`);
      });
  }, [fetchURL, service]);
  if (error) {
    throw new Error(error);
  }

  return statusData;
};

export const useGCPStatusData = (fetchURL: string) => {
  const [statusData, setStatusData] = useState<Incident[]>([]);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await axios.get(fetchURL);
        const ongoingIncidents = response.data.filter(
          (incident: Incident) => !incident.end,
        );
        setStatusData(ongoingIncidents);
      } catch (error) {
        throw new Error(`Error fetching GCP service status: ${error}`);
      }
    }
    fetchIncidents();
  }, [fetchURL]);

  return statusData;
};
