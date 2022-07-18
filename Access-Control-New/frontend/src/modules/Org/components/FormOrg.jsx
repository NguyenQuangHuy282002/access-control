import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
FormOrg.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  form: PropTypes.object,
  submitTxt: PropTypes.string,
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function FormOrg({ handleSubmit, handleClose, form, submitTxt }) {
  return (
    <Form
      name="orgForm"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18, offset: 1 }}
      autoComplete="on"
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[
          { required: true, message: "Không được bỏ trống tên phòng ban!" },
        ]}
      >
        <Input style={{ padding: 0, paddingTop: 4, paddingBottom: 4 }} />
      </Form.Item>

      <Form.Item
        name="working_day"
        label="Ngày làm việc"
        rules={[{ required: true, message: "Phải chọn ít nhất 1 ngày!" }]}
      >
        <Checkbox.Group>
          <Row span={28} style={{ flexFlow: "nowrap" }}>
            {days.map((d, index) => {
              <Col span={4}>
                <Checkbox value={index} style={{ lineHeight: "32px" }}>
                  {d}
                </Checkbox>
              </Col>;
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space style={{ float: "right" }}>
          <Button htmlType="button" onClick={handleClose}>
            Huỷ
          </Button>
          <Button type="primary" htmlType="submit">
            {submitTxt}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
export default FormOrg;
