import React,{useState,useEffect,createContext,useContext} from 'react'
import { API } from '../components/api/Api'
import { useNavigate } from 'react-router-dom'
// instance createContext
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [accUser,setAccUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [filter,setFilter]= useState('Beef')
    const [categLoading,setCategLoading] = useState(true)
    const [isOpen,setIsOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
      const getUser = async()=>{
        try{
          const res = await API.get('/user')
          setAccUser(res.data.user)

        }catch(err){
          console.log(err.response.statusText)
          if(err.response.statusText === 'Unauthorized'||err){
          navigate('/')
        }
        }finally{
          setLoading(false)

        }
      }
      getUser()
    },[])
    
  return (
   
    <AuthContext.Provider 
    value={{accUser,setAccUser,
    loading,setLoading,setFilter,
    filter,categLoading,setCategLoading
    ,isOpen,setIsOpen}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
