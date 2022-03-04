// React библиотеки
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import SmallCalendar from "react-calendar";

// FullCalendar плагины
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// CSS библиотеки
import "react-calendar/dist/Calendar.css";
import "bootswatch/dist/Litera/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// React
import { useState, useCallback, useMemo } from "react";

// Собственный js
import CleaningTypeFilters from "/src/cleaningTypeFilters.js";
import mockEvents from "/src/mockEvents.js";

// Собственный css
import "/src/common-css/reset-outline.css";
import styles from "./App.module.css";

// Компоненты
import CalendarFilter from "/src/components/CalendarFilter/CalendarFilter";
import CircleHint from "/src/components/CircleHint/CircleHint";

const App = () => {
    const [events, setEvents] = useState(mockEvents);
    const [cleaningTypeFilter, setCleaningTypeFilter] = useState(CleaningTypeFilters.ALL);
    const [notFreeDatesFilter, setNotFreeDatesFilter] = useState(false);
    const [freeDatesFilter, setFreeDatesFilter] = useState(false);

    const handleCleaningTypeFilterChange = useCallback((cleaningTypeFilter) => {
        setCleaningTypeFilter(cleaningTypeFilter);
    }, []);

    const handleNotFreeDatesFilterChange = useCallback(() => {
        setNotFreeDatesFilter((state) => !state);
    }, []);

    const handleFreeDatesFilterChange = useCallback(() => {
        setFreeDatesFilter((state) => !state);
    }, []);

    const eventMouseEnter = useCallback((info) => {
        info.el.title = info.event.title;
    }, []);

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
            <div className={styles.fullCalendarWrapper}>
                <FullCalendar
                    plugins={[dayGridPlugin, bootstrap5Plugin]}
                    initialView="dayGridMonth"
                    locale="ru"
                    firstDay={1}
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
            <div className={styles.rightPanel}>
                <SmallCalendar
                    tileClassName={[styles.tile]}
                    showFixedNumberOfWeeks={true}
                    tileContent={({ date }) => {
                        const localeDateString = date.toLocaleDateString("en-GB").split("/").reverse().join("-");

                        const eventsOnThisDate = preparedEvents.filter(
                            (event) => event.start.split("T")[0] === localeDateString
                        );

                        return eventsOnThisDate.length > 0 ? <CircleHint>{eventsOnThisDate.length}</CircleHint> : null;
                    }}
                />
                <CalendarFilter
                    cleaningTypeFilter={cleaningTypeFilter}
                    onCleaningTypeFilterChange={handleCleaningTypeFilterChange}
                    notFreeDatesFilter={notFreeDatesFilter}
                    onNotFreeDatesFilterChange={handleNotFreeDatesFilterChange}
                    freeDatesFilter={freeDatesFilter}
                    onFreeDatesFilterChange={handleFreeDatesFilterChange}
                />
            </div>
        </div>
    );
};

export default App;
