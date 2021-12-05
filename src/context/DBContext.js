import React, { useState } from "react";
import PouchDB from "pouchdb-browser";

export const DBContext = React.createContext();

export default function DBContextProvider({ children }) {
  const meetingsDB = new PouchDB("dispray-services");
  const INIT_ACTIVE_MEETING = {
    _id: "",
    name: "",
    elements: [],
  };
  const [meetings, setMeetings] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(INIT_ACTIVE_MEETING);
  const [activeElement, setActiveElement] = useState("");

  async function fetchMeetings() {
    const find = await meetingsDB.allDocs({
      include_docs: true,
    });
    setMeetings(find.rows.map((item) => item.doc));
  }

  // update or insert
  async function upsertMeeting(meeting) {
    const { id } = await meetingsDB.put(meeting);
    const updated = await meetingsDB.get(id);
    setActiveMeeting(updated);
    fetchMeetings();
  }

  return (
    <DBContext.Provider
      value={{
        meetingsDB,
        meetings,
        fetchMeetings,
        upsertMeeting,
        INIT_ACTIVE_MEETING,
        activeMeeting,
        setActiveMeeting,
        activeElement,
        setActiveElement,
      }}
    >
      {children}
    </DBContext.Provider>
  );
}
