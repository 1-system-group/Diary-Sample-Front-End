import {useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router-dom"
import Header from './Header.js'
import Footer from './Footer.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function NewEntry() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

   //TODO APIのURLはいったんここでローカルホストを指定しておく
    const apiUrl = "https://localhost"
    const apiPort = "44349"
    
    //TODO 認証はいったん無しにしておく
    const token = ""

    const userEntity = {
      email: email,
      phoneNumber: phoneNumber,
      password1: password1,
      password2: password2,
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


    const create = async () => {

        const body = JSON.stringify(userEntity)
        const apiResponse = await apiPostRequest( `${apiUrl}:${apiPort}/api/v1/ManageApi/Create`, body)
        const jsonResponse = JSON.parse(apiResponse)

        //TODO 結果によって分岐
        // バリデーションエラー
        // 登録成功
        // 登録失敗（登録済み）
        // 登録失敗（その他）
        if (jsonResponse.NotificationType === 1) {
          // Nomal
          // 登録成功の場合はアカウント一覧画面へ
          //TODO とりあえずログだけ出しておく
          console.log("Nomal")
        } else if (jsonResponse.NotificationType === 3) {
          // Error
          //TODO とりあえずログだけ出しておく
          console.log("Error")
        }

//        navigate("/create")
    }

    const back = () => {
        navigate("/Manage")
    }

    return (
        <div>
           <Header/>

             <div class="container">
               <main class="pb-3">

                <h3>
                    <img src="../../img/gear.svg" alt="" width="32" height="32" title="management"/>
                    管理
                </h3>
                <div>
                    <h4></h4>
                    <hr />
                    <div class="row">
                        <div class="col-md-3">
                            <ul class="nav nav-pills flex-column">
                                <li class="nav-item"><a class="nav-link manage_theme" id="manage_account">アカウント管理</a></li>
                            </ul>
                        </div>
                        <div class="col-md-5">
                            <form>
                                <div class="d-grid gap-1 border-bottom">
                                    <div class="form-group p-2">
                                        <label>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill icon-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                            ユーザ名
                                        </label>
                                        <input class="form-control" type="text" placeholder="名前を入力してください" />
                                    </div>
                                    <div class="form-group p-1">
                                        <label>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill icon-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                        </svg>
                                            Eメールアドレス
                                        </label>
                                        <input class="form-control" type="text" placeholder="メールアドレスを入力してください" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div class="form-group p-1">
                                        <label> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone-fill icon-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
                                        </svg> 電話番号 </label>
                                        <input class="form-control" type="tel" placeholder="電話番号を入力してください" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="d-grid gap-1">
                                    <div class="form-group p-1">
                                        <label>
                                        パスワード 
                                        </label>
                                        <input class="form-control" type="password" placeholder="パスワードを入力してください" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                                    </div>
                                    <div class="form-group p-1">
                                        <label>
                                        パスワード（再入力） 
                                        </label>
                                        <input class="form-control" type="password" placeholder="パスワード（再入力）を入力してください" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                    </div>
                                    <span class="password_explain">
                                    ※パスワードは6文字以上、英字大文字・英字小文字・数字・記号を含んでいる必要があります。
                                    </span>
                                </div>
                                <div class="modal fade" id="updModal" tabindex="-1" role="dialog" aria-labelledby="updModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header manage_theme_positive">
                                            <h5 class="modal-title" id="updModalLabel">登録します。よろしいですか？</h5>
                                            </div>
                                            <div class="modal-footer">
                                                <button id="yes" class="btn manage_theme_positive" >はい</button>
                                                <button id="no" class="btn manage_theme_cancel" data-dismiss="modal">いいえ</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="form-group p-2">
                                <button id="create" class="btn btn-sm manage_theme" data-toggle="modal" data-target="#updModal" onClick={create} >登録</button>
                                <form method="get">
                                    <button id="back" class="btn btn-sm manage_theme_cancel" onClick={back} >戻る</button>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-4">
                        </div>
                    </div>
                </div>

             </main>
           </div>
         <Footer/>
       </div>

    )

}

export default NewEntry
