import { useParams } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Heading, Input } from "@chakra-ui/react";
import { FieldInfo } from "../../../../components/field-info-component";
import { useState } from "react";
import BreadcrumbComponent from "../../../../components/breadcrumb-component";
import dayjs from "dayjs";
import { validate as isValidUUID } from 'uuid';
import NotFoundPage from "../../../../components/not-found-page";
import { ServicesApi } from "../../../../api/constants";
import MasterDataNavigation, { masterDataNavigationItems } from "../../../components/master-data-navigation";

const RegistrationCertificateByIdPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  if (!isValidUUID(id)) {
    return(
      <NotFoundPage />
    )
  }

  const {data, isLoading, isSuccess, isError, error } = ServicesApi.registrationCertificates.useGetById(id);
  const update = ServicesApi.registrationCertificates.useUpdate();
  const deleteItem = ServicesApi.registrationCertificates.useDelete();

  const [isEditable, setEditable] = useState(false);
  const [editableButtonCaption, setEditableButtonCaption] = useState('Редактировать');

  const handleDelete = (id: string) => {
    deleteItem.mutate(id,

      {
        //onSuccess: () => closeModal(),
        onError: (err) => console.log(err.message)
      }
    )
  }

  const form = useForm({
    defaultValues: {
      tradeName: data?.tradeName ?? '',
      regCertNumber: data?.regCertNumber ?? '',
      createAtRegCer: dayjs(data?.createAtRegCer).format('YYYY-MM-DD') ?? '',
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: z.object({
        tradeName: z.string().min(5, { message: "Must be 5 or more characters long" }),
        regCertNumber: z.string().min(5, { message: "Must be 5 or more characters long" }),
        createAtRegCer: z.string().min(5, { message: "Must be 5 or more characters long" }),
      }),
    },
    onSubmit: async ({ value }) => {

      update.mutate({data: value, id},

      {
        //onSuccess: () => closeModal(),
        onError: (err) => console.log(err.message)
      }
    )
    }
    
  })

  if (isLoading) {
    <span>Loading</span>
  }

  if (isError) {
    return(
      <div>{error.message}</div>
    )
    
  } 

  if (isSuccess) {
    //let {data} = items;


  
    return (
      <div>        
        <BreadcrumbComponent lastItemDescription={data.regCertNumber}/>

        <Box marginTop={'10px'}>

          <Heading display={'flex'} justifyContent={'center'} size={'lg'}>Регистрационное удостоверение</Heading>

          <Box padding={'20px'} layerStyle={'form'} marginTop={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'} marginX={'auto'}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if(!isEditable) {
                  form.handleSubmit();
                }                
              }}
            
            >
            <Box  display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'10px'}>
              <form.Field name="tradeName" children={(field) => (
                <FormControl isDisabled={!isEditable} display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>  
                  <Grid templateColumns={'repeat(3, 1fr)'} alignContent={'center'} gap={'10px'}>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                      <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Торговое наименование:</FormLabel>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Input w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                      <FieldInfo field={field} />




                    </GridItem>
                  </Grid>
                </FormControl>
              )} />
              <form.Field name="regCertNumber" children={(field) => (
                <FormControl isDisabled={!isEditable} display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>
                  <Grid templateColumns={'repeat(3, 1fr)'} alignContent={'center'} gap={'10px'}>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                      <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Номер РУ:</FormLabel>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Input w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                      <FieldInfo field={field} />
                    </GridItem>
                  </Grid>
                </FormControl>
              )} />
              <form.Field name="createAtRegCer" children={(field) => (
                <FormControl isDisabled={!isEditable} display={'flex'} alignItems={'center'} gap={'10px'} isRequired isInvalid={Boolean(field.state.meta.errors.length)}>    
                  <Grid templateColumns={'repeat(3, 1fr)'} alignContent={'center'} gap={'10px'}>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                      <FormLabel padding={'5px'} width={'100%'} textAlign={'right'} margin={0} htmlFor={field.name}>Дата регистрации РУ:</FormLabel>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'center'}>
                      <Input type="date" w={'300px'} id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)}/>
                    </GridItem>
                    <GridItem display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                      <FieldInfo field={field} />
                    </GridItem>
                  </Grid>
                </FormControl>
              )} />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  // <Button type="submit" disabled={!canSubmit}>
                  //   {isSubmitting ? '...' : 'Submit'}
                  // </Button>
                  <Button size={'sm'} type="submit" disabled={!canSubmit} onClick={() => {
                    setEditable(!isEditable);
                    !isEditable
                    ? setEditableButtonCaption('Сохранить')
                    : setEditableButtonCaption('Редактировать');
                    }}>
                      {editableButtonCaption}
                  </Button>
                )}
              />

              <Button size={'sm'} bg={'red.100'} onClick={() => handleDelete(id)}>В архив</Button>

              <Heading display={'flex'} justifyContent={'center'} size={'md'}>Форма выпуска</Heading>
            </Box>
              
            </form>
          </Box>
        </Box>
      </div>
    )
  }
}

export default RegistrationCertificateByIdPage;
