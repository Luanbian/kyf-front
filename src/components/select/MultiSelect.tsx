import { FieldInputProps } from "formik";
import Select from "react-select";

const options = [
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
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#242424",
          borderColor: "#ccc",
          borderRadius: "8px",
          padding: "4px",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#888",
          },
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? "#007bff"
            : isFocused
              ? "#e9ecef"
              : "white",
          color: isSelected ? "white" : "black",
          "&:hover": {
            backgroundColor: "#e9ecef",
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "white",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "white",
          "&:hover": {
            backgroundColor: "#0056b3",
            color: "white",
          },
        }),
      }}
    />
  );
};
