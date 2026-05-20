import React from "react";
import { Tooltip, Button } from "@mui/material";

const TestTooltip = () => {
    return (
        
        <Tooltip title="This is a test tooltip" arrow>
        <Button variant="contained" color="secondary">Hover Me</Button>
      </Tooltip>
       
    );
};

export default TestTooltip;
