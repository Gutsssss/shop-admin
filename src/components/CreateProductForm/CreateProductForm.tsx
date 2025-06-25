import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useCallback, useEffect, useState, type FC } from "react";
import type { UploadFile, UploadProps as uploadProps } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { createProductOnApi, fetchBrands, fetchTypes } from "@store/reducers/ActionCreators";

const { TextArea } = Input;
export const CreateProductForm: FC = () => {
  const [state, setState] = useState({
    name: "",
    price: '',
    brand: '',
    type: '',
    file:'' as UploadFile | '',
    info: "",
  });
  const setStateValue = (values:object) =>
    setState((prev) => ({ ...prev, ...values }));
  const changeType = useCallback((selectedId: string) => setStateValue({type:selectedId}),[])
  const changeBrand = useCallback((selectedId: string) => setStateValue({brand:selectedId}),[])
  const handleUpload: uploadProps["onChange"] = (info) => {
    setStateValue({file:info.file})
  };

  const dispatch = useAppDispatch();
  const { types } = useAppSelector((state) => state.typeReducer);
  const { brands } = useAppSelector((state) => state.brandReducer);
  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [form] = Form.useForm();
  const props: uploadProps = {
    onChange: handleUpload,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Можно загружать только изображения!");
        return Upload.LIST_IGNORE;
      }
      setStateValue({file:file});
      return false;
    },
    fileList: state.file ? [state.file] : [],
    maxCount: 1,
  };
  const formData = new FormData()
  formData.append('name',state.name)
  formData.append('price',state.price)
  formData.append('brand',state.brand)
  formData.append('type',state.type)
  formData.append('img',state.file)
  formData.append('info',JSON.stringify(state.info) )
  const createProduct = async () => {
    console.log(state)
    try {
        dispatch(await createProductOnApi(state.name,state.price,state.brand,state.type,state.file,state.info))
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div>
      <Form style={{ margin: 20 }} form={form} layout="vertical" size="large">
        <Form.Item label="Name" required>
          <Input
            value={state.name}
            onChange={(e) => setStateValue({name:e.target.value})}
            placeholder="Введите название"
          />
        </Form.Item>
        <Form.Item label="Price" required>
          <Input
            prefix="₽"
            value={state.price}
            onChange={(e) => setStateValue({price:e.target.value})}
            type="number"
            placeholder="Введите цену"
          />
        </Form.Item>
        <Form.Item label="Brand" required>
          <Select
            value={state.brand}
            onChange={changeBrand}
            showSearch
            filterOption={(input: string, option) =>
              (option?.children ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
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
            value={state.type}
            onChange={changeType}
            showSearch
            filterOption={(input: string, option) =>
              (option?.children ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
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
          <TextArea value={state.info} onChange={(e) => setStateValue({info:e.target.value})} />
        </Form.Item>
        <Form.Item label="Image" required>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Button onClick={() => createProduct()} type="primary">Создать</Button>
      </Form>
    </div>
  );
};
