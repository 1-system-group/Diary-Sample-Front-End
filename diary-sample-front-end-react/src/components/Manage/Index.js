import {useEffect, useRef, useState} from 'react'
import ManageItem from '../../types/Manage.js'
import UnlockButton from './UnlockButton.js'
import Header from './Header.js'
import Footer from './Footer.js'
import '../../css/bootstrap.css'
import '../../js/bootstrap.js'
import '../../css/style.css'
import '../../css/manage.css'

function Manage() {

    const defaultList:ManageItem[] = [{
        no : null,
        userId: null,
        userName: null,
        email: null,
        emailConfirmed: null,
        telNo: null,
        lockStatus: null,
        failCount: null,
        lockOut: null,
    }]

    // 一覧の表示データ
    const [list, setList] = useState([])
    // 最大ページ数
    const [pageNum, setPageNum] = useState(0)
    // 現在のページ
    const [nowPage, setNowPage] = useState(0)
    const [existPrevPage, setExistPrevPage] = useState(true)
    const [existNextPage, setExistNextPage] = useState(true)

    const apiUrl = "https://localhost"
    const apiPort = "44349"
    
    //TODO 認証はいったん無しにしておく
    const token = ""

    const apiGetRequest = async (url) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                "Authorization": `Bearer ${token}`,
             })
             const json = await response.json()
             return json
        } catch (error) {
            //TODO エラー処理を入れる
            console.error("API通信：" + error)
        }
    }

    const apiPostRequest = async (url, body) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                "Authorization": `Bearer ${token}`,
            })
            const json = await response.json()
            return json
        } catch (error) {
            //TODO エラー処理を入れる
            console.error("API通信：" + error)
        }
    }

    const unlockYes = async (id) => {
        const body = JSON.stringify(id)
        const apiResponse = await apiPostRequest( `${apiUrl}:${apiPort}/api/v1/ManageApi/Unlock`, body)
        const jsonResponse = JSON.parse(apiResponse)
        const jsonUsers = jsonResponse.Users
        const jsonNowPage = jsonResponse.Page.NowPage
        const jsonTotalPageNumber = jsonResponse.Page.TotalPageNumber
        setList(jsonUsers)
        setPageNum(jsonTotalPageNumber)
        setNowPage(jsonNowPage)
    }

     const getList = async () => {
         const apiResponse = await apiGetRequest(`${apiUrl}:${apiPort}/api/v1/ManageApi/Index`)
         const jsonResponse = JSON.parse(apiResponse)
         const jsonUsers = jsonResponse.Users
         const jsonNowPage = jsonResponse.Page.NowPage
         const jsonTotalPageNumber = jsonResponse.Page.TotalPageNumber
         setList(jsonUsers)
         setPageNum(jsonTotalPageNumber)
         setNowPage(jsonNowPage)
     }

    const clickPaging = async (e, pageNum) => {

        // ページ遷移を防ぐ
        e.preventDefault()

        const apiResponse = await apiGetRequest(`${apiUrl}:${apiPort}/api/v1/ManageApi/Paging?page=${pageNum}`)
        const jsonResponse = JSON.parse(apiResponse)
        const jsonUsers = jsonResponse.Users
        const jsonNowPage = jsonResponse.Page.NowPage
        const jsonTotalPageNumber = jsonResponse.Page.TotalPageNumber
        setList(jsonUsers)
        setPageNum(jsonTotalPageNumber)
        setNowPage(jsonNowPage)
    }

    // 画面表示時	
    useEffect(() => {
        getList()
    }, [])
    
    return (
        /* headタグの要素はまだ */
        <div>
           <Header/>
           <h5>Manage/Index</h5>
           <h3><img src="./../lib/bootstrap-icons/gear.svg" alt="" width="32" height="32" title="management"/>管理</h3>
           <div>
               <h4></h4>
               <hr />
               <div class="row">
                   <div class="col-md-3">
                       <ul class="nav nav-pills flex-column">
                           <li class="nav-item"><a class="nav-link manage_theme" id="manage_account" asp-area="" asp-controller="Manage" asp-action="Index">アカウント管理</a></li>
                       </ul>
                   </div>
                   <div class="col-md-9">
                       <div class="row">
                           <div class="col-md-12">
                               <table class="table table-bordered table-hover account_list">
                                   <tr className="theme_account_title">
                                       <th className="no">No</th>
                                       <th className="user_id">ユーザID</th>
                                       <th className="user_name">ユーザ名</th>
                                       <th className="email">Eメール</th>
                                       <th className="reg_status">メール確認済</th>
                                       <th className="tel_no">電話番号</th>
                                       <th className="lock_status">ロック</th>
                                       <th className="fail_count">ログイン失敗回数</th>
                                   </tr>
                                   {list.map(item => (

                                   <tr class="theme_account_content">
                                           <td>-</td>
                                           <td>{item.Id}</td>
                                           <td>{item.UserName}</td>
                                           <td>{item.Email}</td>
                                           <td>{item.EmailConfirmed === 1 ? '済' : '未'}</td>
                                           <td>{item.PhoneNumber}</td>
                                           <td className="px-4">
                                                 <UnlockButton lockOut={item.LockOut} userId={item.Id} unlockYes={unlockYes} />
                                           </td>
                                           <td key={item.Id}>{item.AccessFailedCount}</td>
                                   </tr>
                                   ))}

                               </table>
                           </div>
                           <input type="hidden" id="unlockId" name="unlockId" />
                       </div>
                       <div class="row">
                           <div class="col-2">
                               <button id="newEntry" class="btn btn-sm manage_theme" >登録</button>
                           </div>
                           
                           <div class="col-10">
                               <ul class="pagination justify-content-end">
                           {existPrevPage ?
                                   <li class="page-item">
                                       <a class="page-link text-secondary" onClick={(e) => clickPaging(e, 1)}>&lt;&lt;</a>
                                   </li>
                           : null}
                           {Array.from({ length: pageNum }, (_, i) => {
                               if ((i + 1) === nowPage) {
                                   return <li class="page-item"><a class="page-link manage_theme" onClick={(e) => clickPaging(e, i + 1)}>{i + 1}</a></li>
                               } else {
                                   return <li class="page-item"><a class="page-link text-secondary" onClick={(e) => clickPaging(e, i + 1)}>{i + 1}</a></li>
                               }
                           })}
                           {existNextPage ?
                                   <li class="page-item">
                                       <a class="page-link text-secondary" onClick={(e) => clickPaging(e, pageNum)} >&gt;&gt;</a>
                                   </li>
                           : null}
                               </ul>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <Footer/>
       </div>
    )
}

export default Manage
