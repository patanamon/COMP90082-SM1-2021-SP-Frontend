import React from "react";
import { Alert } from "antd";
import { alertConstants } from "../_constants/alert.constants.js";

export default function InformationalNote(props) {
  return (
      <Alert
        message="Informational Notes"
        description={props.message ? props.message : alertConstants.NO_DATA}
        type="info"
        showIcon
      />
  );
}
