import Link from 'next/link'
import Image from 'next/image'
import {Flex, Box, Text, Button} from '@chakra-ui/react'

import {baseUrl, fetchApi} from '../utils/fetchApi'
import Property from '../components/Property'

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => ( 
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
  <Image src={imageUrl} width={500} height={500} alt="Banner Index" />
  <Box p="5"> 
    <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
    <Text fontSize="3xl" fontWeight="bold">{title1} <br/> {title2}</Text>
    <Text color="gray.300" fontSize="lg" paddingTop="3" paddingBottom="3">{desc1} <br/> {desc2}</Text>
    <Button fontSize="xl">
      <Link href={linkName}>{buttonText}</Link>
    </Button>
  </Box>
  {purpose}
</Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
//   console.log(propertiesForSale, propertiesForRent)
  return (
    <Box>
      <Banner 
        purpose="Rent A Home"
        title1="Rental the home"
        title2= "Everyone"
        desc1="Explore Apartements, Villas, Homes"
        desc2="and moreee"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      />

      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>

      <Banner 
        purpose="Buy A Home"
        
        title1="Find, Buy & Own Your"
        title2= "Dream Home"
        desc1="Explore Apartements, Villas, Homes"
        desc2="and moreee"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-rent"
        imageUrl="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      
      
    </Box>
  )
}

export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
   props: {
    propertiesForSale: propertyForSale?.hits,
    propertiesForRent: propertyForRent?.hits,
   }
  }
}