import { Button, Form, Input } from "antd"
import { useState } from "react";
interface CreateFormProps {
    label:string,
    createFunc:(name:string) => void,
}

export const CreateForm = ({label,createFunc}:CreateFormProps) => {
    const [form] = Form.useForm();
    const [name,setName] = useState('')
  const handleCreate = (name:string) => {
        createFunc(name)
        setName('')
  }
    return (
        <Form form={form} layout="vertical" size="large" style={{margin:20, maxWidth: 300}}>
            <Form.Item>
                <Input placeholder={label} value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Item>
            <Button disabled={name.trim() === ''} onClick={() => handleCreate(name)} htmlType="submit">Create</Button>
        </Form>
    );
};