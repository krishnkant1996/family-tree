import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  TextField,
  DialogActions,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  TableBody,
  TableHead,
  Container,
  Grid,
  TableContainer,
  Button,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  makeStyles, Snackbar
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import CustomizedSnackbars from './CustomizedSnackbars'
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const {
    row,
    setOpenMember,
    handleStateMemberChange,
    handleDeleteFamilyMembers,
    handleDeleteFamily,
  } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.family_name}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>
          {row.family_member ? row.family_member.length : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Family Members
                </Typography>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    handleDeleteFamily(row.id);
                  }}
                >
                  Delete Family
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenMember(true);
                    handleStateMemberChange("family_id", row.id);
                  }}
                >
                  Create Family Member
                </Button>
              </div>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.family_member.length === 0 && 
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      {"No Members"}
                    </TableCell>
                  </TableRow>}
                  {row.family_member.map((familyMember) => (
                    <TableRow key={familyMember.id}>
                      <TableCell component="th" scope="row">
                        {familyMember.name}
                      </TableCell>
                      <TableCell>{familyMember.gender}</TableCell>
                      <TableCell align="right">
                        {" "}
                        <Tooltip title="Delete Family Member">
                          <IconButton
                            onClick={() => {
                              handleDeleteFamilyMembers(familyMember.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [family, setFamily] = useState([]);
  const [totalCount, setTotal] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openSan, setOpenSan] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [openMember, setOpenMember] = React.useState(false);
  const errorMessage =(message)=>{
    setSeverity('error')
    setMessage(message)
    setOpenSan(true)
  }
  const successMessage =(message)=>{
    setSeverity('success')
    setMessage(message)
    setOpenSan(true)
  }

  let initState = {
    family_name: "",
    name: "",
    gender: "male",
  };
  const [state, setState] = useState(initState);
  let initStateMember = {
    family_id: "",
    name: "",
    gender: "male",
  };
  const [stateMember, setStateMember] = useState(initStateMember);
  const handleStateChange = (key, value) => {
    const newState = state;
    newState[key] = value;
    setState({ ...newState });
  };
  const handleStateMemberChange = (key, value) => {
    const newState = stateMember;
    newState[key] = value;
    setStateMember({ ...newState });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddFamily = () => {
    if( !state.name || !state.family_name ){
      errorMessage("All fields required")
      return false
    }
    axios
      .post(`http://localhost:8000/api/family/create-family`, state)
      .then(function (response) {
        getFamily();
        setState(initState);
        successMessage(response.data.message)

        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleAddFamilyMembers = () => {
    if(!stateMember.name){
      errorMessage("All fields required")
      return false
    }
    axios
      .post(
        `http://localhost:8000/api/family-members/create-family-members`,
        stateMember
      )
      .then(function (response) {
        getFamily();
        setStateMember(initStateMember);
        setOpenMember(false);
        successMessage(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDeleteFamilyMembers = (family_member_id = null) => {
    axios
      .post(`http://localhost:8000/api/family-members/delete-family-members`, {
        family_member_id,
      })
      .then(function (response) {
        getFamily();
        setStateMember(initStateMember);
        successMessage(response.data.message)

        setOpenMember(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDeleteFamily = (family_id = null) => {
    axios
      .post(`http://localhost:8000/api/family/delete-family`, { family_id })
      .then(function (response) {
        getFamily();
        setStateMember(initStateMember);
        successMessage(response.data.message)

        setOpenMember(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFamily = () => {
    axios
      .get(`http://localhost:8000/api/family/list`, {
        params: {
          limit: rowsPerPage,
          page: page,
          skip: rowsPerPage * page,
        },
      })
      .then(function (response) {
        setFamily(response.data.data.family);
        setTotal(response.data.data.familyCount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getFamily();
  }, [page, rowsPerPage]);

  let props = {
    setOpenMember,
    handleAddFamilyMembers,
    handleStateMemberChange,
    stateMember,
    handleDeleteFamily,
    handleDeleteFamilyMembers,
  };
  let snackbarProps ={
    open:openSan,
    severity,
    message,
  };
  snackbarProps['handleClose']=()=>{
    setOpenSan(false)
  }
  return (
    <Container style={{ marginTop: 80 }}>
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Family
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Family Name</TableCell>
              <TableCell>Family Head Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Total Family Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {family.map((row) => (
              <Row key={row.name} row={row} {...props} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Family</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={state.family_name}
            onChange={(e) => handleStateChange("family_name", e.target.value)}
            label="Family name"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            autoFocus
            id="name"
            variant="outlined"
            value={state.name}
            onChange={(e) => handleStateChange("name", e.target.value)}
            label="Head name"
            fullWidth
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={state.gender}
              onChange={(e) => handleStateChange("gender", e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAddFamily} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMember}
        onClose={() => setOpenMember(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Family Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={stateMember.name}
            onChange={(e) => handleStateMemberChange("name", e.target.value)}
            label="Member name"
            variant="outlined"
            fullWidth
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={stateMember.gender}
              onChange={(e) =>
                handleStateMemberChange("gender", e.target.value)
              }
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={() => setOpenMember(false)} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleAddFamilyMembers}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars {...snackbarProps}/>
    </Container>
  );
}
