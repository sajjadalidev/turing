import { Modal, Button, Spin, Space } from "antd";
import { Input } from "antd";
import { BASE_URL } from "../../config/constant";
import { useState } from "react";
import { auth } from "../../config/localStorage";

const { TextArea } = Input;
const AddNote = (props) => {
  const [note, setNote] = useState("");
  const [loader, setLoader] = useState(false);
  const { handleCancel, handleOk, isModalOpen, data } = props;
  const { to, from, via, id, call_type, duration } = data;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const totalTime = `${padTo2Digits(minutes)} Minutes ${padTo2Digits(
    seconds
  )} Seconds`;

  const onFinish = async (body) => {
    setNote(body);
    let result = await fetch(`${BASE_URL}/calls/${id}/note`, {
      method: "post",
      body: JSON.stringify({ content: note }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth}`,
      },
    });
    setLoader(true);
    const data = await result.json();
    if (data) {
      setLoader(false);
      handleOk();
    }
  };

  return (
    <>
      <Modal
        title={
          <p>
            Add Note <br />
            <span style={{ color: "blue" }}>Call ID: {id}</span>
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button
            size="large"
            style={{ width: "100%" }}
            type="primary"
            onClick={() => {
              onFinish();
            }}
          >
            Save
          </Button>
        }
      >
        <>
          {loader ? (
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
              <Spin tip="Loading" size="large"></Spin>
            </Space>
          ) : (
            <>
              <p className="call-detail">Call Type: {call_type}</p>
              <p className="call-detail">Duration :{totalTime}</p>
              <p className="call-detail">From: {from}</p>
              <p className="call-detail">To: {to}</p>
              <p className="call-detail">Via: {via}</p>
              <label className="call-detail">Note</label>
              <TextArea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                aria-label="Note"
                rows={4}
              />
            </>
          )}
        </>
      </Modal>
    </>
  );
};
export default AddNote;
