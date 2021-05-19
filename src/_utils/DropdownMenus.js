import React from 'react';
import { Form } from "react-bootstrap";

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