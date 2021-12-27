import { Autocomplete, InputAdornment, TextField } from "@mui/material"

const options = [
  { label: 'Yuki', value: 'User:1' },
  { label: 'Miku', value: 'User:2' },
]

const NewRoomPage = () => {
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.label}
      defaultValue={[options[0]]}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='start'>
                To:
                <span style={{ marginLeft: 8 }}>
                  {params.InputProps.startAdornment}
                </span>
              </InputAdornment>
            ),
            endAdornment: undefined
          }}
        />
      )}
    />
  )
}

export default NewRoomPage
