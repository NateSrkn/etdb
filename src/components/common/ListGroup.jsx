import React from "react";

export const ListGroup = ({
  listItems,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {listItems.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};
