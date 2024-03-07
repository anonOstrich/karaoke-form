import './FormField.css';

interface FormFieldProps {
  children: React.ReactNode;
}

export default function FormField({ children }: FormFieldProps) {
  return <div className="formfield">{children}</div>;
}
