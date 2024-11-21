import { FieldApi } from "@tanstack/react-form";
import { Button, FormErrorMessage, Tooltip, WrapItem } from '@chakra-ui/icons'

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <FormErrorMessage margin={0}>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        field.state.meta.errors.join(',')
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </FormErrorMessage>
  )
}

// export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
//   return (
//     <WrapItem margin={0}>
//       {field.state.meta.isTouched && field.state.meta.errors.length ? (

//       <Tooltip label={field.state.meta.errors.join(',')} placement='top' hasArrow isOpen bg={'red.500'} color={'white'} padding={'8px'}>
//         <span></span>
//       </Tooltip>
        
//       ) : null}
//       {field.state.meta.isValidating ? 'Validating...' : null}
//     </WrapItem>
//   )
// }


{/* <WrapItem>
<Tooltip label='I am always open' placement='top' isOpen>
  <Button>Always Open</Button>
</Tooltip>
</WrapItem> */}