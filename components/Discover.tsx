import { topics } from '@/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Discover = () => {
    const router=useRouter()
    const {topic}=router.query;
    const activeTopicStyle="xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full cursor-pointer text-[#FF1997]"
    const topicStyle="xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full cursor-pointer text-black"
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
 popular topics
      </p>
      <div className='flex flex-wrap gap-3'>
        {topics.map((itm)=>{
            return(
                <Link href={`/?topic=${itm.name}`} key={itm.name}>
                    <div className={topic==itm.name?activeTopicStyle: topicStyle}>
                        <span className='font-bold text-2xl xl:text-md'>
                            {itm.icon}
                        </span>
                        <span className='font-medium text-md hidden xl:block'>
                            {itm.name}
                        </span>
                    </div>
                </Link>
            )
        })}

      </div>
    </div>
  )
}

export default Discover
