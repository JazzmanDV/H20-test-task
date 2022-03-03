import "@fullcalendar/react/dist/vdom";
import Calendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import "bootswatch/dist/Litera/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState, useMemo } from "react";

import CleaningTypeFilters from "/src/cleaningTypeFilters.js";
import mockEvents from "/src/mockEvents.js";

import "/src/common-css/reset-outline.css";
import styles from "./App.module.css";

import CalendarFilter from "/src/components/CalendarFilter/CalendarFilter";

const App = () => {
    const [events, setEvents] = useState(mockEvents);
    const [cleaningTypeFilter, setCleaningTypeFilter] = useState(CleaningTypeFilters.ALL);
    const [notFreeDatesFilter, setNotFreeDatesFilter] = useState(false);
    const [freeDatesFilter, setFreeDatesFilter] = useState(false);

    const handleCleaningTypeFilterChange = (cleaningTypeFilter) => {
        setCleaningTypeFilter(cleaningTypeFilter);
    };

    const handleNotFreeDatesFilterChange = () => {
        setNotFreeDatesFilter((state) => !state);
    };

    const handleFreeDatesFilterChange = () => {
        setFreeDatesFilter((state) => !state);
    };

    const eventMouseEnter = (info) => {
        info.el.title = info.event.title;
    };

    let preparedEvents = useMemo(() => {
        return events.map((event) => {
            let isFreeDate = false;
            const classNames = [styles.event];

            // Если нет назначенного времени в дате начала события, то дата считается свободной
            if (!event.start.match(/T/i)) {
                isFreeDate = true;
                classNames.push(styles.eventFreeDate);
            }

            return { ...event, isFreeDate, classNames };
        });
    }, [events]);

    if (cleaningTypeFilter !== CleaningTypeFilters.ALL) {
        preparedEvents = preparedEvents.filter((event) => event.cleaningType === cleaningTypeFilter);
    }

    if (notFreeDatesFilter) {
        preparedEvents = preparedEvents.filter((event) => event.isFreeDate);
    }

    if (freeDatesFilter) {
        preparedEvents = preparedEvents.filter((event) => !event.isFreeDate);
    }

    return (
        <div className={styles.app}>
            <div className={styles.calendarWrapper}>
                <Calendar
                    plugins={[dayGridPlugin, bootstrap5Plugin]}
                    initialView="dayGridMonth"
                    locale="ru"
                    buttonText={{
                        today: "Сегодня",
                        dayGridWeek: "Неделя",
                        dayGridMonth: "Месяц",
                    }}
                    themeSystem="bootstrap5"
                    headerToolbar={{
                        start: "prev,next",
                        center: "title",
                        right: "today dayGridWeek,dayGridMonth",
                    }}
                    eventMouseEnter={eventMouseEnter}
                    events={preparedEvents}
                />
            </div>
            <CalendarFilter
                cleaningTypeFilter={cleaningTypeFilter}
                onCleaningTypeFilterChange={handleCleaningTypeFilterChange}
                notFreeDatesFilter={notFreeDatesFilter}
                onNotFreeDatesFilterChange={handleNotFreeDatesFilterChange}
                freeDatesFilter={freeDatesFilter}
                onFreeDatesFilterChange={handleFreeDatesFilterChange}
            />
        </div>
    );
};

export default App;
