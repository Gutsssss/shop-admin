import { useAppDispatch } from "@hooks/redux";
import { createBrand } from "@store/reducers/ActionCreators";
import { Button, Form, Input } from "antd"
import { useState } from "react";
interface CreateFormProps {
    label:string,
    createFunc:(name:string) => void,
}

export const CreateForm = () => {
    const [form] = Form.useForm();
    const [name,setName] = useState('')
const dispatch = useAppDispatch()
  const handleCreate = (name:string) => {
    try {
        dispatch(createBrand(name))
    }
    catch(err) {
        console.log(err)
    }
  }
    return (
        <Form form={form}>
            <Form.Item name="name" label='Бренд'>
                <Input value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Item>
            <Button onClick={() => handleCreate(name)} htmlType="submit">Create</Button>
        </Form>
    );
};