import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";

import { useHistory } from "react-router-dom";
import "./styles.scss";

AppHeader.propTypes = {};

const items = [
  { key: "home", label: "Trang chủ" },
  { key: "employee", label: "Nhân viên" },
  { key: "org", label: "Phòng ban" },
  {
    key: "user",
    icon: <UserOutlined />,
    children: [
      { label: "Thông tin", key: "infoUser", icon: <UserOutlined /> },
      { label: "Đổi mật khẩu", key: "chagePassword", icon: <SettingOutlined /> },
      { label: "Đăng xuất", key: "logout", icon: <LogoutOutlined /> },
    ],
  },
];

function AppHeader(props) {
  let history = useHistory();
  const handleClick = (val) => {
    history.push(val.key);
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={items}
        onClick={handleClick}
      />
    </Header>
  );
}

export default AppHeader;
