import { FormControl, InputLabel, MenuItem, Select, TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React, { ReactNode } from "react";
import { string } from "yup/lib/locale";

export interface SelectOptions {
    value: string
    label: string
}

type SelecFieldProps = {
    selectFieldKey: string
    label: string
    options: SelectOptions[]
} & TextFieldProps


export const SelecFieldWrapper = ({selectFieldKey,label,options,...props}:SelecFieldProps)=>{
    const [field,meta] = useField(selectFieldKey)
    return <FormControl fullWidth>
         <TextField
            select
            variant="outlined"

            name={field.name}
            id={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label={label}
            {...props}
         >
             {options.map(option => <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>)}
         </TextField>
       </FormControl>
}