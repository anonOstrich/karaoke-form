import FormField from './FormField';

interface UsernameInputProps {
  value: string;
  setValue: (newValue: string) => void;
  disabled: boolean;
}

export default function UsernameInput({ value, setValue, disabled }: UsernameInputProps) {
  return (
    <FormField>
      <label htmlFor="username" className="required">
        Nimi tai nimimerkki
      </label>
      <input
        className="username-input"
        type="text"
        name="username"
        id="username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        disabled={disabled}
      />
    </FormField>
  );
}
