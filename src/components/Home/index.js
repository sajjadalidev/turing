import { useState, useEffect } from "react";
import { Layout, theme } from "antd";
import { Space, Table, Spin, Button } from "antd";
import AddNote from "./AddNote";
import moment from "moment";
import customFetcher from "../../config/fetchInstance";
const { Content, Footer } = Layout;

const Home = () => {
  const [calls, setCalls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [singleRecord, setSingleRecord] = useState([]);
  const showModal = (data) => {
    setIsModalOpen(true);
    setSingleRecord(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      key: "call-type",
      render: (text) => {
        const color =
          text === "answered"
            ? "green"
            : text === "missed"
            ? "red"
            : text === "voicemail"
            ? "blue"
            : "";
        return (
          <p style={{ color: color }}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </p>
        );
      },
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      key: "direction",
      render: (text) => (
        <p style={{ color: "blue" }}>
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </p>
      ),
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        function padTo2Digits(num) {
          return num.toString().padStart(2, "0");
        }
        const result = `${padTo2Digits(minutes)} minutes ${padTo2Digits(
          seconds
        )} seconds`;
        return result;
      },
    },
    {
      title: "FROM",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "TO",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "VIA",
      dataIndex: "via",
      key: "via",
    },
    {
      title: "CREATED AT",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => moment(date).format("L"),
    },
    {
      title: "STATUS",
      key: "is_archived",
      dataIndex: "is_archived",
      render: (tag) => (
        <span>
          {tag ? <Button>Archived</Button> : <Button>Unarchive</Button>}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)} type="primary">
            Add Note
          </Button>
        </Space>
      ),
    },
  ];

  const getCalls = async () => {
    const limit = 100;
    const offset = 1;
    let { data } = await customFetcher(
      `/calls?offset=${offset}&limit=${limit}`
    );

    if (data) {
      setLoading(false);
      setCalls(data);
    }
  };
  useEffect(() => {
    getCalls();
  }, []);

  return (
    <div>
      <Layout className="layout">
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <p className="test-title">Turing Technology Front-end Test</p>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            {loading ? (
              <Space
                direction="vertical"
                style={{
                  paddingTop: "30px",
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </Space>
            ) : (
              <Table
                columns={columns}
                pagination={{
                  position: ["bottomCenter"],
                  pageSize: 10,
                  defaultCurrent: 1,
                  total: calls?.nodes?.length,
                }}
                dataSource={calls?.nodes}
              />
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Turing Technology Front-end Test ©2022 Created by Sajjad Ali
        </Footer>
      </Layout>
      <AddNote
        showModal={showModal}
        data={singleRecord}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Home;
