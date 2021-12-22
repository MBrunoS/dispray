import React, { useState } from "react";

export const ModalsContext = React.createContext();

export default function ModalsContextProvider({ children }) {
  const [isMeetingsModalOpen, setIsMeetingsModalOpen] = useState(true);
  const showMeetingsModal = () => setIsMeetingsModalOpen(true);
  const closeMeetingsModal = () => setIsMeetingsModalOpen(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const showCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const [isBibleModalOpen, setIsBibleModalOpen] = useState(false);
  const showBibleModal = () => setIsBibleModalOpen(true);
  const closeBibleModal = () => setIsBibleModalOpen(false);
  const [isSongsModalOpen, setIsSongsModalOpen] = useState(false);
  const showSongsModal = () => setIsSongsModalOpen(true);
  const closeSongsModal = () => setIsSongsModalOpen(false);

  const [isEditSlideModalOpen, setIsEditSlideModalOpen] = useState(false);
  const showEditSlideModal = () => setIsEditSlideModalOpen(true);
  const closeEditSlideModal = () => setIsEditSlideModalOpen(false);

  return (
    <ModalsContext.Provider
      value={{
        isMeetingsModalOpen,
        showMeetingsModal,
        closeMeetingsModal,
        isCreateModalOpen,
        showCreateModal,
        closeCreateModal,
        isEditModalOpen,
        showEditModal,
        closeEditModal,
        isBibleModalOpen,
        showBibleModal,
        closeBibleModal,
        isSongsModalOpen,
        showSongsModal,
        closeSongsModal,
        isEditSlideModalOpen,
        showEditSlideModal,
        closeEditSlideModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
