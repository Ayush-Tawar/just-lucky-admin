import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import Scrollbar from "./Scrollbar";
import { getFullResult, parseDate } from "src/utils/commons";
import _ from "lodash";
import dayjs from "dayjs";

export default function CalendarView(props) {
  const handleClick = (args) => {
    const date = dayjs(args.date).format("DD/MM/YYYY");
    const selected = props.data.find((e) => e.resultDate === date);
    if (selected) {
      props.onClick(selected);
    } else {
      props.onClick(false, date);
    }
  };

  const handleEventClick = (eventInfo) =>
    props.onClick(eventInfo.event.extendedProps);

  const events = useMemo(() => {
    if (!_.isArray(props.data)) return [];
    const map = props.data.map((e) => {
      return {
        title: getFullResult(e),
        start: parseDate(e.resultDate).format(),
        end: parseDate(e.resultDate).format(),
        extendedProps: e,
      };
    });
    return map;
  }, [props.data]);

  const renderEventContent = (eventInfo) => {
    return <b>{eventInfo.event.title}</b>;
  };

  return (
    <Scrollbar>
      <FullCalendar
        height={600}
        buttonText={{ today: "Today" }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleClick}
        eventClick={handleEventClick}
        events={events}
        eventContent={renderEventContent}
        validRange={{
          start: dayjs().subtract(1, "year").format(),
          end: dayjs().subtract(1, "day").format(),
        }}
        firstDay={1}
      />
    </Scrollbar>
  );
}
