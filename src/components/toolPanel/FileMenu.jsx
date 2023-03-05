import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "../../styles/filebar.css"
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";

const FileMenu = () => {
    return (
        <div>
          <Dropdown>
              <DropdownToggle id="dropdown-autoclose-true" className="menu-bar" size="sm">
                  Файл
              </DropdownToggle>
              <DropdownMenu>
                  <Dropdown.Item href="#/action-1">Создать...</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Импортировать...</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Экспортировать...</Dropdown.Item>
              </DropdownMenu>
          </Dropdown>
        </div>
    );
};

export default FileMenu;