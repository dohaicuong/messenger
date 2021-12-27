import { Add } from '@mui/icons-material'
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePaginationFragment, graphql, useMutation } from 'react-relay'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserSearchingInputPaginationQuery } from './__generated__/UserSearchingInputPaginationQuery.graphql'
import { UserSearchingInputRoomCreateMutation } from './__generated__/UserSearchingInputRoomCreateMutation.graphql'
import { UserSearchingInput_me$key } from './__generated__/UserSearchingInput_me.graphql'

type UserSearchingInputProps = {
  meRef: UserSearchingInput_me$key
}

const UserSearchingInput: React.FC<UserSearchingInputProps> = ({ meRef }) => {
  const { data, refetch } = usePaginationFragment<UserSearchingInputPaginationQuery, UserSearchingInput_me$key>
  (
    graphql`
      fragment UserSearchingInput_me on User
      @refetchable(queryName: "UserSearchingInputPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
        where: { type: "OthersConnectionWhere!", defaultValue: {} }
      )
      {
        id
        others(
          first: $count
          after: $cursor
          where: $where
        )
        @connection(key: "UserSearchingInput_me_others")
        {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    meRef
  )
  const users = data.others.edges?.map(edge => {
    if (!edge?.node) return undefined

    return {
      label: edge.node.name,
      value: edge.node.id
    }
  }) || []

  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    refetch({ where: { name: inputValue || undefined }})
  }, [inputValue])

  const [value, setValue] = useState<any>()
  const [createRoomCommit, isCreatingRoom] = useMutation<UserSearchingInputRoomCreateMutation>(graphql`
    mutation UserSearchingInputRoomCreateMutation($input: RoomCreateInput!, $connections: [ID!]!) {
      roomCreate(input: $input) {
        room
        @appendNode(
          edgeTypeName: "RoomEdge"
          connections: $connections
        )
        {
          id
          ...RoomItem_room
        }
      }
    }
  `)

  const navigate = useNavigate()
  const handleCreateRoom = () => {
    const participantIds = (value?.map(({ value }: { value: string }) => value) || []) as string[]
    createRoomCommit({
      variables: {
        input: { participantIds },
        connections: [
          `client:${data.id}:__RoomList_me_rooms_connection`,
        ]
      },
      onCompleted: (res, errors) => {
        if(res.roomCreate?.room?.id) navigate(`/app/messages/${res.roomCreate.room.id}`)
      }
    })
  }
  
  return (
    <Autocomplete
      options={users}
      getOptionLabel={(option) => option?.label || ''}

      value={value}
      onChange={(_e, newValue) => setValue(newValue)}

      inputValue={inputValue}
      onInputChange={(_e, newInputValue) => setInputValue(newInputValue)}

      isOptionEqualToValue={(option, value) => {
        return option?.value === value?.value
      }}

      disabled={isCreatingRoom}

      multiple
      fullWidth
      filterSelectedOptions
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
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleCreateRoom}>
                  <Add />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}

export default UserSearchingInput
