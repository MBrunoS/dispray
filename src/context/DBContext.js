import React, { useState } from "react";
import PouchDB from "pouchdb-browser";

export const DBContext = React.createContext(null);
export default function DBContextProvider({ children }) {
  const meetingsDB = new PouchDB("dispray-services");
  const themesDB = new PouchDB("dispray-themes");

  const INIT_ACTIVE_MEETING = {
    _id: "",
    name: "",
    elements: [],
    theme: null,
  };

  const [meetings, setMeetings] = useState([]);
  const [themes, setThemes] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(INIT_ACTIVE_MEETING);
  const [activeItem, setActiveItem] = useState(null);

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

  async function fetchThemes() {
    const find = await themesDB.allDocs({
      include_docs: true,
    });
    setThemes(find.rows.map((item) => item.doc));
  }

  // update or insert
  async function upsertTheme(theme) {
    await themesDB.put(theme);
    fetchThemes();
  }

  return (
    <DBContext.Provider
      value={{
        meetingsDB,
        meetings,
        fetchMeetings,
        upsertMeeting,
        themesDB,
        themes,
        fetchThemes,
        upsertTheme,
        INIT_ACTIVE_MEETING,
        activeMeeting,
        setActiveMeeting,
        activeItem,
        setActiveItem,
      }}
    >
      {children}
    </DBContext.Provider>
  );
}
