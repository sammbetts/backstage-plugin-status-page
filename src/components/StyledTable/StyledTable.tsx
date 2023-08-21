import React from 'react';
import { DateTime } from 'luxon';
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface Props {
  service: string;
  status?: string;
  updated: string;
  link: string;
  logo?: string;
  incidents?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const useStyles = makeStyles({
  service: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  product: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginLeft: '100px',
  },
  serviceIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '3.3rem',
    height: '3.3rem',
  },
  incident: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noIncident: {
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incidentIcon: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
});

export const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      color: 'black',
      fontSize: '1rem',
      width: '350px',
      borderBottom: '1.5px groove #F3F3F3',
      backgroundColor: '#F3F3F3',
    },
  }),
)(TableCell);

export const StyledTableCellExpanded = withStyles(() =>
  createStyles({
    root: {
      padding: '25px 40px 25px 10px',
      color: 'grey',
      width: '350px',
      backgroundColor: '#FFFFFF',
    },
  }),
)(TableCell);

export const StyledSmallTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      color: 'grey',
      width: '170px',
      borderBottom: '1.5px groove #F3F3F3',
      backgroundColor: '#F3F3F3',
    },
  }),
)(TableCell);

export const StyledSmallTableCellExpanded = withStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      color: 'grey',
      width: '170px',
      backgroundColor: '#FFFFFF',
      borderEndEndRadius: '10rem',
    },
  }),
)(TableCell);

export function convertToUKDateTimeFormat(isoDateString: string): string {
  const dateTime = DateTime.fromISO(isoDateString, { setZone: true });

  const day = dateTime.day;
  const month = dateTime.month;
  const year = dateTime.year;
  const hours = dateTime.hour;
  const minutes = dateTime.minute;

  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}, ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export const StyledTableExpandedRow = (props: Props) => {
  const { service, status, updated, isOpen } = props;
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={3}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Table>
            <StyledTableCellExpanded>
              <Typography className={classes.product}>{service}</Typography>
            </StyledTableCellExpanded>
            <StyledTableCellExpanded>{status}</StyledTableCellExpanded>
            <StyledSmallTableCellExpanded>
              {updated}
            </StyledSmallTableCellExpanded>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export const StyledTableRow = (props: Props) => {
  const { service, status, updated, link, logo, incidents, onToggle, isOpen } =
    props;
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <StyledTableCell className={classes.service}>
          <Box className={classes.serviceIcon}>
            <IconButton
              style={{ margin: '0 10px 0 15px' }}
              href={link}
              target="_blank"
            >
              <Avatar className={classes.icon} alt="logo" src={logo} />
            </IconButton>
            {service}
          </Box>
        </StyledTableCell>
        <StyledTableCell>
          {incidents ? (
            <>
              {status ? (
                <Typography style={{ color: 'red' }}>{status}</Typography>
              ) : (
                <Typography style={{ color: 'red' }}>
                  Ongoing Incidents
                </Typography>
              )}
            </>
          ) : (
            <>{status ? status : <Typography>Normal Service</Typography>}</>
          )}
        </StyledTableCell>
        <StyledSmallTableCell>{updated}</StyledSmallTableCell>
        <StyledSmallTableCell>
          {incidents ? (
            <div className={classes.incident}>
              <ErrorOutlineIcon className={classes.incidentIcon} />
              <IconButton onClick={onToggle}>
                {isOpen ? (
                  <KeyboardArrowUpIcon className={classes.icon} />
                ) : (
                  <KeyboardArrowDownIcon className={classes.icon} />
                )}
              </IconButton>
            </div>
          ) : (
            <div className={classes.noIncident}>
              <CheckCircleOutlineIcon className={classes.incidentIcon} />
              <div style={{ width: '4.7rem' }} />
            </div>
          )}
        </StyledSmallTableCell>
      </TableRow>
    </>
  );
};
