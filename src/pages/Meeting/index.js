import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    fetchMeetings();
    fetchThemes();
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
          <Presentation />
        </Col>
      </Row>

      <CreateMeetingModal />

      <EditMeetingModal />
    </>
  );
}
