import{Dispatch, FC, SetStateAction } from "react"
import { IListItem } from "../admin-list/admin-list.interface"
import { useRouter } from "next/navigation"
import { TbSlideshow } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import st from "./AdminActions.module.scss"

interface IAdminActions extends Pick<IListItem, "editUrl" | "viewUrl">{
    removeHadler?: () => void
    showOrder: boolean | undefined,
    showMore: boolean,
    setShowMore?: Dispatch<SetStateAction<boolean>>;
}


const AdminActions: FC<IAdminActions>= ({
    editUrl,
    removeHadler,
    viewUrl,
    showOrder,
    showMore, 
    setShowMore
}) => {
    const {push} =useRouter()
   
  return (
    <div className={st.actions}>
        {
            viewUrl && (
                <button onClick={()=>push(viewUrl)}><TbSlideshow fontSize={25}/></button>
            )
        }   
        {
            editUrl && (
                <button onClick={()=>push(editUrl)}><CiEdit fontSize={25}/></button>
            )
        }  
        {
            removeHadler && (
                <button onClick={removeHadler}><MdDeleteOutline fontSize={25}/></button>

            )
        }  
        {
            showOrder && setShowMore &&
            <button onClick={()=>setShowMore(!showMore)}><TbSlideshow fontSize={25}/></button>
        }    
   
    </div>
  )
}

export default AdminActions
