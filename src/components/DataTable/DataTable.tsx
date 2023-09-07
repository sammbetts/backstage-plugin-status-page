import React from 'react';
import { Content, Header, InfoCard, Page } from '@backstage/core-components';
import {
  Button,
  Table,
  TableContainer,
  makeStyles,
  Box,
} from '@material-ui/core';
import {
  AtlassianStatus,
  CircleCIStatus,
  CloudFlareStatus,
  DataDogStatus,
  GitHubStatus,
  GCPStatus,
  HashiCorpStatus,
  SlackStatus,
  VercelStatus,
  AtlassianStatusWidget,
  CircleCIStatusWidget,
  CloudFlareStatusWidget,
  DataDogStatusWidget,
  GitHubStatusWidget,
  GCPStatusWidget,
  HashiCorpStatusWidget,
  SlackStatusWidget,
  VercelStatusWidget,
} from '..';

interface Props {
  title: string;
  className?: string;
}

const useStyles = makeStyles({
  content: {
    padding: '40px 80px 40px 80px',
  },
  moreLink: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  tableContainer: {
    maxHeight: '275px',
  },
  tableBorder: {
    padding: '10px',
    borderRadius: '5px',
  },
});

export const DataTable = () => {
  const classes = useStyles();

  return (
    <Page themeId="home">
      <Header
        title="Status Page"
        subtitle="Ongoing incidents and status updates for third-party services."
      />
      <Content className={classes.content}>
        <Table>
          <AtlassianStatus />
          <CloudFlareStatus />
          <CircleCIStatus />
          <DataDogStatus />
          <GitHubStatus />
          <GCPStatus />
          <HashiCorpStatus />
          <SlackStatus />
          <VercelStatus />
        </Table>
      </Content>
    </Page>
  );
};

export const StatusWidget = (props: Props) => {
  const { title, className } = props;
  const classes = useStyles();

  return (
    <InfoCard title={title} className={className}>
      <Box className={classes.tableBorder}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <AtlassianStatusWidget />
            <CircleCIStatusWidget />
            <CloudFlareStatusWidget />
            <DataDogStatusWidget />
            <GitHubStatusWidget />
            <GCPStatusWidget />
            <HashiCorpStatusWidget />
            <SlackStatusWidget />
            <VercelStatusWidget />
          </Table>
        </TableContainer>
      </Box>
      <Box className={classes.moreLink}>
        <Button variant="contained" color="primary" href="/status-page">
          More...
        </Button>
      </Box>
    </InfoCard>
  );
};
