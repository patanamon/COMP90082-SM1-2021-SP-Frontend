import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function BtnGroup(props) {
  const btnNames = props.btnNames;
  const clickHandler = props.clickHandler;
  const selected = props.selected;
  const  btnItems = btnNames.map(
    (btnName) => <Button key={btnName} onClick={clickHandler} variant={selected == btnName ? "contained" : "outlined"}>{btnName}</Button>
  );

  return (
    <div style={{ position: "relative", margin: "20px auto", width: "80vw" }}> 
      <ButtonGroup
        orientation="horizontal"
        color="primary"
      >
        {btnItems}
      </ButtonGroup>
    </div>
  );
}