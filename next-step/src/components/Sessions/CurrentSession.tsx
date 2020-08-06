import React from "react";
import Button from "@material-ui/core/Button";
import { Session } from "../../types/types";

type Props = {
  onEndSession: (id: number) => void;
  session: Session | null;
};

const CurrentSession: React.FunctionComponent<Props> = ({
  onEndSession,
  session,
}) => {
  return (
    <React.Fragment>
      {session ? (
        <div className="current-session">
          <Button
            className="button green-background white-border float-right mrgn-r8"
            onClick={() => onEndSession(session.sessionId)}
          >
            End session
          </Button>
          <span className="float-right">
            Start time: {session.workoutStart}
          </span>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default CurrentSession;
