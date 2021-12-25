import { useParams } from "react-router-dom"

const Room = () => {
  const { id } = useParams<{ id: string }>()
  console.log(id)

  return (
    <>
      Room
    </>
  )
}

export default Room
