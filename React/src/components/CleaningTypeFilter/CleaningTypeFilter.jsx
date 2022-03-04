import CleaningTypeFilters from "/src/cleaningTypeFilters.js";

const CleaningTypeFilter = (props) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor="cleaningTypeSelect">
                Выбрать тип уборки:
            </label>
            <select
                className="form-select"
                id="cleaningTypeSelect"
                value={props.cleaningTypeFilter}
                onChange={(e) => props.onCleaningTypeFilterChange(e.target.value)}
            >
                <option value={CleaningTypeFilters.ALL}>Все</option>
                <option value={CleaningTypeFilters.GENERAL_CLEANING}>Генеральная уборка</option>
                <option value={CleaningTypeFilters.SUPPORT_CLEANING}>Поддерживающая уборка</option>
                <option value={CleaningTypeFilters.POST_CONSTRUCTION_CLEANING}>Послестроительная уборка</option>
            </select>
        </div>
    );
};

export default CleaningTypeFilter;
