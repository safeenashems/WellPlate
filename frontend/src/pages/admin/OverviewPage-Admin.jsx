import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../../slices/recipeSlice";

import {
  Box, Typography, Grid, Paper, CircularProgress
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#FF6384", "#845EC2", "#A0D995"];

const StatCard = ({ title, value }) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
    <Typography variant="h6" sx={{ color: "text.secondary" }}>{title}</Typography>
    <Typography variant="h4" sx={{ color: "text.primary", fontWeight: "bold" }}>{value}</Typography>
  </Paper>
);

const AdminOverview = () => {
  const dispatch = useDispatch();

 const dashboardSummary = useSelector((state) => state.recipes.dashboardSummary);
const loading = useSelector((state) => state.recipes.loadingRecipes);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const {
    totalRecipes = 0,
    totalUsers = 0,
    recipesPerCuisine = {},
    favouriteStats = {}
  } = dashboardSummary;

  const chartData = Object.entries(recipesPerCuisine).map(([cuisine, count]) => ({
    name: cuisine,
    count,
  }));

  const pieChartData = Object.entries(favouriteStats).map(([cuisine, count]) => ({
    name: cuisine,
    value: count,
  }));

  return (
    <Box p={4}>
      {/* <Typography variant="h4" sx={{ mb: 3, color: "warning.main", fontWeight: "bold" }}>
        Admin Dashboard Overview
      </Typography> */}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} mb={4}>
            <Grid item xs={6} xl={3}  >
              <StatCard title="Total Recipes" value={totalRecipes} />
            </Grid>
            <Grid item xs={6} xl={3} >
              <StatCard title="Total Users" value={totalUsers} />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
                  Recipe Count by Cuisine
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ bottom: 40, top: 20, left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#333"  angle={-80}  tick={{ fontSize: 10 }}   dy={25} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8EAD5F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
                  Favourite Recipes by Cuisine
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminOverview;
