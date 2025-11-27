export interface CdbTextFieldProps {
  text: string;
  error: string;
  placeholder?: string;
  label?: string;
  autocomplete?: string;
}

export interface CdbTExtFieldEmits {
  'update:error': [string];
  'update:text': [string];
}
