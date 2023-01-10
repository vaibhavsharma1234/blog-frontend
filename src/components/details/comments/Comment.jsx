



import { useContext } from "react"
import { DataContext } from "../../../context/DataProvider"
import { Box, Typography, styled } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import { getAccessToken } from "../../../utils/common-utils";
import { API_URL } from "../../../service/api";
const Componenet = styled(Box)`
margin-top:30px;
background:#F5F5F5;
padding :10px;


`;
const Container = styled(Box)`
display:flex;
margin-bottom:5px;

`
const Name = styled(Typography)`
font-weight:600;
font-size:18px;
margin-right:20px;
`;
const StyledDate = styled(Typography)`
color:#878787;
font-size:14px;

`
const Delete = styled(DeleteIcon)`
margin-left:auto;

`


const Comment = ({ comment,setTogle }) => {
    const { account } = useContext(DataContext);
    const removeComment = async () => {
        let res = await axios.delete(`${API_URL}/comment/delete`, {
            params: {
                id: comment._id
            },
            headers: {
                authorization: getAccessToken()
            }
        })
        if(res){
            setTogle(prevState=>!prevState);
        }
    }
    return (
        <Componenet>
            <Container>
                < Name >{comment.name}</ Name >
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {(comment.name === account.username || "admin") && <Delete onClick={() => removeComment()} />}

            </Container>
            <Box>
                <Typography >{comment.comments}</Typography>
            </Box>
        </Componenet>
    )
}
export default Comment;
