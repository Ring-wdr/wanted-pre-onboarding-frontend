import styles from './css/Inputbox.module.css';

interface IinputBox {
  value: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({ value, type, placeholder, onChange }: IinputBox) => (
  <div className={`${styles['input-form']}`}>
    <input
      className={`${styles['input-box']}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);
