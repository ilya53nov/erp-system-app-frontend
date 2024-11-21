import { Box, Button, FormControl, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Tooltip } from "@chakra-ui/react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"
import { FieldInfo } from "../../../../components/field-info-component"
import BreadcrumbComponent from "../../../../components/breadcrumb-component"
import { ServicesApi } from "../../../../api/constants"

const CreateRegistrationCertificatePage: React.FC =() => {
  const mutation = ServicesApi.registrationCertificates.useCreate();

  const form = useForm({
    defaultValues: {
      tradeName: '',
      regCertNumber: '',
      createAtRegCer: '',
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        tradeName: z.string().min(5, { message: "Торговое наименование должно быть больше 5 символов" }),
        regCertNumber: z.string().min(5, { message: "Номер РУ должен быть больше 5 символов" }),
        createAtRegCer: z.string().min(5, { message: "Must be 5 or more characters long" }),
      }),
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value,

      {
        //onSuccess: () => closeModal(),
        onError: (err) => console.log(err.message)
      }
    )
    },
  })

  return (
    <div>
      <BreadcrumbComponent/>

      <Box marginTop={'10px'}>

      
      
        <Heading display={'flex'} justifyContent={'center'} size={'lg'}>Создание нового регистрационного удостоверения</Heading>

        {/* <Box width={'600px'} padding={'20px'} layerStyle={'form'} marginTop={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'} marginX={'auto'}> */}
        <Box display={'flex'}>
        <Box layerStyle={'form'} display={'inline-block'} padding={'20px'} marginTop={'20px'} marginX={'auto'}>  
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            

          >
            <Box  display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'10px'}>
              <form.Field name="tradeName" children={(field) => (
                  <FormControl display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>  
                    <Grid templateColumns={'min-content, 1fr'} alignContent={'center'} gap={'10px'} justifyContent={'end'}>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                        <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Торговое наименование:</FormLabel>
                      </GridItem>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'10px'}>                                 
                        <Input w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                      </GridItem>
                      <GridItem colSpan={2} display={'flex'} justifyContent={'center'}>
                        <FieldInfo field={field} />
                      </GridItem>
                    </Grid>
                  </FormControl>
                )} />

                <form.Field name="regCertNumber" children={(field) => (
                  <FormControl display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>
                    <Grid templateColumns={'min-content, 1fr'} alignContent={'center'} gap={'10px'}>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                        <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Номер РУ:</FormLabel>
                      </GridItem>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'10px'}>                                 
                        <Input w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                      </GridItem>
                      <GridItem colSpan={2} display={'flex'} justifyContent={'center'}>
                        <FieldInfo field={field} />
                      </GridItem>
                    </Grid>
                  </FormControl>
                )} />

                <form.Field name="createAtRegCer" children={(field) => (
                  <FormControl display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>    
                    <Grid templateColumns={'repeat(2, 1fr)'} alignContent={'center'} gap={'10px'}>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                        <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Дата регистрации РУ:</FormLabel>
                      </GridItem>
                      <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'10px'}>
                        <Input type="date" w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                        <FieldInfo field={field} />
                      </GridItem>
                    </Grid>
                  </FormControl>
                )} />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button size={'md'} marginTop={'20px'} type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Создать'}
                  </Button>
                )}
              />
            </Box>
          </form>
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export default CreateRegistrationCertificatePage;
