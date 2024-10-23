/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './SearchBar.scss'
import { useState } from 'react'
import Select from 'react-select'
import { UseSocios } from '../../context/socios.context'
import { Controller } from 'react-hook-form'
export interface optionSearchBar {
  value: string | number
  label: string
  header: string
  subtitle: string
  text: string
  data: any
}
interface SearchBarProps {
  // handleChange: (option: any) => void;
  control: any
  name: string
  options: optionSearchBar[] | undefined
  placeholder: string
  disabled?: boolean
  onChangeActions: (value?: any) => void
}

export function SearchBar({
  options,
  control,
  name,
  placeholder,
  disabled,
  onChangeActions
}: SearchBarProps): JSX.Element {
  const { socios } = UseSocios()
  const [selectedOption, setSelectedOption] = useState<optionSearchBar>()
  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  // const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(false)
  // const handleChange = (option: any) => {
  //   setSelectedOption(option);
  //   console.log("Select option: ", option);
  //   return option.value;
  // };
  const formatOptionLabel = ({ header, subtitle, text }: optionSearchBar): JSX.Element => (
    <div className="container-options">
      <div style={{ fontWeight: 'bold' }}>{`${header}`}</div>
      <div style={{ fontSize: 'smaller' }}>{subtitle}</div>
      <div style={{ fontSize: 'smaller' }}>{text}</div>
    </div>
  )
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onChange={(option) => {
            option && option.value && onChangeActions(option.value)
            field.onChange(option?.value)
          }}
          className="basic-single"
          classNamePrefix="select"
          // defaultValue={options ? options[0] : null}
          value={options?.find((option) => option.value === field.value)}
          isDisabled={disabled ? disabled : false}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={options}
          placeholder={placeholder}
          formatOptionLabel={formatOptionLabel}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: '#8fd1e0',
              primary: '#4071b3'
            }
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: [state.isFocused ? '0.1rem solid #4071b3' : '0.16rem solid #4071b3']
            })
          }}
        />
      )}
    />
  )
}
