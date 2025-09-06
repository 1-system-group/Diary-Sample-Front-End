import {useEffect, useRef, useState} from 'react'
import ManageItem from '../../types/Manage.js'
import UnlockButton from './UnlockButton.js'
import Header from './Header.js'
import Footer from './Footer.js'
import '../../css/manage.css'
import '../../css/bootstrap.css'
import '../../js/bootstrap.js'
import '../../css/style.css'

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

    const [list, setList] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [nowPage, setNowPage] = useState(0)
    const [existPrevPage, setExistPrevPage] = useState(true)
    const [existNextPage, setExistNextPage] = useState(true)

    
    useEffect(() => {
    
        // まだAPI通信を入れていないので、画面表示項目は動作確認用に、useEffect()内で固定値を入れている状態です。
        const localList = [
        {no:'1', userId:'101', userName: 'あいうえお', email: 'test@gmail.com', emailConfirmed: null, telNo: '070-1111-2222', lockStatus: true, failCount: '2', lockOut: true },
        {no:'2', userId:'102', userName: 'かきくけこ', email: 'test2@gmail.com', emailConfirmed: 1, telNo: '070-3333-4444', lockStatus: null, failCount: '0', lockOut: false },
        {no:'3', userId:'103', userName: 'さしすせそ', email: 'test3@gmail.com', emailConfirmed: 1, telNo: '070-5555-6666', lockStatus: null, failCount: '0', lockOut: false }
        ]
        setList(localList)

        setPageNum(3)

        setNowPage(1)  
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
                                           <td key={item.no}>{item.no}</td>
                                           <td key={item.no}>{item.userId}</td>
                                           <td key={item.no}>{item.userName}</td>
                                           <td key={item.no}>{item.email}</td>
                                           <td key={item.no}>{item.emailConfirmed === 1 ? '済' : '未'}</td>
                                           <td key={item.no}>{item.telNo}</td>
                                           <td key={item.no} className="px-4">
                                             <UnlockButton lockOut={item.lockOut} no={item.userId} />
                                           </td>
                                           <td key={item.no}>{item.fail_count}</td>
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
                                       <a class="page-link text-secondary" >&lt;&lt;</a>
                                   </li>
                           : null}
                           {Array.from({ length: pageNum }, (_, i) => {
                               if ((i + 1) === nowPage) {
                                   return <li class="page-item"><a class="page-link manage_theme" >{i + 1}</a></li>
                               } else {
                                   return <li class="page-item"><a class="page-link text-secondary" >{i + 1}</a></li>
                               }
                           })}
                           {existNextPage ?
                                   <li class="page-item">
                                       <a class="page-link text-secondary" >&gt;&gt;</a>
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
    );
}

export default Manage;
