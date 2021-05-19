import React from 'react';
<<<<<<< HEAD
import { Tab, Col, Row, Container, Form } from "react-bootstrap";
=======
import { Form } from "react-bootstrap";
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9

export default function DropdownMenus(props) {
    const data = props.data;
    const value = props.value;
    let studentList = data.slice();
    studentList.push("All");
    return (
        <Form inline>
          <Form.Label
            className="col-sm-3"
            htmlFor="inlineFormCustomSelectPref"   
          >
            Student     :
          </Form.Label>
          <Form.Control
            value={value}
            as="select"
            className="col-sm-5"
            id="inlineFormCustomSelectPref"
            custom
            onChange={props.onChange}
          >
            {studentList.map((student,index) => (
              <option key={index} value={student}>{student}</option>
            ))}
          </Form.Control>
        </Form>
      );
}