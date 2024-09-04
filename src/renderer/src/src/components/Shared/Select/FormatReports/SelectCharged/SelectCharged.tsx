/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IOption {
  label: string;
  value: string;
}
interface Props {
  options: IOption[];
  //   value: string;
  //   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}
export function SelectCharged({ options, name }: Props) {
  function handleOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.target.value;
  }
  return (
    <>
      <select name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
