import React, { useEffect, useMemo, useState } from 'react';
import { AutoComplete, notification } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { debounce } from 'lodash';

import { getCities } from '../../api';

export type OptionType = {
  label: string;
  value: string;
}

type CityInputProps = Omit<AutoCompleteProps, "value" | "onChange"> & {
  value?: OptionType | string;
  onChange?: (val: OptionType | string) => void;
}

const CityInput: React.FC<CityInputProps> = ({
  allowClear = true,
  value,
  onChange,
  onSelect,
  ...props
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const debounceCall = useMemo(
    () => debounce((val: string) => {
      getCities(val)
        .then((res) => {
          setOptions(res.map((el) => ({
            label: el,
            value: el
          })))
        })
        .catch((err) => {
          console.error("API Error: ", err);
          notification.error({
            message: "Error",
            description: "Something went wrong!"
          })
        })
      },
      500
    ), []);

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        debounceCall(value);
      }
    } else {
      setOptions([]);
    }

    return debounceCall.cancel;
  }, [value, debounceCall]);

  const handleSelect = (_: string | OptionType, opt: OptionType) => {
    onChange && onChange(opt);
    onSelect && onSelect(_, opt);
  };

  return (
    <AutoComplete
      allowClear={allowClear}
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
      {...props}
      options={options}
    />
  )
};

export default CityInput;