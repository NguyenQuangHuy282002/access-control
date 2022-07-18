import { Form, Modal } from "antd";
import PropTypes from "prop-types";
import React from "react";
import FormOrg from "./FormOrg";

FormOrgCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isModalVisible: PropTypes.bool,
};

function FormOrgCreate({ handleSubmit, handleClose, isModalVisible }) {
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue({ name: "", working_day: [] });
  }, [form, isModalVisible]);
  return (
    <>
      <Modal
        forceRender
        getContainer={false}
        title="Thông tin phòng ban"
        visible={isModalVisible}
        width="570px"
        footer={null}
        onCancel={handleClose}
      >
        <FormOrg
          form={form}
          submitTxt="Tạo"
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
}
export default FormOrgCreate;
