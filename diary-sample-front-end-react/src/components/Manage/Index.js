import {useEffect, useState, useCallback} from 'react'
import { useNavigate } from "react-router-dom"
import { APP_CONST } from "./Constants"
import UnlockButton from './UnlockButton.js'
import Header from './Header.js'
import Footer from './Footer.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '../../css/manage.css'

// 管理画面（一覧）
function Manage() {

    const navigate = useNavigate()

    // 一覧の表示データ
    const [list, setList] = useState([])
    // 最大ページ数
    const [pageNum, setPageNum] = useState(0)
    // 現在のページ
    const [nowPage, setNowPage] = useState(0)
    const [existPrevPage, setExistPrevPage] = useState(true)
    const [existNextPage, setExistNextPage] = useState(true)
    // 一覧の件数
    const [listCount, setListCount] = useState([0])

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
            // 今はとりあえずログだけ出して一覧ゼロ件で戻しておく
            console.error("API通信：" + error)
            const errParam = {
                Users:[],
                Page:{
                    PageCount:0,
                    TotalNumber:0,
                    NowPage:0,
                    TotalPageNumber:0
                }
            }
            return JSON.stringify(errParam)
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
            // 今はとりあえずログだけ出して一覧ゼロ件で戻しておく
            console.error("API通信：" + error)
            const errParam = {
                Users:[],
                Page:{
                    PageCount:0,
                    TotalNumber:0,
                    NowPage:0,
                    TotalPageNumber:0
                }
            }
            return JSON.stringify(errParam)
        }
    }

    // ロック解除
    const unlockYes = async (id) => {
        const body = JSON.stringify(id)
        const apiResponse = await apiPostRequest( `${APP_CONST.API_URL}:${APP_CONST.API_PORT}/api/v1/ManageApi/Unlock`, body)
        responseCommon(apiResponse)
    }

    // 一覧取得
    const getList = useCallback(async () => {
        const apiResponse = await apiGetRequest(`${APP_CONST.API_URL}:${APP_CONST.API_PORT}/api/v1/ManageApi/Index`)
        responseCommon(apiResponse)
    }, [])

    // ページ移動
    const clickPaging = async (e, pageNum) => {

        // ページ遷移を防ぐ
        e.preventDefault()

        const apiResponse = await apiGetRequest(`${APP_CONST.API_URL}:${APP_CONST.API_PORT}/api/v1/ManageApi/Paging?page=${pageNum}`)
        responseCommon(apiResponse)
    }
    
    const responseCommon = async (response) => {
        const jsonResponse = JSON.parse(response)
        const jsonUsers = jsonResponse.Users
        const jsonNowPage = jsonResponse.Page.NowPage
        const jsonTotalPageNumber = jsonResponse.Page.TotalPageNumber
        setList(jsonUsers)
        setListCount(jsonUsers.length)
        setPageNum(jsonTotalPageNumber)
        setNowPage(jsonNowPage)
        if (jsonNowPage > 1) {
            setExistPrevPage(true)
        } else {
            setExistPrevPage(false)
        }
        if ((jsonNowPage < jsonTotalPageNumber) && (jsonTotalPageNumber > 1)){
            setExistNextPage(true)
        } else {
            setExistNextPage(false)
        }
    }

    const newEntry = () => {
        navigate("/NewEntry");
    }

    // 画面表示時	
    useEffect(() => {
        getList()
    }, [getList])
    
    return (
        <div>
            <Header/>
            <div className="container">
                <main className="pb-3">
                    <h3><img src="../../img/gear.svg" alt="" width="32" height="32" title="management"/>管理</h3>
                    <div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item"><div className="nav-link manage_theme" id="manage_account" >アカウント管理</div></li>
                                </ul>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered table-hover account_list">
                                            <tbody>
                                                <tr key="trhead" className="theme_account_title">
                                                    <th className="no">No</th>
                                                    <th className="user_id">ユーザID</th>
                                                    <th className="user_name">ユーザ名</th>
                                                    <th className="email">Eメール</th>
                                                    <th className="reg_status">メール確認済</th>
                                                    <th className="tel_no">電話番号</th>
                                                    <th className="lock_status">ロック</th>
                                                    <th className="fail_count">ログイン失敗回数</th>
                                                </tr>
                                                {list.map((item, index) => {
                                                    const rowNum = index + 1 + ((nowPage -1) * listCount)
                                                    return (
                                                        <tr key={item.Id} className="theme_account_content">
                                                            <td>{rowNum}</td>
                                                            <td>{item.Id}</td>
                                                            <td>{item.UserName}</td>
                                                            <td>{item.Email}</td>
                                                            <td>{item.EmailConfirmed === true ? '済' : '未'}</td>
                                                            <td>{item.PhoneNumber}</td>
                                                            <td className="px-4">
                                                                <UnlockButton lockOut={item.LockOut} userId={item.Id} displayMessage={item.DisplayLockOutDateTime} unlockYes={unlockYes} />
                                                            </td>
                                                            <td key={item.Id}>{item.AccessFailedCount}</td>
                                                        </tr>
                                                    )
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <input type="hidden" id="unlockId" name="unlockId" />
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <button id="newEntry" className="btn btn-sm manage_theme" onClick={newEntry}>登録</button>
                                    </div>
                                    <div className="col-10">
                                        <ul className="pagination justify-content-end">
                                            {existPrevPage ?
                                                <li className="page-item">
                                                    <div className="page-link text-secondary" onClick={(e) => clickPaging(e, 1)}>&lt;&lt;</div>
                                                </li>
                                            : null}
                                            {Array.from({ length: pageNum }, (_, i) => {
                                                if ((i + 1) === nowPage) {
                                                    return <li className="page-item"><div className="page-link manage_theme" onClick={(e) => clickPaging(e, i + 1)}>{i + 1}</div></li>
                                                } else {
                                                    return <li className="page-item"><div className="page-link text-secondary" onClick={(e) => clickPaging(e, i + 1)}>{i + 1}</div></li>
                                                }
                                            })}
                                            {existNextPage ?
                                                <li className="page-item">
                                                    <div className="page-link text-secondary" onClick={(e) => clickPaging(e, pageNum)} >&gt;&gt;</div>
                                                </li>
                                            : null}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        <Footer/>
    </div>
    )
}

export default Manage
