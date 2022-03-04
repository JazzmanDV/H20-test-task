import styles from "./CalendarFilter.module.css";

import CleaningTypeFilter from "/src/components/CleaningTypeFilter/CleaningTypeFilter";
import ButtonFilter from "/src/components/ButtonFilter/ButtonFilter";

const CalendarFilter = (props) => {
    return (
        <div>
            <h2>Фильтры:</h2>
            <div className={styles.filtersWrapper}>
                <CleaningTypeFilter
                    cleaningTypeFilter={props.cleaningTypeFilter}
                    onCleaningTypeFilterChange={props.onCleaningTypeFilterChange}
                />
                <div className={styles.buttonsWrapper}>
                    <ButtonFilter
                        active={!props.notFreeDatesFilter}
                        className={props.notFreeDatesFilter ? "btn-outline-success" : "btn-success"}
                        onClick={props.onNotFreeDatesFilterChange}
                    >
                        Назначено время
                    </ButtonFilter>
                    <ButtonFilter
                        active={!props.freeDatesFilter}
                        className={props.freeDatesFilter ? "btn-outline-primary" : "btn-primary"}
                        onClick={props.onFreeDatesFilterChange}
                    >
                        Свободная дата
                    </ButtonFilter>
                </div>
            </div>
        </div>
    );
};

export default CalendarFilter;
