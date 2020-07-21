import React, { useEffect, useState, useRef } from "react";
import { Grid, Container } from "@material-ui/core";
import { HumanModel } from "./HumanModel";
import { Recoveries } from "./Recoveries";

export function Home() {
  return (
    <Grid container>
      <div style={{ textAlign: "center", width: "100%", height: "800px" }}>
        <h1>Welcome to NextStep Fitness</h1>
        <h2>
          <br></br>
          <i>Fitness reimagined</i>
        </h2>
        <HumanModel recoveries={null} />
      </div>
    </Grid>
  );
}
