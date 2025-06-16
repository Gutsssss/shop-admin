import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useEffect, useState, type FC, ChangeEvent } from "react";
import type { UploadProps } from "antd";
import { UseAppDispatch, UseAppSelector } from "../../hooks/redux";
import { fetchTypes } from "../../store/reducers/ActionCreators";
import type { IShopItem } from "../../models/IShopItem";

const { TextArea } = Input;

const props: UploadProps = {
  name: "file",
  action: "http://localhost:5000/api/static",
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const CreateProductPage: FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setbrand] = useState("");
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [img, setImg] = useState("");
 const handleChangeType = (selectedId: string) => {
  setType(selectedId);
};

  const dispatch = UseAppDispatch();
  const { types } = UseAppSelector((state) => state.typeReducer);
  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);
  const [form] = Form.useForm();
  return (
    <div>
      <Form style={{ margin: 20 }} form={form} layout="vertical" size="large">
        <Form.Item label="Name" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
          />
        </Form.Item>
        <Form.Item label="Price" required>
          <Input
            prefix="₽"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Введите цену"
          />
        </Form.Item>
        <Form.Item label="Brand" required>
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Type" required>
          <Select
            value={type}
            onChange={handleChangeType} // Теперь принимает значение, а не событие
            showSearch
            filterOption={(input: string, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {types.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Info">
          <TextArea value={info} onChange={(e) => setInfo(e.target.value)} />
        </Form.Item>
        <Form.Item label="Image" required>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Button type="primary">Создать</Button>
      </Form>
    </div>
  );
};
