import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DBContext } from "../../context/DBContext";
import { ModalsContext } from "../../context/ModalsContext";
import Presentation from "../../components/Presentation";
import Menubar from "../../components/Menubar";
import MeetingInfo from "./Info";
import MeetingButtons from "./Buttons";
import EditMeetingModal from "../../components/Modals/Meetings/Edit";
import CreateMeetingModal from "../../components/Modals/Meetings/Create";
import MeetingQueue from "./Queue";

export default function Meeting() {
  const { activeMeeting, fetchMeetings, fetchThemes } = useContext(DBContext);
  const { showCreateModal, showEditModal } = useContext(ModalsContext);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    fetchMeetings();
    fetchThemes();

    window.electron.ipcRenderer.on(
      "projection-screen-dimensions",
      (e, { width, height }) => {
        setScreenSize({ width, height });
      }
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners(
        "projection-screen-dimensions"
      );
    };
  }, []);

  return (
    <>
      <Menubar />
      <Row>
        <Col xs={2} className="d-flex flex-column meeting-sidebar">
          <MeetingInfo
            name={activeMeeting.name.toUpperCase() || "Selecione uma reunião"}
            create={showCreateModal}
            edit={showEditModal}
          />

          {activeMeeting.name && (
            <>
              <MeetingButtons />
              <MeetingQueue />
            </>
          )}
        </Col>

        <Col xs={10} className="presentation">
          <Presentation projectionScreenSize={screenSize} />
        </Col>
      </Row>

      <CreateMeetingModal />

      <EditMeetingModal />
    </>
  );
}
