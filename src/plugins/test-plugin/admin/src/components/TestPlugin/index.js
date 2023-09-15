import React from 'react';
import { useEffect,useState} from 'react';
import { useIntl } from 'react-intl';
import {Stack,Box,Layout,TextInput,Typography,Button,SingleSelect,SingleSelectOption} from '@strapi/design-system'
//import DistrictApiHandler from '../../api/districlist';
import { useFetchClient }  from '@strapi/helper-plugin';
import {statusText,messageText,colorText,buttonText}from '../CommonFile/index'



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
     console.log("check value of Props1 "+value)
    if(value===undefined){
      //console.log("check value of Props1 "+value)
      setReview(messageText.textDraft)
      setReviewColor(colorText.colorDraft) 
      setReviewStatus(statusText.statusDraft)
        //setReview('Data is in draft mode')
    } else{
      //console.log("check value of Props2 "+value)
      setReviewStatus(value)
       if(value==statusText.textReview){
        setReview(messageText.textReview)
        setReviewColor(colorText.colorReview) 
       }   
       else if(value==statusText.statusApproved){
        setReview(messageText.textApproved)
        setReviewColor(colorText.colorApproved)  
       } 
       else if(value==statusText.statusReject){
        setReview(messageText.textReject)
        setReviewColor(colorText.colorReject)  
       } else{
        setReview(messageText.textDraft)
        setReviewColor(colorText.colorDraft)  
         
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
    
          if(value1==statusText.statusDraft|| value1==statusText.statusReject){
           console.log("equalssssssff666  "+value1)
            setDoneButton(true)
            setRejectButton(false)
            setReviewButton(false)
          }else{
            console.log("equalssssssff777  "+value1)
            setDoneButton(true)
            setRejectButton(true)
            setReviewButton(false)
            setReview(messageText.textApproved1)
            setReviewColor(colorText.colorSend)
          }  
       }else{
        console.log("equalssssssf8888  "+value1)
          if(value1==statusText.statusApproved || value1==statusText.statusReview){
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(false)
              setReview(messageText.textSend)
              setReviewColor(colorText.colorSend)
            }else{
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(true)
            }
       }

  }
  async function handleDoneEvent() {
   
   //  setReview("Reviewed, Ready for published");
     setReviewStatus(statusText.statusApproved)
     setReview(messageText.textApproved)
        setReviewColor(colorText.colorApproved) 
     //setReviewColor("sucess700")
  }
  
  async function handleRejectEvent() {
    //setReview("Rejected Please check again");
    setReviewStatus(statusText.statusReject)
    setReview(messageText.textReject)
    setReviewColor(colorText.colorReject) 
   // setReviewColor("denger700")
   
  }
  async function handleReviewedEvent() {
   // setReview("Sending for review to publisher");
   setReviewStatus(statusText.statusReview)
    setReview(messageText.textReview)
    setReviewColor(colorText.colorReview) 
     
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
     <Stack horizontal spacing={4}>
        {doneButton ? 
          <Button 
          variant="default" onClick={handleDoneEvent}>{buttonText.review}</Button> 
         :null}
         {rejectButton ?
          <Button variant="default" onClick={handleRejectEvent}>{buttonText.reject}</Button>:null
         }
        {reviewButton ?
          <Button variant="default" onClick={handleReviewedEvent}>{buttonText.sendReview}</Button>:null
         }
          
     </Stack> 
      <div  style={{margin: "10px"}}>
     <Typography 
        
        textColor={reviewcolor}
        variant="Omega">{review}</Typography> 
     </div>
         

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
