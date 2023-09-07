import React from 'react';
import {
  Avatar,
  Collapse,
  IconButton,
  Link,
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
import { IncidentIcon } from '../IncidentIcon';

interface Props {
  service: string;
  status?: string | any;
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
    fontSize: '1.2rem',
  },
  serviceIcon: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  incidentService: {
    marginLeft: '88px',
    fontWeight: 'bold',
  },
  moreLink: {
    width: '100px',
    fontSize: '1rem',
  },
  icon: {
    width: '3rem',
    height: '3rem',
  },
  incident: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '8px 40px 8px 15px',
      width: '350px',
      borderBottom: '1.5px groove #F3F3F3',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }),
)(TableCell);

const StyledTableCellExpanded = withStyles(() =>
  createStyles({
    root: {
      padding: '15px 40px 15px 15px',
      color: 'grey',
      width: '350px',
    },
  }),
)(TableCell);

const StyledSmallTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      color: 'grey',
      width: '150px',
      borderBottom: '1.5px groove #F3F3F3',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }),
)(TableCell);

const StyledSmallTableCellExpanded = withStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      color: 'grey',
      width: '150px',
    },
  }),
)(TableCell);

const StyledWidgetTableCell = withStyles(() =>
  createStyles({
    root: {
      padding: '5px 30px 5px 30px',
      fontSize: '1rem',
      borderBottom: '1.5px groove darkGrey',
    },
  }),
)(TableCell);

export const StyledWidgetTableRow = (props: Props) => {
  const { service, logo, incidents } = props;

  return (
    <TableRow>
      <StyledWidgetTableCell>
        <Avatar alt="logo" src={logo} />
      </StyledWidgetTableCell>
      <StyledWidgetTableCell>
        <Typography style={{ fontWeight: 'bold' }}>{service}</Typography>
      </StyledWidgetTableCell>
      <StyledWidgetTableCell>
        <IncidentIcon activeIncident={incidents} />
      </StyledWidgetTableCell>
    </TableRow>
  );
};

export const StyledTableExpandedRow = (props: Props) => {
  const { service, status, updated, link, isOpen } = props;
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={4}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Table>
            <StyledTableCellExpanded>
              <div className={classes.incidentService}>{service}</div>
            </StyledTableCellExpanded>
            <StyledTableCellExpanded>{status}</StyledTableCellExpanded>
            <StyledSmallTableCellExpanded>
              {updated}
            </StyledSmallTableCellExpanded>
            <StyledSmallTableCellExpanded>
              <div className={classes.moreLink}>
                <Link href={link} target="_blank">
                  More...
                </Link>
              </div>
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
          <div className={classes.serviceIcon}>
            <IconButton
              style={{ margin: '0 10px 0 10px' }}
              href={link}
              target="_blank"
            >
              <Avatar className={classes.icon} alt="logo" src={logo} />
            </IconButton>
            {service}
          </div>
        </StyledTableCell>
        <StyledTableCell>
          {incidents ? (
            <>
              <Typography style={{ color: 'red' }}>
                Ongoing Incidents
              </Typography>
            </>
          ) : (
            <>
              {status ? (
                <Typography>{status}</Typography>
              ) : (
                <Typography>Normal Service</Typography>
              )}
            </>
          )}
        </StyledTableCell>
        <StyledSmallTableCell>{updated}</StyledSmallTableCell>
        <StyledSmallTableCell>
          <div className={classes.incident}>
            <IncidentIcon activeIncident={incidents} />
            {incidents && (
              <IconButton onClick={onToggle}>
                {isOpen ? (
                  <KeyboardArrowUpIcon className={classes.icon} />
                ) : (
                  <KeyboardArrowDownIcon className={classes.icon} />
                )}
              </IconButton>
            )}
          </div>
        </StyledSmallTableCell>
      </TableRow>
    </>
  );
};
