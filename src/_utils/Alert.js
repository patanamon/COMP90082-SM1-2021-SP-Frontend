import React from "react";
import { Alert } from "antd";

export function InformationalNote(props) {
  return (
      <Alert
        message="Informational Notes"
        description={props.message}
        type="info"
        showIcon
      />
  );
}

export function Warining(props) {
  return (
      <Alert
        message="Warning"
        description={props.message}
        type="warning"
        showIcon
      />
  );
}

export function Error(props) {
  return (
      <Alert
        message="Error"
        description={props.message}
        type="error"
        showIcon
      />
  );
}
