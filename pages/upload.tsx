import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import MdDelete from "react-icons/md";

import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/constants";
const Upload = () => {
const router=useRouter()
  const [isLoading, setIsloading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const[caption,setCaption]=useState('')
  const [category,setCategory]=useState(topics[0].name)
  const[savingPost,setSavingPost]=useState(false)
  const [wrongFileType, setWrongFileType] = useState(false);
  const {userprofile}:{userprofile:any}=useAuthStore()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsloading(false);
        });
    } else {
      setIsloading(false);
      setWrongFileType(true);
    }
  };


  const handlePost= async () => { 
    // console.log("first")
    // console.log("lol",caption,videoAsset,category);
    // if(caption && videoAsset?.id && category){
        console.log("second")
        // console.log("lol",caption,videoAsset,category);
        setSavingPost(true);

        const document={
            _type:'post',
            caption,
            video:{
                _type:'file',
            asset:{
           _type:'reference',
          _ref:videoAsset?._id

            },
        },
        userId: userprofile?._id,
        postedby:{
            _type:'postedby',
            _ref:userprofile?._id
        },
        topic: category
    }
    console.log("object");
    await axios.post('http://localhost:3000/api/post',document)
    console.log("onlast")
    router.push('/')
// }
  }
  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white w-[80%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-12 pt-0">
        <div>
          <div>
            <p className="text-2xl font-bold">upload video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[360px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 ">
            {isLoading ? (
              <p></p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] w-[750px] bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p>
                          <FaCloudUploadAlt className="text-gray-300 text-6xl " />
                        </p>
                        <p className="text-xl font-semibold">upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        mp4 or webM or ogg <br />
                        720*1280 or higher <br />
                        upto 10 minutes <br />
                        Less than 2GB
                        <br />
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-53 outline-none">
                        upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-gray-200 p-2"
          />
          <label className="text-md font-medium">choose a categort</label>
          <select
            onChange={(e) =>setCategory(e.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              type="button"
              onClick={() => {}}
              className=" border-gray-200 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>

            <button
              onClick={handlePost}
              type="button"
              className="  bg-[#F51997] text-white border-gray-200 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
