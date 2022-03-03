import CleaningTypeFilters from "/src/cleaningTypeFilters.js";

import "/src/common-css/button.css";
import styles from "./CalendarFilter.module.css";

const CalendarFilter = (props) => {
    return (
        <div>
            <h2>Фильтры:</h2>
            <div className={styles.filtersWrapper}>
                <div className="form-group">
                    <label className="form-label mt-4" htmlFor="typeOfCleaningSelect">
                        Выбрать тип уборки:
                    </label>
                    <select
                        className="form-select"
                        id="typeOfCleaningSelect"
                        value={props.cleaningTypeFilter}
                        onChange={(e) => props.onCleaningTypeFilterChange(e.target.value)}
                    >
                        <option value={CleaningTypeFilters.ALL}>Все</option>
                        <option value={CleaningTypeFilters.GENERAL_CLEANING}>Генеральная уборка</option>
                        <option value={CleaningTypeFilters.SUPPORT_CLEANING}>Поддерживающая уборка</option>
                        <option value={CleaningTypeFilters.POST_CONSTRUCTION_CLEANING}>Послестроительная уборка</option>
                    </select>
                </div>
                <div className={styles.buttonsWrapper}>
                    <button
                        className={"btn " + (props.notFreeDatesFilter ? "btn-outline-success" : "btn-success")}
                        onClick={(e) => props.onNotFreeDatesFilterChange()}
                    >
                        Назначено время
                    </button>
                    <button
                        className={"btn " + (props.freeDatesFilter ? "btn-outline-primary" : "btn-primary")}
                        onClick={(e) => props.onFreeDatesFilterChange()}
                    >
                        Свободная дата
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarFilter;
