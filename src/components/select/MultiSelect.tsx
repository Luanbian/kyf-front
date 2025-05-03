import { FieldInputProps } from "formik";
import Select from "react-select";

export const options = [
  { value: "cs", label: "CS:GO" },
  { value: "valorant", label: "Valorant" },
  { value: "lol", label: "League of Legens" },
  { value: "rl", label: "Rocket League" },
  { value: "al", label: "Apex Legends" },
  { value: "pubg", label: "PUBG" },
];

export const MultiSelect = (field: FieldInputProps<string>) => {
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map(
      (option: { value: string; label: string }) => option.value,
    );
    field.onChange({
      target: {
        name: field.name,
        value: selectedValues,
      },
    });
  };

  return (
    <Select
      isMulti
      options={options}
      onChange={handleChange}
      value={options.filter((option) => field.value.includes(option.value))}
      className="cs-select"
      styles={{
        control: () => ({}),
        option: () => ({}),
        menu: () => ({}),
      }}
      isSearchable={false}
      placeholder="Selecione os jogos de interesse"
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
};
