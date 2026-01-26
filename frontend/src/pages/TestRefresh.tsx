import axios from "axios";
import { useEffect } from "react";



const Stuff = () =>{
    const link = import.meta.env.VITE_SERVER_URL
    console.log(link)
    useEffect(()=>{
        const func = async()=>{
            try{
                const res = await axios.put(`${link}/api/refresh`, {}, {withCredentials: true})
            } 
            catch(e: any){
                console.log(e)
                if (e.status == 401){
                    console.log( "WE CAUGHT IT")
                    await axios.post(`${link}/api/refresh`, {} , {withCredentials: true})
                }
            }
            // // console.log(res)

            // console.log(res.status)
            // if(res.status == 401){
            //     console.log("We ran outta auth!!!!")
            // }
        }
        func();
    }, [])

    return(
        <>
        GFSDGSDFGDSFGSDGD
        </>


    )

}
    
export default Stuff
