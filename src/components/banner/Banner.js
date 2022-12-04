


import {Box,Typography,styled} from "@mui/material"
const Image= styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000 ;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
height:50vh;


`
const Heading = styled(Typography)`
font-size:70px;
color:#FFFFFF;
line-height:1;
`
const SubHeading = styled(Typography)`
font-size:20px;
background-color:#FFFFFF;

`

const Banner=()=>{
    return (
        <Image>
            <Heading>
                BLOG
            </Heading>
            <SubHeading>
                IIIT-UNA-BLOGS
            </SubHeading>
        </Image>
        
    )
}
export default Banner;