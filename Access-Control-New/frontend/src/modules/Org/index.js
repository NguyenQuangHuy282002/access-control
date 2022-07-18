import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Menu,
  Modal,
  Table,
  Tag,
  Tooltip,
  message,
  ConfigProvider,
} from "antd";
import "antd/dist/antd.css";
import * as React from "react";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import FormOrgCreate from "./components/FormOrgCreate";
import FormOrgUpdate from "./components/FormOrgEdit";
import OrgService from "./Service/service";
import viVN from "antd/lib/locale/vi_VN";

function Org() {
  ///set create or update mode
  const MODE = {
    UPDATE: false,
    CREATE: false,
  };
  const [mode, setMode] = useState(MODE);
  const [updateOrg, setUpdateOrg] = useState({});
  const handleOpenCreateOrg = () => {
    setMode({ ...mode, CREATE: true });
  };
  const handleOpenUpdateOrg = (record) => {
    setMode({ ...mode, UPDATE: true });
    OrgService.getOrg(record.id).then((res) => {
      const data = {
        id: res.data.id,
        name: res.data.name,
        status: res.data.status,
        working_day: res.data.working_day.sort(),
      };
      setUpdateOrg(data);
    });
  };
  const handleCloseCreate = () => {
    setMode({ ...mode, CREATE: false });
  };
  const handleCloseUpdate = () => {
    setMode({ ...mode, UPDATE: false });
  };

  const [orgList, setOrgList] = useState([]);
  React.useEffect(() => {
    OrgService.getListOrg().then((res) => {
      const data = res.data
        .sort((a, b) => b.mtime - a.mtime)
        .map((dt) => {
          return {
            id: dt.id,
            name: dt.name,
            status: dt.status,
            working_day: dt.working_day,
          };
        });
      setOrgList(data);
    });
  }, []);

  const [hover, setHover] = useState(""); /// to check onhover delete icon
  const [searchVal, setSearchVal] = useState(""); //// search box
  const [orgListFilter, setOrgListFilter] = useState(null);
  const onSearch = (value) => {
    setSearchVal(value);
    const filterData = orgList.filter((org) =>
      org.name.toString().toLowerCase().includes(value.toLowerCase())
    );
    setOrgListFilter(filterData);
  };

  //columns in table
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const [page, setPage] = React.useState(1);
  const columns = [
    {
      key: "1",
      title: "STT",
      width: "10%",
      render: (value, item, index) => {
        return (page - 1) * 10 + index + 1;
      },
    },

    {
      key: "3",
      title: "Tên phòng ban",
      width: "30%",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) =>
        searchVal !== "" ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchVal]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    },
    {
      key: "4",
      title: "Trạng thái",
      width: "20%",
      dataIndex: "status",
      align: "center",
      render: (_, { status }) => (
        <Tag color={status === "active" ? "green" : "volcano"} key={status}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
      ellipsis: true,
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["ascend", "descend", "ascend"],
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <Menu
          items={[
            {
              key: "active",
              label: "Hoạt động",
            },
            {
              key: "deactive",
              label: "Không hoạt động",
            },
            {
              key: "all",
              label: "Tất cả",
            },
          ]}
          defaultSelectedKeys="all"
          onClick={(item) => {
            setSelectedKeys([item.key]);
            confirm();
          }}
        />
      ),
      onFilter: (value, record) =>
        value !== "all" ? (record.status === value ? record : null) : record,
    },
    {
      key: "5",
      title: "Ngày làm việc",
      width: "40%",
      render: (record) => (
        <>
          {record.working_day.sort().toString() === "0,1,2,3,4,5,6"
            ? "Cả tuần"
            : record.working_day.sort().toString() === "0,1,2,3,4"
            ? "Từ T2 đến T6"
            : record.working_day.sort().map((day) => {
                return days[day] + " ";
              })}
          {record.id === hover && record.status !== "deactive" ? (
            <>
              <Tooltip placement="top" title="Sửa phòng ban">
                <EditOutlined
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenUpdateOrg(record);
                  }}
                  style={{
                    color: "#096dd9",
                    position: "absolute",
                    right: "20%",
                    top: "36%",
                    fontSize: "130%",
                  }}
                />
              </Tooltip>
              <Tooltip placement="top" title="Xoá phòng ban">
                <DeleteOutlined
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteOrg(record);
                  }}
                  style={{
                    color: "red",
                    position: "absolute",
                    right: "10%",
                    top: "36%",
                    fontSize: "130%",
                  }}
                />
              </Tooltip>
            </>
          ) : null}
        </>
      ),
    },
  ];

  //create handle CRUD
  //Delete org
  const onDeleteOrg = (record) => {
    Modal.confirm({
      title: "Bạn có muốn xoá phòng ban này không?",
      okText: "Có",
      cancelText: "Không",
      okType: "danger",
      onOk: async () => {
        await OrgService.updateOrg(record.id, { status: "deactive" });
        message.success("Xoá thành công !");

        await OrgService.getListOrg().then((res) => {
          const data = res.data.map((dt) => {
            return {
              id: dt.id,
              name: dt.name,
              status: dt.status,
              working_day: dt.working_day,
            };
          });
          setOrgList(data);
        });
      },
    });
  };

  /// Create new org
  const onCreateOrg = async (data) => {
    let newdata = { ...data, company_id: "A5LH" };
    await OrgService.createOrg(newdata);
    message.success("Tạo thành công !");
    setMode({ ...mode, CREATE: false });

    await OrgService.getListOrg().then((res) => {
      const data = res.data
        .sort((a, b) => b.mtime - a.mtime)
        .map((dt) => {
          return {
            id: dt.id,
            name: dt.name,
            status: dt.status,
            working_day: dt.working_day.sort(),
          };
        });
      setOrgList(data);
    });
  };

  // Update org
  const onUpdateOrg = async (data) => {
    await OrgService.updateOrg(updateOrg.id, data);
    setMode({ ...mode, UPDATE: false });
    message.success("Cập nhật thành công !");

    await OrgService.getListOrg().then((res) => {
      const data = res.data
        .sort((a, b) => b.mtime - a.mtime)
        .map((dt) => {
          return {
            id: dt.id,
            name: dt.name,
            status: dt.status,
            working_day: dt.working_day,
          };
        });
      setOrgList(data);
    });
  };

  return (
    <>
      <ConfigProvider locale={viVN}>
        <Input.Search
          placeholder="Tìm kiếm theo tên phòng ban"
          size="large"
          enterButton
          style={{
            float: "left",
            marginBottom: "2%",
            borderRadius: "100px",
            width: "35%",
          }}
          value={searchVal}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <Tooltip placement="top" title="Thêm phòng ban">
          <Button
            type="primary"
            size="large"
            style={{
              float: "right",
              marginBottom: "2%",
              borderRadius: "5px",
              width: "80px",
            }}
            onClick={handleOpenCreateOrg}
            icon={<PlusCircleOutlined style={{ fontSize: "130%" }} />}
          />
        </Tooltip>
        <Table
          dataSource={searchVal === "" ? orgList : orgListFilter}
          columns={columns}
          rowKey="id"
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
          onRow={(r) => ({
            onMouseEnter: () => {
              setHover(r.id);
            },
            onMouseLeave: () => {
              setHover("");
            },
          })}
        />

        <FormOrgCreate
          isModalVisible={mode.CREATE}
          handleSubmit={onCreateOrg}
          handleClose={handleCloseCreate}
        />
        <FormOrgUpdate
          isModalVisible={mode.UPDATE}
          handleSubmit={onUpdateOrg}
          handleClose={handleCloseUpdate}
          orgData={updateOrg}
        />
      </ConfigProvider>
    </>
  );
}
export default Org;
