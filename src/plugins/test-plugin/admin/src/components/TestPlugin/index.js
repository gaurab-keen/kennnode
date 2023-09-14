import React from 'react';
import { useEffect,useState} from 'react';
import { useIntl } from 'react-intl';
import {Stack,Box,Layout,TextInput,Typography,Button,SingleSelect,SingleSelectOption} from '@strapi/design-system'
import DistrictApiHandler from '../../api/districlist';
import { useFetchClient }  from '@strapi/helper-plugin';



const TestPlugin =  ({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) => {
  const { formatMessage } = useIntl();
  const [review,setReview]=useState("");
  const [reviewStatus,setReviewStatus]=useState("");
  const [reviewcolor,setReviewColor]=useState("primary600");
  const [doneButton,setDoneButton]=useState(false);
  const [rejectButton,setRejectButton]=useState(false);
  const [reviewButton,setReviewButton]=useState(false);
  const {get}=useFetchClient()
 
  useEffect(()=>{
    console.log("check value of Props10000 "+value)
    if(value===undefined){
      console.log("check value of Props1 "+value)
      setReview('Data is in draft mode')
      setReviewColor("primary600") 
      setReviewStatus('draft')
        //setReview('Data is in draft mode')
    } else{
      //console.log("check value of Props2 "+value)
      setReviewStatus(value)
       if(value=='sent'){
        setReview('Data has sent for review ')
        setReviewColor("primary600")  
       }   
       else if(value=='done'){
        setReview('Data has checked by reviewer')
        setReviewColor("primary600")  
       } 
       else if(value=='reject'){
        setReview('Data has rejected by reviewer ,Please check again')
        setReviewColor("primary600")  
       } else{
        setReview('Data is in draft mode')
        setReviewColor("primary600")  
       }   
    }  
    
     fetchAdmin(value);

  
  // console.log("check value of props  data "+value)
    //  setReview("Done Review");
  },[])
  useEffect(()=>{
    
    createProps(reviewStatus)

   },[reviewStatus])

  


  async function fetchAdmin(value1){
    // try{
     // const data= DistrictApiHandler.getAdminUser(1);
     

       const requestURL = `/test-plugin/getadmin/`;
       const adminList = await get(requestURL)
       
     
       if(adminList.data.email=='gaurab.kumar@fosteringlinux.com'){
       // console.log("equalssssssff999999999 "+adminList.data.email)
    
          if(value1=='draft' || value1=='reject'){
            console.log("equalssssssff666  "+value1)
            setDoneButton(true)
            setRejectButton(false)
            setReviewButton(false)
          }else{
            console.log("equalssssssff777  "+value1)
            setDoneButton(true)
            setRejectButton(true)
            setReviewButton(false)
          }  
       }else{
          if(value1=='done'){
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(false)
            }else{
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(true)
            }
       }

  }
  async function handleDoneEvent() {
   
   //  setReview("Reviewed, Ready for published");
     setReviewStatus("done")
     setReview('Data has checked by reviewer')
     setReviewColor("sucess600") 
     //setReviewColor("sucess700")
  }
  
  async function handleRejectEvent() {
    //setReview("Rejected Please check again");
    setReviewStatus("reject")
    setReview('Data has rejected by reviewer, Please check again')
    setReviewColor("danger600") 
   // setReviewColor("denger700")
   
  }
  async function handleReviewedEvent() {
   // setReview("Sending for review to publisher");
    setReviewStatus("sent")
    setReview('Data has sent for review ')
    setReviewColor("primary600") 
     
  }
  function createProps(val)
  {
    
    description='';
    disabled=false;
    error='';
    intlLabel='';
    name=name;
    placeholder='';
    required=required;
    onChange=onChange({target: {name, value: val, type: 'string' }})
    value=val
  }
  
  return (
      <Box>
        <Layout >  
     <Stack horizontal spacing={4} marginTop={20}>
        {doneButton ? 
          <Button variant="default" onClick={handleDoneEvent}>Review Completed</Button> 
         :null}
         {rejectButton ?
          <Button variant="default" onClick={handleRejectEvent}>Reject</Button>:null
         }
        {reviewButton ?
          <Button variant="default" onClick={handleReviewedEvent}>Send for Review</Button>:null
         }
          
     </Stack>  
         <Typography 
         textColor={reviewcolor}
         variant="Omega">{review}</Typography> 

        {/* <TextInput
        disabled={false}
        error={error}
        label= 'Review Status'
        name={name}
        hint={description ? formatMessage(description) : ''}
        onChange={(event) => {onChange({target: {name, value: event.target.value, type: 'string' }})}}
        placeholder={placeholder ? formatMessage(placeholder) : ''}
        required={required}
        value={value || ''}>


</TextInput>  

    <SingleSelect label="Fruits" 
              required 
              placeholder="My favourite fruit is..." 
              hint="Fruits are not vegetables" 
              error={error} 
              
              disabled={false}
              value={value} >
          <SingleSelectOption value="1">Under Review</SingleSelectOption>
          <SingleSelectOption value="2">Reviewed</SingleSelectOption>
          <SingleSelectOption value="3">Rejected</SingleSelectOption>
       
        </SingleSelect> */}




        {/* <Typography
            disabled={disabled}
            error={error}
            label= 'bcdf'
            name={name}
            hint={description ? formatMessage(description) : ''}
            placeholder={placeholder ? formatMessage(placeholder) : ''}
            required={required}
            value={value || 0}>
        </Typography>  */}

        </Layout>
      </Box> 
  );
};
//For help to get data from Input
 
export default TestPlugin;
