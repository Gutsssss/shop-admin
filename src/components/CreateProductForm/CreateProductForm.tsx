import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import type { UploadProps as uploadProps } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchBrands, fetchTypes } from "@store/reducers/ActionCreators";
import type { IShopItem } from "@models/IShopItem";

const initialField:IShopItem = {
    name: "",
    price: '',
    brandId:'',
    typeId: '',
    img:null,
    info:[{fullDescription:''}],
}
interface FormProps {
  currentProduct?:IShopItem
  keyForm:string | number
  onSubmit:(product:IShopItem) => void
}
const { TextArea } = Input;
export const CreateProductForm = ({currentProduct,keyForm,onSubmit}:FormProps,) => {
  const [productData, setProductData] = useState<IShopItem>(currentProduct || initialField);
  const setStateValue = (values:object) =>
    setProductData((prev) => ({ ...prev, ...values }));
  
  const changeType = useCallback((selectedId: string | number) => setStateValue({typeId:selectedId}),[])
  const changeBrand = useCallback((selectedId: string | number) => setStateValue({brandId:selectedId}),[])
  const handleUpload: uploadProps["onChange"] = (info) => {
    setStateValue({img:info.file})
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setProductData(prev => ({
            ...prev,
            info: [{
                ...(prev.info?.[0] || {}),
                fullDescription: newDescription
            }]
        }));
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
      const isImage = file.type?.startsWith("image/");
      if (!isImage) {
        message.error("Можно загружать только изображения!");
        return Upload.LIST_IGNORE;
      }
      setStateValue({img:file});
      return false;
    },
    fileList: productData.img ? [productData.img] : [],
    maxCount: 1,
  };
  const currentDescription = productData.info?.[0]?.fullDescription || '';
  return (
    <div>
      <Form key={keyForm} style={{ margin: 20 }} form={form} layout="vertical" size="large">
        <Form.Item label="Name" required>
          <Input
            value={productData.name}
            onChange={(e) => setStateValue({name:e.target.value})}
            placeholder="Введите название"
          />
        </Form.Item>
        <Form.Item label="Price" required>
          <Input
            prefix="₽"
            value={productData.price}
            onChange={(e) => setStateValue({price:e.target.value})}
            type="number"
            placeholder="Введите цену"
          />
        </Form.Item>
        <Form.Item label="Brand" required>
          <Select
            value={productData.brandId}
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
            value={productData.typeId}
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
          <TextArea value={currentDescription} onChange={handleDescriptionChange} />
        </Form.Item>
        <Form.Item label="Image" required>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Button onClick={() => onSubmit(productData)} type="primary">{currentProduct ? 'Изменить' : 'Создать' }</Button>
      </Form>
    </div>
  );
};
