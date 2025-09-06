import {useEffect, useRef, useState} from 'react'
import { Modal } from 'bootstrap';

function UnlockButton({lockOut, id}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const modalRef = useRef();
    
    let modalInstance = null;

    const handleShowModal = () => {
        modalInstance = new Modal(modalRef.current);
        modalInstance.show();
    };


    const handleCloseModal = () => {
      if (modalInstance) {
        modalInstance.hide();
      } else {
        // fallback: Bootstrapがdata-bs-dismissを使って閉じる
        const modalEl = modalRef.current;
        const instance = Modal.getInstance(modalEl);
        if (instance) {
            instance.hide();
        }
      }
    };


    const clickUnlockYes = () => {
        // ロック解除のAPI呼び出しは未実装状態
        // とりあえず、"いいえ"ボタン押下時と同様にモーダルを閉じるだけにしておく
        handleCloseModal();
    }


    if (lockOut) {
      return null;
    }

    return (
        <div className="w-100 p-0 m-0 d-flex justify-content-center" style={{ boxSizing: 'border-box' }}>
            <button className="btn btn-outline-primary btn-sm p-0 w-100" id="release_lock" data-toggle="modal" data-target="#unlockModal" onClick={() => handleShowModal()}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-unlock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
                    <path fill-rule="evenodd" d="M8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                </svg>
                解除
            </button>
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
                            <h5 className="modal-title" id="exampleModalLabel">ロック解除</h5>
                        </div>
                        <div className="modal-body">
                            ロックを解除します。よろしいですか？
                        </div>
                        <div className="modal-footer">
                            <button class="btn btn-primary" onClick={() => clickUnlockYes()}>はい</button>
                            <button class="btn btn-secondary" data-dismiss="modal" onClick={() => handleCloseModal()}>いいえ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnlockButton;
