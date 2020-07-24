import React from "react";
import { Grid } from "@material-ui/core";
import { HumanModel } from "./HumanModel";

export function Home() {
  return (
    <Grid container>
      <div style={{ textAlign: "center", width: "100%", height: "800px" }}>
        <h1>Oops</h1>
        <h2>
          <br></br>
          <i>Fitness reimagined</i>
        </h2>
        <HumanModel recoveries={null} />
      </div>
    </Grid>
  );
}
