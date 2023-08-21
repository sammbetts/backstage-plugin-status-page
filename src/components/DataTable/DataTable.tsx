import React from 'react';
import { Content, Header, Page } from '@backstage/core-components';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  CircleCIStatus,
  CloudFlareStatus,
  DataDogStatus,
  GitHubStatus,
  GCPStatus,
  SlackStatus,
} from '..';

const useStyles = makeStyles({
  content: {
    padding: '40px 80px 40px 80px',
  },
  tableHead: {
    fontWeight: 'bolder',
    fontSize: '1.3rem',
    color: '#DE1C8C',
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
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.tableHead}>SERVICE</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.tableHead}>STATUS</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.tableHead}>UPDATED</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.tableHead}>INCIDENTS</Typography>
              </TableCell>
            </TableRow>
            <CloudFlareStatus />
            <CircleCIStatus />
            <DataDogStatus />
            <GitHubStatus />
            <GCPStatus />
            <SlackStatus />
          </TableHead>
        </Table>
      </Content>
    </Page>
  );
};
