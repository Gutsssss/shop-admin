import { Input } from 'antd';
interface MyInputProps {
  input: string;
  onChangeInput: (e: string) => void;
}

export const MyInput = ({ input, onChangeInput }:MyInputProps) => {
  return (
    <Input.Search
      value={input}
      onChange={(e) => onChangeInput(e.target.value)}
      placeholder="Start typing the text for the search product"
    />
  );
};