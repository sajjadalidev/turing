import { useState } from "react";
import { Button, Form, Input, Space, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { BASE_URL } from "./../../config/constant";
import { useNavigate } from "react-router-dom";
import { setAuthToken, setRefreshToken } from "../../config/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    let result = await fetch(`${BASE_URL}/auth/login`, {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(true);
    const user = await result.json();
    if (user?.access_token) {
      navigate("/");
      setAuthToken(user.access_token);
      setRefreshToken(user.refresh_token);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {loading ? (
        <Space
          direction="vertical"
          style={{
            paddingTop: "30px",
            width: "100%",
            height: "50vh",
          }}
        >
          <Spin tip="Loading" size="small">
            <div className="content" />
          </Spin>
        </Space>
      ) : (
        <div className="login-form">
          <Form
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter valid username! e.g(xyz@gmail.com)",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 6,
              }}
            >
              <Button type="primary" size="medium" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
export default Login;
