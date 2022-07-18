import { Form, Modal } from "antd";
import PropTypes from "prop-types";
import React from "react";
import FormOrg from "./FormOrg";

FormOrgUpdate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isModalVisible: PropTypes.bool,
  orgData: PropTypes.object,
};

function FormOrgUpdate({ handleSubmit, handleClose, isModalVisible, orgData }) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(orgData);
  }, [form, orgData]);
  return (
    <Modal
      forceRender
      getContainer={false}
      title="Cập nhật phòng ban"
      visible={isModalVisible}
      width="570px"
      footer={null}
      onCancel={handleClose}
    >
      <FormOrg
        form={form}
        submitTxt="Cập nhật"
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Modal>
  );
}
export default FormOrgUpdate;
