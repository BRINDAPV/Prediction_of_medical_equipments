// src/components/Dashboard.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Chip,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8); // default to 8 rows per page
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);

  // Update height of left column dynamically
  useEffect(() => {
    if (leftRef.current) setLeftHeight(leftRef.current.clientHeight);
    const handleResize = () => {
      if (leftRef.current) setLeftHeight(leftRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock data
  const stats = {
    total_manufacturers: 12,
    total_devices: 56,
    total_failures: 8,
    total_parent_companies: 4,
    total_representatives: 10,
  };

  const parentCompanies = [
    { name: "Parent A", count: 5 },
    { name: "Parent B", count: 3 },
    { name: "Parent C", count: 2 },
    { name: "Parent D", count: 2 },
  ];

  const failures = [
    { device: "Device 101", failures: 2 },
    { device: "Device 102", failures: 1 },
    { device: "Device 103", failures: 3 },
    { device: "Device 104", failures: 2 },
  ];

  const manufacturers = [
    { ID: 1, NAME: "Manufacturer A", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep A", ADDRESS: "123 Street", SOURCE: "Manual", CREATED_AT: "2025-01-01", UPDATED_AT: "2025-07-01" },
    { ID: 2, NAME: "Manufacturer B", PARENT_COMPANY: "Parent B", REPRESENTATIVE: "Rep B", ADDRESS: "456 Avenue", SOURCE: "Manual", CREATED_AT: "2025-02-01", UPDATED_AT: "2025-07-15" },
    { ID: 3, NAME: "Manufacturer C", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep C", ADDRESS: "789 Boulevard", SOURCE: "Manual", CREATED_AT: "2025-03-01", UPDATED_AT: "2025-07-20" },
    { ID: 4, NAME: "Manufacturer D", PARENT_COMPANY: "Parent D", REPRESENTATIVE: "Rep D", ADDRESS: "101 Road", SOURCE: "Manual", CREATED_AT: "2025-04-01", UPDATED_AT: "2025-07-25" },
    { ID: 5, NAME: "Manufacturer E", PARENT_COMPANY: "Parent C", REPRESENTATIVE: "Rep A", ADDRESS: "202 Lane", SOURCE: "Manual", CREATED_AT: "2025-05-01", UPDATED_AT: "2025-07-30" },
    { ID: 6, NAME: "Manufacturer F", PARENT_COMPANY: "Parent B", REPRESENTATIVE: "Rep B", ADDRESS: "303 Circle", SOURCE: "Manual", CREATED_AT: "2025-06-01", UPDATED_AT: "2025-07-31" },
    { ID: 7, NAME: "Manufacturer G", PARENT_COMPANY: "Parent A", REPRESENTATIVE: "Rep C", ADDRESS: "404 Square", SOURCE: "Manual", CREATED_AT: "2025-06-15", UPDATED_AT: "2025-08-01" },
    { ID: 8, NAME: "Manufacturer H", PARENT_COMPANY: "Parent D", REPRESENTATIVE: "Rep D", ADDRESS: "505 Street", SOURCE: "Manual", CREATED_AT: "2025-06-20", UPDATED_AT: "2025-08-02" },
    { ID: 9, NAME: "Manufacturer I", PARENT_COMPANY: "Parent C", REPRESENTATIVE: "Rep A", ADDRESS: "606 Avenue", SOURCE: "Manual", CREATED_AT: "2025-07-01", UPDATED_AT: "2025-08-05" },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manufacturers Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Manufacturers", value: stats.total_manufacturers },
          { title: "Total Devices", value: stats.total_devices },
          { title: "Total Failures", value: stats.total_failures },
          { title: "Parent Companies", value: stats.total_parent_companies },
          { title: "Active Representatives", value: stats.total_representatives },
        ].map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={2.4} key={idx}>
            <Card sx={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{kpi.title}</Typography>
                <Typography variant="h4">{kpi.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Three-container layout */}
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={12} md={6} ref={leftRef} container direction="column" spacing={2}>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Parent Companies
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={parentCompanies}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Major Failures
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={failures}>
                    <XAxis dataKey="device" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="failures" fill="#f44336" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: leftHeight }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manufacturers Details
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Parent Company</TableCell>
                    <TableCell>Representative</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {manufacturers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.ID}>
                        <TableCell>{row.ID}</TableCell>
                        <TableCell>{row.NAME}</TableCell>
                        <TableCell>{row.PARENT_COMPANY}</TableCell>
                        <TableCell>{row.REPRESENTATIVE}</TableCell>
                        <TableCell>{row.ADDRESS}</TableCell>
                        <TableCell>
                          <Chip label={row.SOURCE} size="small" color="primary" />
                        </TableCell>
                        <TableCell>{row.CREATED_AT}</TableCell>
                        <TableCell>{row.UPDATED_AT}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={manufacturers.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 8, 10]} // allow switching to 8 or more rows
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
