import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Select, Text, Tooltip } from "@chakra-ui/react";
import { memo, MouseEventHandler, useCallback, useMemo } from "react";

const VISIBLE_PAGES_COUNT = 3;

type PageItemComponentProps = {
  limit: number,
  skip: number,
  setSkip:(value: number) => void,
  page: number,
}

type PaginationComponentProps = {
  limit: number,
  setLimit(value: number): void,
  skip: number,
  setSkip(value: number): void,
  total: number,
}

type PageItemsComponentProps = {
  limit: number,
  skip: number,
  setSkip(value: number): void,
  pagesItems: number[],
}

const PageItemComponent: React.FC<PageItemComponentProps> = ({setSkip, limit, page, skip}) => {
  const handlePageButtonClick = (page: number) => {
    setSkip(limit * (page - 1))
  }

  return(
    <Button
      variant={limit * (page - 1) === skip ? 'bgTeal' : 'bgWhite'}
      size={'md'}
      key={page}
      onClick={() => handlePageButtonClick(page)}
    >
      <Text minWidth={'15px'}>
        {page}
      </Text>
      
    </Button>
  )
}


const PageItemsComponent: React.FC<PageItemsComponentProps> = ({setSkip, limit, skip, pagesItems}) => {
  if (pagesItems.length > VISIBLE_PAGES_COUNT) {
    return(
    <>
      {pagesItems.map((page) => {
        return(
           <PageItemComponent setSkip={setSkip} limit={limit} page={page} skip={skip} key={page} />
        )
      }).slice(0, VISIBLE_PAGES_COUNT)}
      <Button size={'md'} variant={'none'}><Text>...</Text></Button>
      <PageItemComponent setSkip={setSkip} limit={limit} page={pagesItems[pagesItems.length-1]} skip={skip} key={pagesItems[pagesItems.length-1]} />
    </>
    )
  }

  return(
    <>
      {pagesItems.map((page) => {
        return(
           <PageItemComponent setSkip={setSkip} limit={limit} page={page} skip={skip} key={page} />
        )
      })}
    </>
  ) 
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({limit, setLimit, setSkip, skip, total}) => {
  const pages = Math.ceil(total / limit);
  const pagesItems = Array.from({length: pages}, (_, i) => i + 1)

  const handlePrevButtonClick = () => {
    if (skip >= limit) {
      setSkip(skip - limit)
    }      
  }

  const handleNextButtonClick = () => {
    if ((skip + limit) < total) {
      setSkip(skip + limit)
    }   
  }

  const handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSkip(0);
    setLimit(Number(evt.target.value));
  }
  
  return(
    <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Flex  gap={'5px'}>
        <Button disabled={skip === 0} size={'md'} onClick={() => handlePrevButtonClick()}><ChevronLeftIcon></ChevronLeftIcon></Button>
        <PageItemsComponent setSkip={setSkip} limit={limit} pagesItems={pagesItems} skip={skip}/>
        <Button disabled={skip + limit > total} size={'md'} onClick={() => handleNextButtonClick()}><ChevronRightIcon></ChevronRightIcon></Button>
      </Flex>

      <Tooltip padding={'5px'} textAlign={'center'} label='Количество элементов на странице'>
        <Select size={'md'} _hover={{bg: 'gray.50', borderColor: 'teal.700'}}  border={'1px'} borderColor={'gray.400'}  defaultValue={limit} width={'100px'} onChange={(evt) => handleChangeSelect(evt)}>
          <option value='2'>2</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
        </Select>
      </Tooltip>

    </Box>
  )
}

export default PaginationComponent;
