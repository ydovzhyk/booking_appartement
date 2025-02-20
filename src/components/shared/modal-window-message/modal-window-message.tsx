'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
  clearTechnicalMessage,
  clearTechnicalError,
} from '../../../redux/technical/technical-slice';
import {
  clearUserMessage,
  clearUserError,
} from '../../../redux/auth/auth-slice';
import { clearPropertyMessage, clearPropertyError } from '@/redux/property/property-slice';
import {
  getAuthMessage,
  getAuthError,
} from '../../../redux/auth/auth-selectors';
import { getPropertyMessage, getPropertyError } from '@/redux/property/property-selectors';
import {
  getTechnicalError,
  getTechnicalMessage,
  getModalVindowSttus,
} from '../../../redux/technical/technical-selectors';
import { setModalWindowStatus } from '../../../redux/technical/technical-slice';
import { TfiClose } from 'react-icons/tfi';
import Text from '../text/text';

const ModalWindow = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const messageAuth = useSelector(getAuthMessage);
  const messageTechnical = useSelector(getTechnicalMessage);
  const messageProperty = useSelector(getPropertyMessage);
  const errorAuth = useSelector(getAuthError);
  const errorTechnical = useSelector(getTechnicalError);
  const errorProperty = useSelector(getPropertyError);
  const modalWindowStatus = useSelector(getModalVindowSttus);
  
  const [isError, setIsError] = useState(false);

  const clearAllState = useCallback(() => {
    dispatch(setModalWindowStatus(false));
    dispatch(clearTechnicalError());
    dispatch(clearTechnicalMessage());
    dispatch(clearUserError());
    dispatch(clearUserMessage());
    dispatch(clearPropertyError());
    dispatch(clearPropertyMessage());
    setIsError(false);
  }, [dispatch]);

  useEffect(() => {
    if (messageAuth || messageTechnical || messageProperty || errorAuth || errorTechnical || errorProperty) {
      dispatch(setModalWindowStatus(true));
      if (errorAuth || errorTechnical || errorProperty) {
        setIsError(true);
      }
    } else {
      return;
    }
  }, [dispatch, messageAuth, messageTechnical,messageProperty, errorAuth, errorTechnical, errorProperty]);

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

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      clearTimeout(timeoutId);
    };
  }, [modalWindowStatus, clearAllState]);

  const closeModal = () => {
    clearAllState();
  };

  const errorMessage = `${errorAuth ? errorAuth : errorTechnical ? errorTechnical : errorProperty}`;
  const infoMessage = `${messageAuth ? messageAuth : messageTechnical ? messageTechnical : messageProperty}`;

  return (
    <div
      className={`w-72 min-h-[50px] rounded-lg shadow-lg text-white border
        ${isError ? 'bg-red-500 border-red-700' : 'bg-green-500 border-green-700'}
        ${!modalWindowStatus ? 'hidden' : 'flex flex-col'}`}
      ref={modalRef}
      style={{position: 'absolute', top: '10px', right: '10px', zIndex: 200, }}
    >
      <div className="reletive w-[100%] flex flex-col items-center gap-[5px] py-2 px-5">
        <button
          className="absolute top-[5px] right-[10px] w-[20px] h-[20px] flex flex-row items-center justify-center"
          onClick={closeModal}
        >
          <TfiClose color="var(--text-color)" size={15} />
        </button>
        {(errorAuth || errorTechnical || errorProperty) && (
          <>
            <Text type="small" as="p" fontWeight="normal">
              We got an error:
            </Text>
            <Text type="small" as="p" fontWeight="light">
              {errorMessage}
            </Text>
          </>
        )}
        {(messageAuth || messageTechnical || messageProperty) && (
          <>
            <Text type="small" as="p" fontWeight="normal">
              We got a message:
            </Text>
            <Text type="small" as="p" fontWeight="light">
              {infoMessage}
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
