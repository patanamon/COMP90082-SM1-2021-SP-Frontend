import React from 'react';
import { Tab, Col, Row, Container, Form } from "react-bootstrap";

export default function DropdownMenus(props) {
    const data = props.data;
    data.push("All");
    return (
        <Form inline>
          <Form.Label
            className="col-sm-3"
            htmlFor="inlineFormCustomSelectPref"   
          >
            Student     :
          </Form.Label>
          <Form.Control
            as="select"
            className="col-sm-5"
            id="inlineFormCustomSelectPref"
            custom
            onChange={props.onChange}
          >
            {data.map((student, index) => (
              <option key={index} value={index}>{student}</option>
            ))}
          </Form.Control>
        </Form>
      );
}