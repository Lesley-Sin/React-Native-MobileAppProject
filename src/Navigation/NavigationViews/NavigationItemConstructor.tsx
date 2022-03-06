import React from "react";
import GroupItemView from "./GroupItemView";
import NavItemView from "./NavItemView";
import { NavigationItemModel } from "../Interfaces/NavigationItemModel";
import { INavigationDAL } from "../DataAccessLayer/INavigationDAL";
import { PageQuery } from "../../Components/Page/Interfaces/PageQuery";
import { ToolbarItemView } from "../../Components/InputFields/Toolbar/Interfaces/ToolbarItemView";

/**
 * @NavigationItem
 * Класс, реализующий отрисовку навигационных элементов боковой навигации
 */
export class NavigationItemConstructor {
  private NavigationItem: NavigationItemModel;
  private DAL: INavigationDAL;
  constructor(
    NavigationItem: NavigationItemModel,
    dataAccesslayer: INavigationDAL
  ) {
    this.NavigationItem = NavigationItem;
    this.DAL = dataAccesslayer;
  }

  onRender() {
    switch (this.NavigationItem.itemType) {
      case "Group": {
        return (
          <GroupItemView
            id={this.NavigationItem.id}
            title={this.NavigationItem.name}
            children={this.NavigationItem.navigationItems}
            getChildrenFor={() =>
              this.DAL.getChildrenFor(this.NavigationItem.id)
            }
            getItems={async () =>
              await this.DAL.GetNextItems(this.NavigationItem.id)
            }
            dataAccessLayer={this.DAL}
            newItemClass={NavigationItemConstructor}
            key={this.NavigationItem.id}
          />
        );
      }
      default: {
        return (
          <NavItemView
            itemModel={this.NavigationItem}
            handleUserCommandAction={async (actionModel: ToolbarItemView) => await this.DAL.handleUserCommandAction(actionModel)}
            notify={async () => {
              // const data: PageQuery = {
              //   containerId: this.NavigationItem.container,
              //   pageId: this.NavigationItem.target,
              //   objectId: ''
              // }
              const data = new PageQuery(this.NavigationItem.container, this.NavigationItem.target)
              await this.DAL.notifyMainScreen(data)
            }}
            key={this.NavigationItem.id}
          />
        );
      }
    }
  }
}
