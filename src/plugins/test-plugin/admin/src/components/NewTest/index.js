import React from 'react';
import { useEffect,useState} from 'react';
// import { useIntl } from 'react-intl';
import {Stack,SingleSelect,SingleSelectOption} from '@strapi/design-system'
//import DistrictApiHandler from '../../api/districlist';


//   const Dropdown = ({
//     options
//   }) 

const NewTest =  ({
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
  // const { formatMessage } = useIntl();
   const [state,setState]=useState([]);
   const [stateValue,setStateValue]=useState(0);
   const [districtValue,setDistrictValue]=useState(0);
   const [district,setDistrict]=useState([]);
   const [districtshow,setDistrictStatus]=useState(false);

   const Statelist = ([
    {
        id:0,
        name:"Select State"
    },
    {
        id:1,
        name:" State 0 "
    },
    {
        id:2,
        name:"State 1"
    },
    {
        id:3,
        name:"State 2"
    },
    {
        id:4,
        name:"State 3"
    }
])
  const SelectDistrict = ([
    {
        id:0,
        state_id:0,
        name:"Select State"
    },
    {
        id:1,
        state_id:3,
        name:"District 0"
    },
    {
        id:2,
        state_id:1,
        name:"District 1"
    },
    {
        id:3,
        state_id:3,
        name:"District 2"
    },
    {
        id:4,
        state_id:1,
        name:"District 3"
    },
    {
        id:5,
        state_id:1,
        name:"District 4"
    },
    {
        id:6,
        state_id:2,
        name:"District 5"
    }

]) 

  useEffect(()=>{
    if(value!=undefined){
        let data=value.split(',')
        console.log("SGGSkGSKGSkG "+data[0])
        
        setStateValue(data[0])
        if(data[0]>0){
            let filteredData =[{
                id:0,
                state_id:0,
                name:"Select District"
            }]
            let dataList = SelectDistrict.filter((val) => {
                return val.state_id == data[0];
            });
            filteredData.push(...dataList)
            setDistrict(filteredData)
            setDistrictStatus(true) 
            setDistrictValue(data[1])
        }   
    }
    
  },[])
  useEffect(()=>{
    
    createProps()

   },[stateValue,districtValue])

   const createProps=() =>
   {
    const val=`${stateValue},${districtValue}`
     
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

//   useEffect(()=>{
//     setDistrictValue(0)
 
//   },[district])

const handleChange = (val0) => {   
       console.log("call on change");
        if(val0.id==0)
          setDistrictStatus(false)
        else{
            let filteredData =[{
                id:0,
                state_id:0,
                name:"Select District"
            }]
            let dataList = SelectDistrict.filter((val) => {
                return val.state_id === val0.id;
            });
            filteredData.push(...dataList)
            setDistrict(filteredData)
            setDistrictStatus(true) 
            setDistrictValue(0)
        }   
    };
  
    const handleChange1 = (id) => {
        let value = district.find( (element) => element.id== id);
        setDistrictValue(id)
     }

    
  return (
    console.log("Seleset setStatecvalue  "+districtValue),
     <Stack horizontal spacing={4}>
        <SingleSelect label="State" 
              required ={false}
              placeholder="Select  State" 
              hint="Select State" 
              onChange={(id)=>{
                let value = Statelist.find( (element) => element.id== id);
                console.log("Selected state name "+value.id)
                setStateValue(id)
               
                handleChange(value)
              }}
              value={stateValue}>

                {
                    Statelist.map((value)=>{
                        return (
                            <SingleSelectOption value={value.id}>{value.name}</SingleSelectOption>    
                        )
                    })
                }
    
        </SingleSelect>
        {districtshow ?
        <SingleSelect label="District" 
            required ={false}
            placeholder="Select District" 
            hint="Select District" 
            onChange={handleChange1}
            value={districtValue} >
          {
              district.map((value1)=>{
                  return (
                      <SingleSelectOption value={value1.id}>{value1.name}</SingleSelectOption>    
                  )
              })
          }

        </SingleSelect>:null
      }
     </Stack> 
   

  );
};
//For help to get data from Input
 
export default NewTest;
