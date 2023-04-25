import axios from "axios"
import { Video } from "@/types"
import React from 'react'
import Videocard from "@/components/Videocard"
import NoResults from "@/components/NoResults"
type vdo={
  videos:Video[]
}


const Home = ({videos}:vdo) => {
  console.log(videos)
  return (
    <div className="flex flex-col gap-10 videos h-full">
    {videos.length?(
      videos.map((video:Video)=>{
        return(
          <Videocard post={video} key={video._id}/>
        )
      })
    ):
    (
      <NoResults text={'no videos'}/>
    )
    }
    </div>
  )
}
//data need to be fetched on request
export const getServerSideProps=async()=>{
  const {data} =await axios.get(`http://localhost:3000/api/post`)
  return{
    //whatever passeed as props is expected above on component
    props:{
      videos:data
    }
  }
}
export default Home
