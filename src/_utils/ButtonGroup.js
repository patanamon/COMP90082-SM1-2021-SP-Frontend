import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

export default function GroupOrientation(props) {
  const btnNames = props.btnNames;
  const clickHandler = props.clickHandler;
  const  btnItems = btnNames.map(
    (btnName) => <Button key={btnName} onClick={clickHandler}>{btnName}</Button>
  );

  return (
    <div style={{ position: "relative", margin: "auto", width: "80vw" }}> 
      <ButtonGroup
        orientation="horizontal"
        color="primary"
      >
        {btnItems}
      </ButtonGroup>
    </div>
  );
}