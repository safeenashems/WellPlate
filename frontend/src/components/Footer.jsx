import React, { useRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  const emailRef = useRef(null);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 6,
        px: { xs: 3, md: 10 },
      }}
    >
      {/* Main Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: { xs: 4, md: 6 },
          mb: 5,
        }}
      >
        {/* Left Section - Logo & Tagline */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/assets/wellPlate_logo.png"
              alt="WellPlate Logo"
              sx={{ width: 50, height: "auto", mr: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>WellPlate</Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Effortless Cooking, Perfectly Plated
          </Typography>
        </Box>

        {/* Right Section - Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            textAlign: "right",
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Customer Service */}
          <Box>
            <Typography variant="h5" mb={1}>Customer Service</Typography>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="body2">📞 +00248 2606060</Typography>
              <Typography variant="body2">✉️ support@wellPlate.com</Typography>
              <Typography variant="body2">💬 Available 24/7</Typography>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h5" mb={1}>Quick Links</Typography>
            <Box sx={{ textAlign: "left" }}>
              <Link href="#Home" color="inherit" underline="hover" display="block">Home</Link>
              <Link href="#Recipes" color="inherit" underline="hover" display="block">Recipes</Link>
              <Link href="#Favourites" color="inherit" underline="hover" display="block">Favourites</Link>
            </Box>
          </Box>

          {/* Company Info */}
          <Box>
            <Typography variant="h5" mb={1}>Company Info</Typography>
            <Box sx={{ textAlign: "left" }}>
              <Link href="#About" color="inherit" underline="hover" display="block">About Us</Link>
              <Link href="Privacy-policy" color="inherit" underline="hover" display="block">Privacy Policy</Link>
              <Link href="Terms-and-conditions" color="inherit" underline="hover" display="block">Terms & Conditions</Link>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          borderTop: "1px solid rgba(255,255,255,0.3)",
          pt: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WellPlate. All rights reserved.
        </Typography>
        <Box display="flex" gap={3} mt={{ xs: 2, md: 0 }}>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={25} color="white" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={25} color="white" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={25} color="white" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;












// import React, { useRef } from "react";
// import { Box, Typography, TextField, Button, Link } from "@mui/material";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// function Footer() {
//   const emailRef = useRef(null);

//   const handleFooterClick = () => {
//     if (emailRef.current) {
//       emailRef.current.focus();
//       console.log("Email input is now focused!");
//     }
//   };

//   return (
//     <Box
//       component="footer"
//       id="Footer"
//       onClick={handleFooterClick}
//       sx={{
//         backgroundColor: "primary.main",
//         color: "white",
//         py: 6,
//         px: { xs: 3, md: 10 },
//       }}
//     >
//       {/* Footer Content */}
//       <Box
//     sx={{
//       display: "flex",
//       flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on larger
//       justifyContent: "space-between",
//       alignItems: "flex-start",
//       flexWrap: "wrap",
//       gap: { xs: 4, md: 6 },
//       mb: 5,
//     }}
//   >
//          {/* Logo & Tagline (Left Section) */}
//     <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//       <Box
//         component="img"
//         src="/assets/wellPlate_logo.png"
//         alt="WellPlate Logo"
//         sx={{ width: 50, height: "auto", mr: 2 }} // Adds spacing between logo and text
//       />
//       <Box>
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           WellPlate
//         </Typography>
//         <Typography variant="body2" sx={{ mt: 1 }}>
//           "Effortless Cooking, Perfectly Plated."
//         </Typography>
//       </Box>
//     </Box>

//         {/* Footer Links Section (Right Section) */}
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//         justifyContent: "space-between",
//         gap: { xs: 4, md: 8 },
//         flexGrow: 1, // Allows spacing between items
//       }}
//     >
//       {/* Customer Support */}
//       <Box>
//         <Typography variant="h6" mb={1}>Customer Service</Typography>
//         <Typography variant="body2">📞 +00248 2606060</Typography>
//         <Typography variant="body2">✉️ support@wellPlate.com</Typography>
//         <Typography variant="body2">💬 Available 24/7</Typography>
//       </Box>

//        {/* Quick Links */}
//       <Box>
//         <Typography variant="h6" mb={1}>Quick Links</Typography>
//         <Link href="#Home" color="inherit" underline="hover" display="block">Home</Link>
//         <Link href="#Recipes" color="inherit" underline="hover" display="block">Recipes</Link>
//         <Link href="#Favourites" color="inherit" underline="hover" display="block">Favourites</Link>
//       </Box>

//       {/* Company Info */}
//       <Box>
//         <Typography variant="h6" mb={1}>Company Info</Typography>
//         <Link href="About" color="inherit" underline="hover" display="block">About Us</Link>
//         <Link href="Privacy-policy" color="inherit" underline="hover" display="block">Privacy Policy</Link>
//         <Link href="Terms-and-conditions" color="inherit" underline="hover" display="block">Terms & Conditions</Link>
//       </Box>

//         {/* Newsletter */}
//         {/* <Box>
//           <Typography variant="h6" mb={1}>Stay Connected</Typography>
//           <Typography variant="body2" mb={2}>
//             Join our mailing list for exclusive discounts and offers.
//           </Typography>
//           <TextField
//             inputRef={emailRef}
//             placeholder="Enter your email"
//             variant="outlined"
//             fullWidth
//             size="small"
//             sx={{ backgroundColor: "white", borderRadius: "4px" }}
//           />
//           <Button
//             variant="contained"
//             color="secondary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Subscribe
//           </Button>
//         </Box>
//      */}

//       {/* Footer Bottom */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: { xs: "column", md: "row" },
//           borderTop: "1px solid rgba(255,255,255,0.3)",
//           pt: 3,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()} wellPlate. All rights reserved.
//         </Typography>
//         <Box display="flex" gap={3} mt={{ xs: 2, md: 0 }}>
//           <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebook size={25} color="white" />
//           </Link>
//           <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter size={25} color="white" />
//           </Link>
//           <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram size={25} color="white" />
//           </Link>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Footer;
 