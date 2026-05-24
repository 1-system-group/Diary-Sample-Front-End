import {useEffect, useRef, useState} from 'react'
import { Modal } from 'bootstrap'

// 登録ボタン（管理画面登録）
function CreateButton({createYes}) {

    const modalRef = useRef()
    
    let modalInstance = null

    const handleShowModal = () => {
        modalInstance = new Modal(modalRef.current)
        modalInstance.show()
    }

    const handleCloseModal = () => {
        if (modalInstance) {
            modalInstance.hide()
        } else {
            // fallback: Bootstrapがdata-bs-dismissを使って閉じる
            const modalEl = modalRef.current
            const instance = Modal.getInstance(modalEl)
            if (instance) {
                instance.hide()
            }
        }
    }

    const clickCreateYes = async () => {
        await createYes()
        // モーダルを閉じるだけにしておく
        handleCloseModal()
    }

    return (
        <div>
            <button id="create" class="btn btn-sm manage_theme" data-toggle="modal" data-target="#updModal" onClick={() => handleShowModal()} >登録</button>

            <div
                className="modal fade"
                ref={modalRef}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">登録</h5>
                        </div>
                        <div className="modal-body">
                            登録します。よろしいですか？
                        </div>
                        <div className="modal-footer">
                            <button class="btn btn-primary" onClick={() => clickCreateYes()}>はい</button>
                            <button class="btn btn-secondary" data-dismiss="modal" onClick={() => handleCloseModal()}>いいえ</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateButton
