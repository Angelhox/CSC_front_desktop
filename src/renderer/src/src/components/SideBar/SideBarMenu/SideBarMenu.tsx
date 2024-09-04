/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./SideBarMenu.scss";
import { VscMenu } from "react-icons/vsc";
import { IMenuItem, IUsercard } from "../../../commons/interfaces/left-menu";
import { classNames } from "../../../util/clases";
import { SideBarMenuCardView } from "../SideBarMenuCardView/SideBarMenuCardView";
import { SideBarMenuItemView } from "../SideBarMenuItemView/SideBarMenuItemView";
interface Props {
  items: IMenuItem[];
  card: IUsercard;
}
export function SideBarMenu({ items, card }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div
      className={classNames("SideBarMenu", isOpen ? "expanded" : "collapsed")}
    >
      <div className="menuButton">
        <button className="hamburgerIcon" onClick={handleClick}>
          < VscMenu viewBox="0 0 16 16" />
        </button>
      </div>
      <SideBarMenuCardView card={card} isOpen={isOpen} />
      {items.map((item) => (
        <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen} />
      ))}
    </div>
  );
}
