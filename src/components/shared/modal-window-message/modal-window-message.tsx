"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../redux/store';
import {
  clearTechnicalMessage,
  clearTechnicalError,
} from "../../../redux/technical/technical-slice";
import {
  clearUserMessage,
  clearUserError,
} from "../../../redux/auth/auth-slice";
import {
  getAuthMessage,
  getAuthError,
} from "../../../redux/auth/auth-selectors";
import {
  getTechnicalError,
  getTechnicalMessage,
  getModalVindowSttus,
} from "../../../redux/technical/technical-selectors";
import { setModalWindowStatus } from "../../../redux/technical/technical-slice";

import { TfiClose } from "react-icons/tfi";
import s from "./modal-window-message.module.scss";

const ModalWindow = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const messageAuth = useSelector(getAuthMessage);
  const messageTechnical = useSelector(getTechnicalMessage);
  const errorAuth = useSelector(getAuthError);
  const errorTechnical = useSelector(getTechnicalError);
  const modalWindowStatus = useSelector(getModalVindowSttus);
    
    const clearAllState = () => {
        dispatch(setModalWindowStatus(false));
        dispatch(clearTechnicalError());
        dispatch(clearTechnicalMessage());;
        dispatch(clearUserError());
        dispatch(clearUserMessage());
    }
    

    useEffect(() => {
        if (messageAuth || messageTechnical || errorAuth || errorTechnical) {
            dispatch(setModalWindowStatus(true));
        } else {
            return;
        }
    }, [dispatch, messageAuth, messageTechnical, errorAuth, errorTechnical])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        clearAllState();
      }
    };

    let timeoutId;
    if (!modalWindowStatus) {
        return;
    } else {
        timeoutId = setTimeout(() => {
            clearAllState();
        }, 10000);
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      clearTimeout(timeoutId);
    };
      
  }, [dispatch, modalWindowStatus]);

  const closeModal = () => {
    clearAllState();
  };

  return (
    <div className={s.window} ref={modalRef} style={{display: !modalWindowStatus ? 'none' : 'flex'}}>
        <div className={s.window__wrapper}>
            <button className={s.window__closeButton} onClick={closeModal}>
                <TfiClose color="var(--text-color)" size={15} />
            </button>
            <div className={s.boo}>
                <div className={s.face} id="face"></div>
            </div>
            <div className={s.shadow}></div>
                {(errorAuth || errorTechnical) && (
                    <>
                        <p className={s.window__title}>We got an error:</p>
                        <p className={s.window__text}>
                            {`${errorAuth
                            ? errorAuth
                            : errorTechnical
                            }`}
                        </p>
                    </>
                )}
            {(messageAuth || messageTechnical) && (
                <p className={s.window__text}>
                    {`${
                    messageAuth
                    ? messageAuth
                    : messageTechnical
                    }`}
                </p>
            )}
        </div>
    </div>
  );
};

export default ModalWindow;