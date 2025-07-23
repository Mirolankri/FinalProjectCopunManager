'use client'
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { node } from "prop-types";
import Modal from "./components/Modal";

const ModalContext = React.createContext(null);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalColor, setModalColor] = useState("DEFAULT");
  const [modalVariant, setModalVariant] = useState("filled");
  const [modalMessage, setModalMessage] = useState("in snackbar!");
  const [modalBody, setModalBody] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);
  
  const setModal = useCallback((title, body) => {
    setModalOpen(true);
    setModalBody(body);
    setModalTitle(title);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const value = useMemo(
      () => ({ setModal, closeModal }),
      [setModal, closeModal]
    );

  return (
    <>
      <ModalContext.Provider value={value}>
        {isModalOpen && <Modal title={modalTitle} body={modalBody} setOpen={setModalOpen} />}
        {children}
      </ModalContext.Provider>
    </>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used within a ModalProvider");
  return context;
};

ModalProvider.propTypes = {
  children: node.isRequired,
};
