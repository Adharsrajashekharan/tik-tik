import { footerList1, footerList2, footerList3 } from "@/utils/constants"
type listprops={
    mp:string[],
    mt:boolean
}


const List =({mp,mt}:listprops)=>(
    <div className={`flex flex-wrap ${mt&& 'mt-5'} gap-2 mt-5 `}>
    {mp.map((m)=>{
      return(
          <p key={m} className='text-gray-400 text-sm hover:underline cursor-pointer '>
              {m}
          </p>
      )
    })}
    </div>
)





const Footer = () => {
  return (
    <div className={`mt-6 hidden xl:block`}>
     <List mp={footerList1} mt={false} />
     <List mp={footerList2} mt />
     <List mp={footerList3} mt />

    </div>
  )
}

export default Footer
