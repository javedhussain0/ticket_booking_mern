import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Dummy Fallback Data
const fallbackStats = [
  { title: "Total Bookings", value: 1520 },
  { title: "Active Users", value: 320 },
  { title: "Revenue", value: "₹4,50,000" },
  { title: "Pending Rides", value: 28 },
];

const fallbackPie = [
  { name: "Rider", value: 400 },
  { name: "Train", value: 300 },
  { name: "Hotel", value: 200 },
  { name: "Movie", value: 100 },
];

const fallbackBar = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 200 },
  { month: "Mar", bookings: 150 },
  { month: "Apr", bookings: 300 },
  { month: "May", bookings: 250 },
  { month: "Jun", bookings: 400 },
];

const fallbackLine = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 22000 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 40000 },
];

const fallbackBookings = [
  { id: 1, user: "John Doe", type: "Rider", status: "Completed" },
  { id: 2, user: "Alice", type: "Hotel", status: "Pending" },
  { id: 3, user: "Michael", type: "Train", status: "Completed" },
  { id: 4, user: "Sophia", type: "Movie", status: "Cancelled" },
];

// Chart Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(fallbackStats);
  const [pieData, setPieData] = useState(fallbackPie);
  const [barData, setBarData] = useState(fallbackBar);
  const [lineData, setLineData] = useState(fallbackLine);
  const [bookings, setBookings] = useState(fallbackBookings);

  // Auto fetch from backend
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats || fallbackStats);
        setPieData(data.pie || fallbackPie);
        setBarData(data.bar || fallbackBar);
        setLineData(data.line || fallbackLine);
        setBookings(data.bookings || fallbackBookings);
      })
      .catch(() => {
        console.warn("Using fallback data");
      });
  }, []);

  // CSV Download
  const handleDownloadCSV = () => {
    const headers = ["ID,User,Type,Status"];
    const rows = bookings.map((b) => `${b.id},${b.user},${b.type},${b.status}`);
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📊 Dashboard
      </Typography>

      {/* Top Stats */}
      <Stack direction="row" spacing={3} flexWrap="wrap" mb={4}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ minWidth: 220, flexGrow: 1, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{stat.title}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Charts Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        {/* Pie Chart */}
        <Card sx={{ flex: 1, p: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Booking Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card sx={{ flex: 1, p: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Bookings
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card sx={{ flex: 1, p: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Revenue Trends
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Stack>

      {/* Recent Bookings */}
      <Card sx={{ p: 2, boxShadow: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Recent Bookings</Typography>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleDownloadCSV}
          >
            Download Report
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
                <TableCell>{b.user}</TableCell>
                <TableCell>{b.type}</TableCell>
                <TableCell>{b.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default Dashboard;
