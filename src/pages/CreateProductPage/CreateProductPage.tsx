import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useEffect, useState, type FC } from "react";
import type { UploadFile, UploadProps } from "antd";
import { UseAppDispatch, UseAppSelector } from "@hooks/redux";
import { fetchBrands, fetchTypes } from "../../store/reducers/ActionCreators";

const { TextArea } = Input;

 

export const CreateProductPage: FC = () => {


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setbrand] = useState("");
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [file, setFile] = useState<UploadFile | null>(null);
 const handleChangeType = (selectedId: string) => {
  setType(selectedId);
};
 const handleChangeBrand = (selectedId: string) => {
  setbrand(selectedId);
};
  const handleUpload:UploadProps['onChange'] = (info) => {
      console.log(info.file)
  }

  const dispatch = UseAppDispatch();
  const { types } = UseAppSelector((state) => state.typeReducer);
  const { brands } = UseAppSelector((state) => state.brandReducer);
  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchBrands())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [form] = Form.useForm();
const props: UploadProps = {
    onChange: handleUpload,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Можно загружать только изображения!');
        return Upload.LIST_IGNORE;
      }
      setFile(file);
      return false;
    },
    fileList:file ? [file] : [],
    maxCount:1
  };

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
          <Select
            value={brand}
            onChange={handleChangeBrand}
            showSearch
            filterOption={(input: string, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {brands.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Type" required>
          <Select
            value={type}
            onChange={handleChangeType}
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
