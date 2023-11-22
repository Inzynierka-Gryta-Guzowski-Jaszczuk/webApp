import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Code, Icon } from "@chakra-ui/react";
// import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, label, isRequired=false }) => {
  const inputRef = useRef();
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // label={<Icon as={FiFile} />}
        />
        <input type='file' onChange={(e) => onChange(e.target.files[0])} accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} inputRef={ref} style={{ display: 'none' }}></input>
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => {inputRef.current.click()
          debugger;}}
          value={value?.name}
        />
      </InputGroup>
      <FormErrorMessage>
        {invalid}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FileUpload;