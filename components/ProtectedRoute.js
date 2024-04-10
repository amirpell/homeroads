import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
function ProtectedRoute(props) {
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const getUser = async () => {
   
        try{

            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/get-user-info-by-id",
                { token: localStorage.getItem('token') },
                 {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
    
            });
    
            dispatch(hideLoading());
    
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            }
           
        }catch(error){      
            dispatch(hideLoading());
           
    
        }
        
    }


    
useEffect(()=> {
    if(!user){
    getUser();
    }
},[]);



    if (localStorage.getItem('token')) {
        return props.children;

    } else {
        return <Navigate to="/welcome" />
    }

}
export default ProtectedRoute
