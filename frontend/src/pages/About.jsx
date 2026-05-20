import React from "react";
import { Container, Typography, Card, CardContent, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();

  return (
    <Box id="About" sx={{ backgroundColor: theme.palette.background.default, py: 5 }}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.warning.main}>
          Why Choose WellPlate?
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {[
            { title: "Smart Recipe Generator", desc: "Get recipes based on your ingredients." },
            { title: "Personalized Meal Plans", desc: "Customize meals according to your diet." },
            { title: "Save Favorites", desc: "Easily bookmark your favorite recipes." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color={theme.palette.text.secondary}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h5" fontWeight="bold" color={theme.palette.text.secondary}>
            Ready to Cook Smarter?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
            sx={{ marginTop: 2 }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;









// import React from "react";
// import { Container, Typography, Card, CardContent, Box, Button, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";

// const About = () => {
//   const theme = useTheme();

//   return (
//     <Box id="About" sx={{ backgroundColor: theme.palette.background.default, py: 5 }}>
//       <Container sx={{ textAlign: "center" }}>
//         <Typography variant="h4" fontWeight="bold" color={theme.palette.warning.main}>
//           Why Choose WellPlate?
//         </Typography>
//         <Grid container spacing={3} sx={{ marginTop: 3 }}>
//           {[
//             { title: "Smart Recipe Generator", desc: "Get recipes based on your ingredients." },
//             { title: "Personalized Meal Plans", desc: "Customize meals according to your diet." },
//             { title: "Save Favorites", desc: "Easily bookmark your favorite recipes." },
//           ].map((feature, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Card sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold" color={theme.palette.text.secondary}>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color={theme.palette.text.primary}>
//                     {feature.desc}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Call to Action */}
//         <Box sx={{ textAlign: "center", marginTop: 5 }}>
//           <Typography variant="h5" fontWeight="bold" color={theme.palette.text.secondary}>
//             Ready to Cook Smarter?
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             component={Link}
//             to="/signup"
//             sx={{ marginTop: 2 }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default About;
